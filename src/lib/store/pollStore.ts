import { writable } from 'svelte/store';

import type { Options, Option, Participant } from './types';

export const pollOptions = writable<Options>({ options: new Array<Option>(), type: 'text' });
export const participants = writable<Array<Participant>>(new Array<Participant>());
