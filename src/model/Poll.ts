export class Poll {
    id: string;
    password: string;
    title: string;
    creatorName: string;
    creatorEmail?: string;
    location?: string;
    note?: string;
    created: Date;


    constructor(id: string, password: string, title: string, creatorName: string, creatorEmail: string, location: string, note: string, created: Date) {
        this.id = id;
        this.password = password;
        this.title = title;
        this.creatorName = creatorName;
        this.creatorEmail = creatorEmail;
        this.location = location;
        this.note = note;
        this.created = created;
    }
}