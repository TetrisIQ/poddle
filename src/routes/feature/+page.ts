import type { PageLoad } from './$types';
import dayjs from 'dayjs';

export const load = (async ({ fetch }) => {
	// Fetch github API
	let gitStars;
	let lastUpdate;
	await fetch('https://api.github.com/repos/tetrisiq/poddle', { method: 'GET', redirect: 'follow' })
		.then((response) => response.json())
		.then((result) => {
			gitStars = result.stargazers_count;
			lastUpdate = dayjs(result.pushed_at);
		})
		.catch((error) => console.log('error', error));
	return { gitStars, lastUpdate };
}) satisfies PageLoad;
