// Store for all polls I have created and all polls I have participated in
import { persisted } from 'svelte-local-storage-store';
import type { SavedPoll } from './types';

export const createdPolls = persisted<Array<SavedPoll>>('createdPolls', new Array());
export const participatedPolls = persisted<Array<SavedPoll>>('participatedPolls', new Array());
