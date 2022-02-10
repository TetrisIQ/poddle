export class Participant {
    name: string;
    chosenOptions: Array<{ id: number, value: "yes" | "no" | "ifNeededBe" }>;
    edit: boolean;

    constructor(name: string, edit: boolean = false, chosenOptions: Array<{ id: number, value: "yes" | "no" | "ifNeededBe" }> = []) {
        this.name = name;
        this.chosenOptions = chosenOptions
        this.edit = edit;
    }

}