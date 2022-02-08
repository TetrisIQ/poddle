export class Option {
    id: number;
    option: string;
    count: number;

    constructor(id: number = 0, option : string = "") {
        this.id = id;
        this.option = option;
        this.count = 0;
    }

}