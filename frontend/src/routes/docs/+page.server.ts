import type { Actions } from '@sveltejs/kit';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { PASSWORD, BUCKET_ID, BUCKET_ACCESS_KEY, DOCS_PATH } from '$env/static/private';
import { ListObjectsV2Command, GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';

const schema = z.object({
	bucket: z.string().trim().default('adl'),
	endpoint: z.string().trim().url().default('https://nyc3.digitaloceanspaces.com'),
	region: z.string().trim().default('nyc3'),
	accessKeyId: z.string().trim(),
	secretAccessKey: z.string().trim(),
	password: z.string().trim()
});

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));
		let bucket: string;
		let endpoint: string;
		let region: string;
		let accessKeyId: string = '';
		let secretAccessKey: string = '';

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		if (form.data['password'] === PASSWORD) {
			const outputDirectory = DOCS_PATH;
			endpoint = form.data['endpoint'];
			region = form.data['region'];
			bucket = form.data['bucket'];

			if (form.data['accessKeyId'] === '') {
				accessKeyId = BUCKET_ID;
			} else {
				accessKeyId = form.data['accessKeyId'];
			}
			if (form.data['secretAccessKey'] === '') {
				secretAccessKey = BUCKET_ACCESS_KEY;
			} else {
				secretAccessKey = form.data['secretAccessKey'];
			}

			const s3Client: S3Client = new S3Client({
				endpoint: endpoint,
				forcePathStyle: false,
				region: region,
				credentials: {
					accessKeyId: accessKeyId,
					secretAccessKey: secretAccessKey
				}
			});

			const retrievalCommand = new ListObjectsV2Command({
				Bucket: bucket
			});
			const bucketObjects = await s3Client.send(retrievalCommand);

			// TODO: Add Check to make sure list command passed
			for (const object of bucketObjects.Contents!) {
				const getCommand = new GetObjectCommand({
					Bucket: bucket,
					Key: object.Key
				});
				const file = await s3Client.send(getCommand);
				const writePath = outputDirectory + object.Key;
				const writeStream = fs.createWriteStream(writePath);
				file.Body!.pipe(writeStream);
				console.log(`Downloaded: ${object.Key}`);
			}
		}

		// Display a success status message
		return message(form, 'Form posted successfully!');
	}
};
