import GUN, {SEA} from "gun"
import "gun/sea"
import type {PollDTO} from "../model/PollDTO";
import {page, pollDTO} from "../store";
import Error from "../view/404.svelte"

const db = getGUN();

function getGUN() {
    if (process.env.NODE_ENV === "development") {
        return new GUN("http://localhost:8765/gun")
    } else if (process.env.NODE_ENV === "production") {
        return new GUN('https://gun.tetrisiq.de/gun')
    } else {
        return new GUN();
    }
}

class PollMutations {
    async getPoll(key: string, password: string) {
        db.get("poll").get(key)
            .map()
            .once(async (data, id) => {
                if (id === "encryptedData") {
                    const test = <PollDTO>await SEA.decrypt(data, password);
                    pollDTO.set(test as PollDTO);
                }
            });
        page.set(Error)

    }

    async createPoll(data: PollDTO, key: string, password: string) {
        const enc = await SEA.encrypt(JSON.stringify(data), password)
        db.get("poll").get(key).put({
            timestamp: new Date().toDateString(),
            encryptedData: enc
        });
    }

    updatePoll(pollDTO: PollDTO, id: string, password: string) {
        console.log("UPDATE")
        this.createPoll(pollDTO, id, password)
    }
}

export const gun = new PollMutations();
