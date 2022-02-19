import GUN, {SEA} from "gun"
import "gun/sea"
import type {PollDTOV1} from "../model/DTO/PollDTOV1";
import {page, pollDTO} from "../store";
import Error from "../view/404.svelte"

const db = getGUN();

function getGUN() {
    if (process.env.NODE_ENV === "development") {
        return new GUN("http://localhost:8765/gun")
    } else if (process.env.NODE_ENV === "production") {
        return new GUN('https://gun.tetrisiq.de/gun')
    } else if (process.env.NODE_ENV === "staging") {
        return new GUN("https://poll-dapp-staging-gun.herokuapp.com/gun")
    } else {
        return new GUN();
    }
}

class PollMutations {
    async getPoll(key: string, password: string) {
        // @ts-ignore
        const dtoVersion: number = await db.get("poll").get(key).get("dtoVersion").once(data => data);
        switch (dtoVersion) {
            case 1:
                db.get("poll").get(key).get("encryptedData").on(async (data) => {
                    pollDTO.set(await SEA.decrypt(data, password) as PollDTOV1)
                })
                break;
            default:
                db.get("poll").get(key).get("encryptedData").on(async (data) => {
                    pollDTO.set(await SEA.decrypt(data, password) as PollDTOV1)
                })
                break;

        }
    }

    async createPoll(data: PollDTOV1, key: string, password: string) {
        const enc = await SEA.encrypt(JSON.stringify(data), password)
        db.get("poll").get(key).put({
            dtoVersion: 1,
            timestamp: new Date().toDateString(),
            encryptedData: enc
        });
    }

    updatePoll(pollDTO: PollDTOV1, id: string, password: string) {
        console.log("UPDATE")
        this.createPoll(pollDTO, id, password)
    }
}

export const gun = new PollMutations();
