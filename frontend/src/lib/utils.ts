// /*
//     This file contains random utility functions that are used throughout the frontend. There is no logic for which functions are placed here.
// */
//
// import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
// import dotenv from 'dotenv';
// import { PUBLIC_BUCKET_ID, PUBLIC_BUCKET_ACCESS_KEY } from '$env/static/public';
//
// export interface CookieMap {
// 	[key: string]: string;
// }
//
// export function getAllCookies() {
// 	const cookies: CookieMap = {};
// 	const cookieString: string = document.cookie;
//
// 	if (cookieString) {
// 		const cookieArray: string[] = cookieString.split('; ');
// 		cookieArray.forEach((cookie) => {
// 			const [name, value] = cookie.split('=');
// 			cookies[name] = decodeURIComponent(value);
// 		});
// 	}
//
// 	return cookies;
// }
//
// export function retrieveDocuments(url: string, password: string) {
// 	console.log(url);
// 	console.log(password);
// 	dotenv.config();
//
// 	// TODO:
// 	// 1. Check that the URL begins with https://
// 	// 2. Password should be AccessKey since that is what will be used for auth
// 	// 3. Figure out how to deal with region, maybe ask the user?
// 	// 4. accessKeyId needs to be provided as well, hardcode for now
//
// 	const s3Client: S3Client = new S3Client({
// 		endpoint: 'https://adl.nyc3.digitaloceanspaces.com',
// 		forcePathStyle: false,
// 		region: 'nyc3',
// 		credentials: {
// 			accessKeyId: PUBLIC_BUCKET_ID,
// 			secretAccessKey: PUBLIC_BUCKET_ACCESS_KEY
// 		}
// 	});
//
// 	console.log(s3Client);
// }
