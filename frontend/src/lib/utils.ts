/*
    This file contains random utility functions that are used throughout the frontend. There is no logic for which functions are placed here.
*/

export interface CookieMap {
	[key: string]: string;
}

export function getAllCookies() {
	const cookies: CookieMap = {};
	const cookieString: string = document.cookie;

	if (cookieString) {
		const cookieArray: string[] = cookieString.split('; ');
		cookieArray.forEach((cookie) => {
			const [name, value] = cookie.split('=');
			cookies[name] = decodeURIComponent(value);
		});
	}

	return cookies;
}
