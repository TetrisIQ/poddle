import {writable} from "svelte/store";
import Home from "./view/Home.svelte";
import {Poll} from "./model/Poll";
import type {PollDTOV1} from "./model/DTO/PollDTOV1";
import type {ReleaseMessage} from "./model/ReleaseMessage";


export const page = writable(Home);
export const showNotification = writable<boolean>()
export const currentPoll = writable<Poll>(new Poll())
export const pollDTO = writable<PollDTOV1>()
export const releaseMessage = writable<ReleaseMessage>()

export function resetPollStore() {
    currentPoll.set(new Poll());
    pollDTO.set(undefined)
}