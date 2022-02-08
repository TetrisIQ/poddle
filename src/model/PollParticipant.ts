export class Participant{
    name: string;
    chosenOptions: Array<number>;
    edit: boolean;

    constructor(name: string, chosenOptions: Array<number> = [], edit: boolean = false) {
        this.name = name;
        this.chosenOptions = chosenOptions
        this.edit = edit;
    }

}