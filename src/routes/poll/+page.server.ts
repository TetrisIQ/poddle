import { browser } from '$app/environment';
import { gun } from '$lib/gun/gunStore';
import type { Participant } from '$lib/store/types';
import SEA from 'gun/sea';
import type { PageData } from './$types';
import { sineOut } from 'svelte/easing';

// Loading the data on the server, so we have faster loading times and improvements for SEO
export const load = (async ({ url }) => {
	let poll;
	const id: string = url.searchParams.get('id');
	const pw: string = url.searchParams.get('key');

	await gun
		.get('poll')
		.get(id)
		.load(async (rawData) => {
			let participants = await rawData[
				Object.keys(rawData).filter((k) => k.startsWith('participant'))[0]
			]; // select participant object
			let keyIndex = Object.keys(rawData).filter((k) => k.startsWith('~'));
			console.log('index', keyIndex);
			let data = await rawData[keyIndex[0]]; // select the creators key

			const location = await SEA.decrypt(data.location, pw);
			let deadline, deadlineValue, fcfs, treeOptions, voteLimit, voteLimitAmount;
			if (data.settings) {
				const settings: Object = data.settings[Object.keys(data.settings)[0]]; // skip settings hash
				//@ts-ignore
				deadline = await SEA.decrypt(settings.deadline, pw);
				//@ts-ignore
				deadlineValue = await SEA.decrypt(settings.deadlineValue, pw);
				//@ts-ignore
				fcfs = await SEA.decrypt(settings.deadlineValue, pw);
				//@ts-ignore
				treeOptions = await SEA.decrypt(settings.treeOptions, pw);
				//@ts-ignore
				voteLimit = await SEA.decrypt(settings.voteLimit, pw);
				//@ts-ignore
				voteLimitAmount = await SEA.decrypt(settings.voteLimitAmount, pw);
			}
			const title = await SEA.decrypt(data.title, pw);
			const note = await SEA.decrypt(data.note, pw);
			const name = await SEA.decrypt(data.name, pw);
			let option = [];
			if (data.type === 'text') {
				Object.keys(data.option).forEach(async (o) => {
					const elem = Object.values(data.option[o])[0];
					//@ts-ignore
					const elemDec = await SEA.decrypt(elem, pw);
					option.push(elemDec);
				});
			} else {
				Object.values(data.option).forEach(async (o) => {
					const elem = Object.values(o)[0];
					//@ts-ignore
					const elemDec = await SEA.decrypt(elem, pw);
					option.push(elemDec);
				});
			}

			let p = new Array<Participant>();
			if (participants) {
				Object.keys(participants).forEach(async (k) => {
					const elem = participants[k];
					const option = elem.option ? Object.values(elem.option) : [];
					//@ts-ignore
					p.push({ id: k.replace('~', ''), name: elem.name, option });
				});
			}

			poll = {
				location,
				title,
				note,
				name,
				created: data.created,
				option,
				optionType: data.type,
				settings: {
					deadline,
					deadlineValue,
					fcfs,
					treeOptions,
					voteLimit,
					voteLimitAmount
				},
				participants: p
			};
			return poll;
		});

	console.log(poll);
	return {
		poll,
		id,
		key: pw
	};
}) satisfies PageData;
