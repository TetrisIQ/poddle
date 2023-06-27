import type { Dayjs } from 'dayjs';
import { writable } from 'svelte/store';
import type Calendar from 'tui-calendar';
import type { ISchedule } from 'tui-calendar';
import type { Options, Option } from './types';

export const name = writable<string>('');

export const title = writable<string>('');
export const location = writable<string>('');
export const note = writable<string>('');

export const options = writable<Options>({ options: new Array<Option>(), type: 'text' });

export const treeOptions = writable<boolean>(false);
export const voteLimit = writable<boolean>(false);
export const voteLimitAmount = writable<number>(1);

export const fcfs = writable<boolean>(false);
export const deadline = writable<boolean>(false);
export const deadlineValue = writable<Dayjs>();

export const tuiApi = writable<Calendar>();
export const events = writable<Map<number, ISchedule>>(new Map<number, ISchedule>());
export const editSchedule = writable();
