export class Comment {
    name: string;
    comment: string;
    time: Date;

    constructor(name: string, comment: string = "", time: Date = new Date()) {
        this.name = name;
        this.comment = comment;
        this.time = time;
    }

    getPrintableDate(): string {
        if (this.time === undefined) {
            return "Invalid Time"
        }
        return this.time.toLocaleDateString();
    }

    updateTime() {
        this.time = new Date();
    }
}