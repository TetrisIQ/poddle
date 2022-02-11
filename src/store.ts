import {writable} from "svelte/store";
import Home from "./view/Home.svelte";
import {Poll} from "./model/Poll";
import {Option} from "./model/Option";
import type {Participant} from "./model/PollParticipant";
import {Settings} from "./model/PollSettings";
import type {PollDTO} from "./model/PollDTO";
import type {PollComment} from "./model/PollComment";



export const page = writable(Home);
export const showNotification = writable<boolean>()
// @ts-ignore
export const currentPoll = writable<Poll>(new Poll())
export const pollOptions = writable<Array<Option>>([new Option()])
export const pollParticipants = writable<Array<Participant>>([]);
export const myName = writable<string>()
export const pollSettings = writable<Settings>(new Settings())
export const pollDTO = writable<PollDTO>()
export const pollComments = writable<Array<PollComment>>([])


export function resetPollStore() {
    //@ts-ignore
    currentPoll.set(new Poll());
    pollOptions.set([new Option()])
    pollParticipants.set([])
    pollSettings.set(new Settings())
    pollDTO.set(undefined)
}