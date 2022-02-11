import type {Poll} from "./Poll";
import type {Option} from "./Option";
import type {Participant} from "./PollParticipant";
import type {Settings} from "./PollSettings";
import type {PollComment} from "./PollComment";

export class PollDTO {
    title: string;
    creatorName: string;
    creatorEmail?: string;
    location?: string;
    note?: string;
    created: string;
    deadline: string;
    options: Array<{
        id: number;
        option: string;
    }>
    settings: {
        treeOptions: boolean;
        fcfs: boolean; //First come, first served
        onlyOneOption: boolean;
        deadline: boolean;
    }
    participant: Array<{
        name: string;
        chosenOptions: Array<{ id: number, value: "yes" | "no" | "ifNeededBe" }>
    }>
    comments: Array<{
        name: string;
        comment: string;
        time: string;
    }> = [];

    constructor(poll: Poll, settings: Settings, options: Array<Option>, participants: Array<Participant>, comments: Array<PollComment>) {
        this.title = poll.title;
        this.creatorName = poll.creatorName;
        this.creatorEmail = poll.creatorEmail;
        this.location = poll.location;
        this.note = poll.note;
        if (poll.created === undefined) {
            poll.created = new Date();
        }
        //@ts-ignore
        this.created = poll.created;
        this.settings = {
            treeOptions: settings.treeOptions,
            fcfs: settings.fcfs,
            onlyOneOption: settings.onlyOneOption,
            deadline: settings.deadline,
        }
        if (this.settings.deadline) {
            console.log("NAE", poll.deadline)
            //@ts-ignore
            this.deadline = poll.deadline;
        }
        this.options = new Array<{ id: number; option: string }>();
        this.participant = new Array<{ name: string; chosenOptions: Array<{ id: number, value: "yes" | "no" | "ifNeededBe" }> }>()

        console.log("POLL", comments)
        comments?.forEach(c => this.comments.push({name: c.name, comment: c.comment, time: c.time?.toDateString()}))
        options.forEach(o => this.options.push({id: o.id, option: o.option}))
        participants.forEach(p => this.participant.push({name: p.name, chosenOptions: p.chosenOptions}))
    }

}