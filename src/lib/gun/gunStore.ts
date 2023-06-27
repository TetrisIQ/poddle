import { writable } from 'svelte/store';
import GUN from 'gun';
import 'gun/sea';
import { browser, dev } from '$app/environment';
import 'gun/lib/load.js';
import 'gun/lib/open.js';
import NotificationControl from '$lib/components/Notification/NotificationControl';

export const gun = browser
	? new GUN({ peers: [`http://${window.location.host}/gun`] })
	: global.gun;

export const messages = writable<Array<string>>([]);

export function debugCB(ack) {
	if (dev) {
		if (ack.err) {
			console.error('DebugCB', ack);
			return NotificationControl.error('DebugCB', ack.err);
		} else {
			console.info('DebugCB', ack);
		}
	}
}
export function defaultCB(ack) {
	if (ack.err) {
		console.error(ack);
		return NotificationControl.error('Error', ack.err);
	}
}
