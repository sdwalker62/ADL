import type { Actions } from '@sveltejs/kit';
import { message } from 'sveltekit-superforms';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { PASSWORD, BUCKET_ID, BUCKET_ACCESS_KEY, DOCS_PATH } from '$env/static/private';
import { ListObjectsV2Command, GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

const schema = z.object({
	bucket: z.string().trim().default('adl'),
	endpoint: z.string().trim().url().default('https://nyc3.digitaloceanspaces.com'),
	region: z.string().trim().default('nyc3'),
	accessKeyId: z.string().trim().default(BUCKET_ID),
	secretAccessKey: z.string().trim().default(BUCKET_ACCESS_KEY),
	password: z.string().trim()
});

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));
		if (!form.valid) {
			return message(form, { status: 'failure', text: 'The form contains validation errors' });
		}

		if (form.data['password'] !== PASSWORD) {
			return message(form, { status: 'failure', text: 'Password is incorrect' });
		} else {
			const repo_path = path.resolve('..');
			const s3Client: S3Client = new S3Client({
				endpoint: form.data.endpoint,
				forcePathStyle: false,
				region: form.data.region,
				credentials: {
					accessKeyId: form.data.accessKeyId,
					secretAccessKey: form.data.secretAccessKey
				}
			});

			const retrievalCommand = new ListObjectsV2Command({
				Bucket: form.data.bucket
			});
			const bucketObjects = await s3Client.send(retrievalCommand);

			// Instead of going through and updating each file, we will delete the repo and re-pull
			const docsPath = repo_path + DOCS_PATH;
			fs.rmSync(docsPath, { recursive: true, force: true });
			fs.mkdirSync(docsPath);

			for (const object of bucketObjects.Contents!) {
				if (object.Key) {
					const writePath = docsPath + object.Key;
					fs.access(writePath, fs.constants.F_OK, async (err) => {
						if (err) {
							// An error occurs if the fs.access fails to find the file at the supplied path
							// If the file does not exist, we need to determine if the directories upstream exists
							// If they do not, we should create them, or else we will get an 'ENOENT' error code from node
							const directoryPath = getDirectoryPath(writePath);
							// Make the directory if it does not exist
							if (!fs.existsSync(directoryPath)) {
								console.log('Directory does not exist: ' + directoryPath);
								console.log('Creating directory: ' + directoryPath);
								fs.mkdirSync(directoryPath, { recursive: true });
							}
							const getCommand = new GetObjectCommand({
								Bucket: form.data.bucket,
								Key: object.Key
							});
							const file = await s3Client.send(getCommand);
							if (!object.Key!.endsWith('/')) {
								const writeStream = fs.createWriteStream(writePath);
								if (file.Body) {
									// @ts-expect-error pipe exists, this is a problem with S3
									file.Body.pipe(writeStream);
								}
							}
						}
					});
				}
			}
		}
		return message(form, { status: 'success' });
	}
};

function getDirectoryPath(path: string): string {
	const pathSplit = path.split('/');
	if (pathSplit.length > 1) {
		const pathArray = pathSplit.slice(0, pathSplit.length - 1);
		return pathArray.join('/');
	} else {
		return path;
	}
}
