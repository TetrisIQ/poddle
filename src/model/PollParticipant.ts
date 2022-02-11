import type {Option} from "./Option";

export class Participant {
    name: string;
    chosenOptions: Array<{ id: number, value: "yes" | "no" | "ifNeededBe" }> = [];
    edit: boolean;

    constructor(name: string, edit: boolean = false, options : Array<Option>, chosenOptions: Array<{ id: number, value: "yes" | "no" | "ifNeededBe" }> = [] ) {
        this.name = name;
        if(options !== undefined) {
            options.forEach(o => this.chosenOptions.push({id: o.id, value: "no"}))
        }else {
            this.chosenOptions = chosenOptions
        }
        this.edit = edit;
    }

}