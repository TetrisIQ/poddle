import GUN, {SEA} from "gun"
import "gun/sea"
import {PollDTOV1} from "../model/DTO/PollDTOV1";
import {currentPoll, pollDTO, releaseMessage} from "../store";
import type {ReleaseMessage} from "../model/ReleaseMessage";
import type {def} from "./PollGun";
import {pollGun} from "./PollGun";
import {commentGun} from "./CommentGun";
import {lstore} from "./LStore";

class PollMutations {
    adminPubKey = "zgocnIYfpe41Rmocp1GI8OtN4rHVeG65T_V8QkhG0aA.rx0glUxtJUpxl1sc-AOh1tg3qhiykE7ektEHWkShFCA";
    db = PollMutations.getGUN();

    private static getGUN() {
        if (process.env.NODE_ENV === "development") {
            return new GUN("http://localhost:8765/gun")
            // return new GUN();
        } else {
            return new GUN('https://gun.tetrisiq.de/gun')
        }
    }

    async getReleaseMessage() {
        this.db.get("message").once(async (message) => {
            if (message !== undefined) {
                SEA.verify(message.message, this.adminPubKey).then(res => {
                    if (res === undefined) {
                        console.error("Verify of message Failed")
                        releaseMessage.set(undefined)
                        return;
                    }
                    releaseMessage.set(res as ReleaseMessage)
                })
            }
        })
    }

    async createReleaseMessage(pair, releaseMessage) {
        let message = await SEA.sign(JSON.stringify(releaseMessage), pair)
        this.db.get("message").put({message})
    }


    async detectOldPoll(key: string) {
        // @ts-ignore
        const encCreatorName: string = await this.db.get("poll").get(key).get("creatorName").once(data => data);
        // @ts-ignore
        const encData: string = await this.db.get("poll").get(key).get("encryptedData").once(data => data);
        return encCreatorName === undefined && encData !== undefined;
    }

    //Deprecated
    async getPoll(key: string, password: string) {
        // @ts-ignore
        const dtoVersion: number = await this.db.get("poll").get(key).get("dtoVersion").once(data => data);
        switch (dtoVersion) {
            case 1:
                this.db.get("poll").get(key).get("encryptedData").once(async (data) => {
                    const dto = await SEA.decrypt(data, password) as PollDTOV1
                    const poll = PollDTOV1.getPoll(dto, key, password);
                    currentPoll.set(poll)
                    // Remove encryptedData
                    // @ts-ignore
                    this.db.get("poll").get(key).get("encryptedData").put("undefined")
                    console.log("SAVE OLD POLL IN NEW FORMAT", poll)
                    await pollGun.createPoll(poll);
                    poll.participants.forEach(p => pollGun.addParticipant(p, key, password))
                    poll.comments.forEach(c => commentGun.addComment(c, key, password))
                })
                break;
            default:
                this.db.get("poll").get(key).get("encryptedData").once(async (data) => {
                    pollDTO.set(await SEA.decrypt(data, password) as PollDTOV1)
                })
                break;

        }
    }

    async decryptValue(value, password): Promise<any> {
        if (value !== undefined) {
            return SEA.decrypt(value, password);
        }
    }

    async encryptValue(value, password): Promise<string> {
        if (value !== undefined) {
            return await SEA.encrypt(value, password) as string;
        }
    }

    async encryptAndSave(id, password, value, firstPath: def["pollPaths"]) {
        if (value === undefined) {
            console.log("VALUE IS undefined for " + firstPath)
        } else {
            const data = await SEA.encrypt(value, password);
            // @ts-ignore
            this.db.get("poll").get(id).get(firstPath).put(data)
        }
    }

    async getPollCounter(): Promise<number> {
        const value = await this.db.get("poll-counter");
        let pollCount: number = 0;
        for (let valueKey in value) {
            if (valueKey !== "_") {
                // @ts-ignore
                const counter: number = await this.db.get("poll-counter").get(valueKey).get("counter").once(counter => counter);
                if (counter !== undefined) {
                    pollCount = pollCount + counter;
                }
            }
        }
        //@ts-ignore  legacy counter
        const legacyCounter: number = await this.db.get("poll-counter").get("currentCount").once(counter => counter);
        if (legacyCounter !== undefined) {
            pollCount = pollCount + legacyCounter;
        }
        return pollCount;
    }

    async incrementPollCounter() {
        // @ts-ignore
        const promis: Promise<number> = this.db.get("poll-counter").get(lstore.getClientID()).get("counter").on(counter => counter)
        let currentCount: number;
        await promis.then(res => currentCount = res)
        if (currentCount === undefined) {
            // counter is 0
            await this.db.get("poll-counter").get(lstore.getClientID()).put({counter: 1})
        } else {
            await this.db.get("poll-counter").get(lstore.getClientID()).put({counter: (currentCount + 1) as number})
        }

    }
}

// @ts-ignore
export const gun = new PollMutations();
//