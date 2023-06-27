import { writable } from 'svelte/store';

export enum InfoType {
	ERROR = 'error',
	INFO = 'info'
}

export class Info {
	public readonly type: InfoType;
	public readonly title: string;
	public readonly text: string;
	public readonly id: number;
	public duration: number = 3000;

	private static curId = 0;

	constructor(type: InfoType, title: string, text: string, duration: number) {
		this.type = type;
		this.title = title;
		this.text = text;
		this.id = Info.curId++;
		if (duration !== undefined) {
			this.duration = duration;
		}
	}
}

export const notificationStore = writable<Info[]>([]);
export default class NotificationControl {
	static clear(): void {
		notificationStore.update(() => []);
	}

	static removeOldest(): void {
		notificationStore.update((arr) => [...arr.slice(1, arr.length)]);
	}

	static removeInfo = (info: Info) => {
		notificationStore.update((arr) => {
			const index = arr.findIndex((lInfo) => info.id === lInfo.id);
			if (index > -1) {
				return [...arr.slice(0, index), ...arr.slice(index + 1)];
			}
			return arr;
		});
	};

	private static addInfo = (
		type: InfoType,
		title: string,
		text: string,
		duration: number
	): Info => {
		const newInfo = new Info(type, title, text, duration);
		notificationStore.update((arr) => [...arr, newInfo]);
		return newInfo;
	};

	public static error(title: string, text: string, duration?: number): Info {
		return NotificationControl.addInfo(InfoType.ERROR, title, text, duration);
	}

	public static info = (title: string, text: string, duration?: number): Info => {
		return NotificationControl.addInfo(InfoType.INFO, title, text, duration);
	};
}
