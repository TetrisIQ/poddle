import GUN, {SEA} from "gun"
import "gun/sea"
import type {PollDTOV1} from "../model/DTO/PollDTOV1";
import {page, pollDTO, releaseMessage} from "../store";
import type {ReleaseMessage} from "../model/ReleaseMessage";

const db = getGUN();

function getGUN() {
    if (process.env.NODE_ENV === "development") {
        // return new GUN("http://localhost:8765/gun")
        return new GUN()
    } else if (process.env.NODE_ENV === "production") {
        return new GUN('https://gun.tetrisiq.de/gun')
    } else if (process.env.NODE_ENV === "staging") { // Staging instance has been removed for now, maybe in future I will add a new
        return new GUN("https://poll-dapp-staging-gun.herokuapp.com/gun")
    } else {
        return new GUN();
    }
}

class PollMutations {
    adminPubKey = "zgocnIYfpe41Rmocp1GI8OtN4rHVeG65T_V8QkhG0aA.rx0glUxtJUpxl1sc-AOh1tg3qhiykE7ektEHWkShFCA";

    async getReleaseMessage() {
        db.get("message").once(async (message) => {

            SEA.verify(message?.message, this.adminPubKey).then(res => {
                if (res === undefined) {
                    console.error("Verify of message Failed")
                    releaseMessage.set(undefined)
                    return;
                }
                releaseMessage.set(res as ReleaseMessage)
            })
        })
    }

    async createReleaseMessage(pair, releaseMessage) {
        let message = await SEA.sign(JSON.stringify(releaseMessage), pair)
        db.get("message").put({message})
    }


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