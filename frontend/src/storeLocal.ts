import type { Dayjs } from "dayjs";
import { writable } from "svelte-local-storage-store";

export type MyPoll = {
  id: string;
  password: string;
  title: string;
  participants: number;
  deadline: Dayjs;
  created: Dayjs;
  percent?: string;
};

export const myName = writable<string>("name", "Anonymous");
export const clientID = writable<string>("clientID", null);
export const myPolls = writable<Array<MyPoll>>("myPolls", []);
export const username = writable<string>("username", undefined);
export const password = writable<string>("_p", undefined);
