import type {Poll} from "../model/Poll";
import {gun} from "./index";
import {Participant} from "../model/PollParticipant";
import {SEA} from "gun";
import dayjs from "dayjs";
import {currentPoll} from "../store";
import NotificationControl from "../lib/NotificationControl";

export interface def {
    pollPaths: "title" | "created" | "creatorName" | "location" | "note" | "settings.fcfs" | "settings.deadline" | "settings.voteLimit" | "settings.voteLimitAmount" | "deadline" | "options"
}

export class PollGun {

    poll: Poll;

    init() {
        if (this.poll === undefined) {
            currentPoll.subscribe(value => this.poll = value);
        }
    }


    async createPoll(poll: Poll) {
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
            const name = await SEA.encrypt(participant.name, password);

            console.log("ENC Ready", participant, name)
            gun.db.get(`poll/${id}/participants`).get(participant.randomKey).put({
                name: name,
                chosenOptions: options
            }, function(ack){
                if(ack.err){
                    NotificationControl.info("Cannot save Poll", "Look in the console for more information.");
                    console.error("Cannot save: (ack, participant, name, options)", ack, participant, name, options)
                } else {
                    NotificationControl.info("Poll saved", "The Poll has been saved!");
                }
            })
        } else {
            console.error("Participant is undefined")
        }
    }

    async getAllParticipant(id: string, password: string) {
        this.init();
        gun.db.get("poll").get(id).get("participants").on((data) => {
            if ((Object.keys(data).length - 1) !== this.poll.participants.length) {
                for (let valueKey in data) {
                    if (valueKey !== "_") {
                        gun.db.get("poll").get(id).get("participants").get(valueKey).on(async (data) => {
                            const name = await SEA.decrypt(data.name, password) as string;
                            const options = await SEA.decrypt(data.chosenOptions, password) as Array<{ id: number, value: "yes" | "no" | "ifNeededBe" }>;
                            currentPoll.update(arr => {
                                if (arr.participants.find(p => p.randomKey === valueKey) !== undefined) {
                                    const existingParticipant = arr.participants.find(p => p.randomKey === valueKey);
                                    existingParticipant.chosenOptions = options;
                                } else {
                                    arr.participants.push(new Participant(name, false, undefined, options, valueKey));
                                }
                                arr = arr;
                                return arr;
                            })
                        })
                    }
                }
            }
        })
    }

    getEntity(key: string, path: def["pollPaths"]) {
        return gun.db.get("poll").get(key).get(path);
    }

    async encrypt(value: string, password) {
        return await this.enc(value, password).then(res => res);
    }

    private async enc(value: string, password) {
        return await SEA.decrypt(value, password).then(res => res);
    }

}

export const pollGun = new PollGun();