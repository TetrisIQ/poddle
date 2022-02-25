import type {Poll} from "../model/Poll";
import {gun} from "./index";
import {Participant} from "../model/PollParticipant";
import {SEA} from "gun";
import dayjs from "dayjs";

export interface def {
    pollPaths: "title" | "created" | "creatorName" | "location" | "note" | "settings.fcfs" | "settings.deadline" | "settings.voteLimit" | "settings.voteLimitAmount" | "deadline" | "options"
}

export class PollGun {

    async createPoll(poll: Poll) {
        let createPoll = Object()
        await gun.encryptAndSave(poll.id, poll.password, poll.title, "title")
        await gun.encryptAndSave(poll.id, poll.password, dayjs().toJSON(), "created")
        await gun.encryptAndSave(poll.id, poll.password, poll.creatorName, "creatorName")
        await gun.encryptAndSave(poll.id, poll.password, poll.location, "location")
        await gun.encryptAndSave(poll.id, poll.password, poll.note, "note")
        await gun.encryptAndSave(poll.id, poll.password, poll.settings.fcfs, "settings.fcfs")
        await gun.encryptAndSave(poll.id, poll.password, poll.settings.voteLimit, "settings.voteLimit")
        await gun.encryptAndSave(poll.id, poll.password, poll.settings.voteLimitAmount, "settings.voteLimitAmount")
        await gun.encryptAndSave(poll.id, poll.password, poll.settings.deadline, "settings.deadline")
        await gun.encryptAndSave(poll.id, poll.password, poll.deadline?.toJSON(), "deadline")
        await gun.encryptAndSave(poll.id, poll.password, JSON.stringify(poll.options), "options")
        await gun.incrementPollCounter()
    }

    async addParticipant(participant: Participant, id: string, password: string) {
        if (participant !== undefined) {
            const options = await SEA.encrypt(JSON.stringify(participant.chosenOptions), password);
            // @ts-ignore
            gun.db.get("poll").get(id).get("participants").get(participant.randomKey).get("chosenOptions").put(options)
            const name = await SEA.encrypt(participant.name, password);
            // @ts-ignore
            gun.db.get("poll").get(id).get("participants").get(participant.randomKey).get("name").put(name)
        }
    }

    async getAllParticipant(id: string, password: string) {
        const value = await gun.db.get("poll").get(id).get("participants");
        const returnArray: Array<Participant> = new Array<Participant>();
        for (let valueKey in value) {
            if (valueKey !== "_") {
                const encName = await gun.db.get("poll").get(id).get("participants").get(valueKey).get("name");
                const encOptions = await gun.db.get("poll").get(id).get("participants").get(valueKey).get("chosenOptions");
                const name = await SEA.decrypt(encName, password) as string;
                const options = await SEA.decrypt(encOptions, password) as Array<{ id: number, value: "yes" | "no" | "ifNeededBe" }>;
                returnArray.push(new Participant(name, false, undefined, options, valueKey))
            }
        }
        return returnArray;
    }

    async getEntity(key: string, password: string, path: def["pollPaths"]) {
        return await gun.getAndDecrypt(key, password, path);
    }

}

export const pollGun = new PollGun();