import {uuidv4} from "../lib/util";
import type {Dayjs} from "dayjs";
import dayjs from "dayjs";

export class Comment {
    id: string;
    name: string;
    comment: string;
    time: Dayjs;

    constructor(name: string, comment: string = "", time: Dayjs = dayjs(), randomKey: string = undefined) {
        this.name = name;
        this.comment = comment;
        this.time = time;
        if (randomKey === undefined) {
            this.id = uuidv4().slice(0, 5)
        } else {
            this.id = randomKey;
        }

    }

    getPrintableDate(): string {
        if (this.time === undefined) {
            return "Invalid Time"
        }
        return this.time.toDate().toDateString();
    }

    updateTime() {
        this.time = dayjs();
    }
}