import type {Option} from "./Option";
import {uuidv4} from "../lib/util";

export class Participant {
    name: string;
    chosenOptions: Array<{ id: number, value: "yes" | "no" | "ifNeededBe" }> = [];
    edit: boolean;
    randomKey: string;

    constructor(name: string, edit: boolean = false, options: Array<Option>, chosenOptions: Array<{ id: number, value: "yes" | "no" | "ifNeededBe" }> = [], randomKey: string = undefined) {
        this.name = name;
        if(randomKey === undefined) {
            this.randomKey = uuidv4().slice(0, 5);
        }else {
            this.randomKey = randomKey;
        }
        if (options !== undefined) {
            options.forEach(o => this.chosenOptions.push({id: o.id, value: "no"}))
        } else {
            this.chosenOptions = chosenOptions
        }
        this.edit = edit;
    }

}