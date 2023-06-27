import type { Dayjs } from 'dayjs';

export type Options = {
	options: Array<Option>;
	type: 'text' | 'week';
};
export type Option = {
	name: string;
	state: number; // 1 true, 0 false, -1 maybe
};

export type Participant = {
	id: string;
	name: string;
	option: Array<Option>;
};

export type SavedPoll = {
	id: string;
	key: string;
	title: string;
	deadline?: Dayjs | string;
	created: Dayjs;
	percent?: string;
};
