import { browser } from '$app/environment';
import NotificationControl from '$lib/components/Notification/NotificationControl';
import { debugCB, defaultCB, gun } from '$lib/gun/gunStore';
import type { ISEAPair } from 'gun';
import SEA from 'gun/sea';
import { persisted } from 'svelte-local-storage-store';
import { writable } from 'svelte/store';
import { generateUsername } from 'unique-username-generator';
import { v4 as uuidv4 } from 'uuid';

export const user = gun.user();

export const username = persisted<string>('username', '');
export const password = persisted<string>('password', '');
export const pair = writable<ISEAPair>();

export async function generateNewUsername() {
	const name: string = generateUsername('-') + Math.floor(Math.random() * 999);
	console.log('Your new username', name);
	username.set(name);
	const pw = await newPassword();
	await user.create(name, pw, (ack) => {
		//@ts-ignore
		if (ack.err) {
			//TODO: handle Error
			//@ts-ignore
			NotificationControl.error('Cannot create new user', ack.err);
		} else {
			//@ts-ignore
			let p = ack.pub;
			gun.get(`~${p}`).get(name).put(name, debugCB);
		}
	});
	loginAutomatic(name, pw);
}

async function newPassword(pw = uuidv4()) {
	const hashedPw = await hash(pw);
	password.set(hashedPw);
	console.log('Your hashed password', hashedPw);
	return hashedPw;
}

export async function loginAutomatic(username: string, password: string) {
	if (browser && !user.is) {
		console.log('User is getting logged in');
		await user.auth(username, password, (ack) => {
			//@ts-ignore
			if (!ack.err) {
				//@ts-ignore
				pair.set(ack.sea);
			} else {
				defaultCB(ack);
			}
		});
	}
}

async function hash(string) {
	return await SEA.work(string, null, null, { name: 'SHA-256' });
}
