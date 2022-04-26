import {uuidv4} from "../lib/util";
import type {Poll} from "../model/Poll";
import type {Dayjs} from "dayjs";

export type MyPoll = { id: string, password: string, title: string, participants: number, deadline: Dayjs, created: Dayjs, percent?: string }

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
        if (clientId === null) {
            const id = uuidv4().slice(0, 5)
            localStorage.setItem("clientID", id)
            return id
        } else {
            return clientId;
        }
    }

    getMyPolls(): Array<MyPoll> {
        const myPolls = localStorage.getItem("myPolls")
        if (myPolls === null) {
            return [];
        }
        return JSON.parse(myPolls)
    }

    addPercentToPoll(poll: MyPoll): Array<MyPoll> {
        if (poll.percent !== undefined) {
            const myPolls: Array<MyPoll> = this.getMyPolls();
            const pollWithSameId: MyPoll = myPolls.find(p => p.id === poll.id);
            const index = myPolls.indexOf(pollWithSameId)
            if (index !== -1) {
                myPolls[index] = poll;
                localStorage.setItem("myPolls", JSON.stringify(myPolls))
                return myPolls;
            }
        }
        return this.getMyPolls()
    }

    addMyPoll(poll: Poll): boolean {
        if (poll.id === "" && poll.password === "") {
            return false;
        }
        const myPolls: Array<MyPoll> = this.getMyPolls();
        if (myPolls.find(value => value.id === poll.id) !== undefined) {
            // Update polls
            const pollWithSameId: MyPoll = myPolls.find(p => p.id === poll.id);
            const index = myPolls.indexOf(pollWithSameId)
            if (index !== -1) {
                myPolls[index] = {
                    id: poll.id,
                    title: poll.title,
                    participants: poll.participants.length,
                    password: poll.password,
                    deadline: poll.deadline,
                    created: poll.created
                }
            }
        } else {
            myPolls.push({
                id: poll.id,
                title: poll.title,
                participants: poll.participants.length,
                password: poll.password,
                deadline: poll.deadline,
                created: poll.created
            })
        }
        localStorage.setItem("myPolls", JSON.stringify(myPolls))
        return true;
    }

    removeMyPoll(poll) {
        if (poll !== undefined) {
            const myPolls: Array<MyPoll> = this.getMyPolls();
            const pollWithSameId: MyPoll = myPolls.find(p => p.id === poll.id);
            const index = myPolls.indexOf(pollWithSameId)
            if (index > -1) {
                myPolls.splice(index, 1); // 2nd parameter means remove one item only
            }
            localStorage.setItem("myPolls", JSON.stringify(myPolls))
            return myPolls;
        }
        return this.getMyPolls();
    }

    setUsername(name: string) {
        if (name === null) {
            localStorage.removeItem("username")
        } else {
            localStorage.setItem("username", name);
        }
    }

    getUsername(): string {
        return localStorage.getItem("username")
    }

    setPassword(password: string) {
        if (password === null) {
            localStorage.removeItem("_p")
        } else {
            localStorage.setItem("_p", btoa(password));
        }
    }

    getPassword(): string {
        return atob(localStorage.getItem("_p"))
    }
}


export const lstore = new LStore();
