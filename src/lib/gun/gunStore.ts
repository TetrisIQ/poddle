import { writable } from 'svelte/store';
import GUN, { SEA, type IGun } from 'gun';
import 'gun/sea';

export const gun = new GUN({ peers: ['http://127.0.0.1:8765/gun'] });

export const messages = writable<Array<string>>([]);
