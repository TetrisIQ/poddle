export class Comment {
    name: string;
    comment: string;
    time: Date;

    constructor(name: string, comment: string, time: Date) {
        if (name === undefined) {
            this.name = "Anonymous"
        } else {
            this.name = name;
        }
        this.comment = comment;
        this.time = time;
    }

    getPrintableDate(): string {
        if(this.time === undefined) {
            return "Invalid Time"
        }
        return this.time.toLocaleDateString();
    }
}