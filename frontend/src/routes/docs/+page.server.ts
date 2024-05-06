import type { Actions } from '@sveltejs/kit';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
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
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		if (form.data['password'] === PASSWORD) {
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
			for (const object of bucketObjects.Contents!) {
				if (object.Key) {
					const writePath = repo_path + DOCS_PATH + object.Key;
					fs.access(writePath, fs.constants.F_OK, async (err) => {
						if (err) {
							// An error occurs if the fs.access fails to find the file at the supplied path
							// If the file does not exist, we need to determine if the directories upstream exists
							// If they do not, we should create them, or else we will get an 'ENOENT' error code from node
							const directoryPath = getDirectoryPath(writePath);
							// Make the directory if it does not exist
							if (!fs.existsSync(directoryPath)) {
								fs.mkdirSync(directoryPath);
							}
							const getCommand = new GetObjectCommand({
								Bucket: form.data.bucket,
								Key: object.Key
							});
							const file = await s3Client.send(getCommand);
							const writeStream = fs.createWriteStream(writePath);
							if (file.Body) {
								// @ts-expect-error pipe exists, this is a problem with S3
								file.Body.pipe(writeStream);
								console.log(`Downloaded: ${object.Key}`);
							}
						}
					});
				}
			}
		}
		return message(form, 'Form posted successfully!');
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
