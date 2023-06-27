import { gun } from '$lib/gun/gunStore';
import type { PageLoad } from './$types';

// Loading the data on the server, so we have faster loading times and improvements for SEO
export const load = (async ({ params }) => {
	let returnData;
	await gun.get('chat').once((data) => {
		if (data === undefined) {
			return [];
		}
		returnData = JSON.parse(data.m);
	});
	return {
		chats: returnData
	};
}) satisfies PageLoad;
