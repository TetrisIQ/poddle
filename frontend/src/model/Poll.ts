import type {Participant} from "./PollParticipant";
import type {Comment} from "./Comment";
import {Settings} from "./PollSettings";
import type {Option} from "./Option";
import {lstore} from "../gun/LStore";
import type {Dayjs} from "dayjs";

export class Poll {
    id: string;
    password: string;
    title: string;
    creatorName: string;
    location?: string;
    note?: string;
    created: Dayjs;
    deadline: Dayjs;
    participants: Array<Participant>;
    comments: Array<Comment>;
    settings: Settings;
    options: Array<Option>;

    constructor(id: string = "",
                password: string = "",
                title: string = "",
                creatorName: string = lstore.getMyName(),
                location: string = "",
                note: string = "",
                created: Dayjs = undefined,
                deadline: Dayjs = undefined,
                participants: Array<Participant> = new Array<Participant>(),
                comments: Array<Comment> = new Array<Comment>(),
                settings: Settings = new Settings(),
                options: Array<Option> = new Array<Option>()) {
        this.id = id;
        this.password = password;
        this.title = title;
        this.creatorName = creatorName;
        this.location = location;
        this.note = note;
        this.created = created;
        this.deadline = deadline;
        this.participants = participants;
        this.comments = comments;
        this.settings = settings;
        this.options = options;
    }
}