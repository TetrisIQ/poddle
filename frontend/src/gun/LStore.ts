import {uuidv4} from "../lib/util";

class LStore {

    setMyName(name: string) {
        localStorage.setItem("name", name);
    }

    getMyName(): string {
        const name = localStorage.getItem("name")
        if (name === null) {
            return "Anonymous"
        } else {
            return name;
        }
    }

    getClientID() {
        const clientId = localStorage.getItem("clientID")
        if(clientId === null) {
            const id = uuidv4().slice(0, 5)
            localStorage.setItem("clientID", id)
            return id
        } else {
            return clientId;
        }
    }

}


export const lstore = new LStore();
