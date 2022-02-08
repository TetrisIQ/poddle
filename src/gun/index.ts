import GUN, {SEA} from "gun"
import "gun/sea"
import type {PollDTO} from "../model/PollDTO";
import {page, pollDTO} from "../store";
import Error from "../view/404.svelte"

const db = process.env.NODE_ENV === "development" ? new GUN("http://localhost:8765/gun") : new GUN('https://gun.tetrisiq.de/gun');

class PollMutations {
    async getPoll(key: string, password: string) {
        db.get("poll").get(key)
            .map()
            .on(async (data, id) => {
                console.log("NOSE", id)
                if (id === "encryptedData") {
                    console.log("Nose1", data)
                    pollDTO.set(<PollDTO>await SEA.decrypt(data, password));
                } else {
                    console.log(data)
                }
            });
        page.set(Error)

    }

    async test() {
        // var msg = await SEA.encrypt("Please do not tell this to anybody", "foo");
        // await db.get("test").get("1").put({msg})
        // await db.get("test").get("1").once(async (data, id) => {
        //     console.log(await SEA.decrypt(msg, "foo")); // true
        // })
    }

    async createPoll(data: PollDTO, key: string, password: string) {
        console.log(JSON.stringify(data))
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
