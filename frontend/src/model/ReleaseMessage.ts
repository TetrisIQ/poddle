export class ReleaseMessage {
    title: string;
    content: string;
    kind: "release" | "celebrate" | "warning"
    ttl: string; // TTL in days
    createdOn: string;


    constructor(title: string = "", content: string = "", kind: "release" | "celebrate" | "warning" = "release", ttl: string = "", createdOn : Date = new Date()) {
        this.title = title;
        this.content = content;
        this.kind = kind;
        this.ttl = ttl;
        this.createdOn = createdOn.toUTCString()
    }


}