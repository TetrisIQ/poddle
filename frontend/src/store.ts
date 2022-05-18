import { writable } from "svelte/store";
import Home from "./view/Home.svelte";
import { Poll } from "./model/Poll";
import type { PollDTOV1 } from "./model/DTO/PollDTOV1";
import type { ReleaseMessage } from "./model/ReleaseMessage";
import type { ISchedule } from "tui-calendar";
import type Calendar from "tui-calendar";

export const page = writable(Home);
export const currentPoll = writable<Poll>(new Poll());
export const pollDTO = writable<PollDTOV1>();
export const releaseMessage = writable<ReleaseMessage>();
export const events = writable<Map<number, ISchedule>>(
  new Map<number, ISchedule>()
);
export const editSchedule = writable();
export const tuiApi = writable<Calendar>();
export const modalData = writable();

export function resetPollStore() {
  currentPoll.set(new Poll());
  pollDTO.set(undefined);
}
