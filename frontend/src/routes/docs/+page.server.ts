import type { Actions } from '@sveltejs/kit';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { PASSWORD, BUCKET_ID, BUCKET_ACCESS_KEY } from '$env/static/private';
import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';

const schema = z.object({
	endpoint: z.string().trim().url().default('https://nyc3.digitaloceanspaces.com'),
	region: z.string().trim().default('nyc3'),
	accessKeyId: z.string().trim(),
	secretAccessKey: z.string().trim(),
	password: z.string().trim()
});

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));
		let endpoint: string;
		let region: string;
		let accessKeyId: string = '';
		let secretAccessKey: string = '';

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		if (form.data['password'] === PASSWORD) {
			endpoint = form.data['endpoint'];
			region = form.data['region'];

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

			const listCommand = {
				Bucket: 'adl'
			};

			const retrievalCommand = new ListObjectsV2Command(listCommand);
			const bucketObjects = await s3Client.send(retrievalCommand);
			console.log(bucketObjects);
		}

		// Display a success status message
		return message(form, 'Form posted successfully!');
	}
};
