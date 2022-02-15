import {Poll} from "../Poll";
import {Option} from "../Option";
import {Participant} from "../PollParticipant";
import {Comment} from "../Comment";

export class PollDTOV1 {
    pollDTOversion: number = 1;
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
        voteLimit: boolean; // 0 is disabled
        voteLimitAmount: number; // 0 is disabled
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

    constructor(poll: Poll) {
        this.title = poll.title;
        this.creatorName = poll.creatorName;
        this.creatorEmail = "";
        this.location = poll.location;
        this.note = poll.note;
        if (poll.created === undefined) {
            poll.created = new Date();
        }
        //@ts-ignore
        this.created = poll.created;
        this.settings = {
            treeOptions: poll.settings.treeOptions,
            fcfs: poll.settings.fcfs,
            voteLimit: poll.settings.voteLimit,
            voteLimitAmount: poll.settings.voteLimitAmount,
            deadline: poll.settings.deadline,
        }
        if (this.settings.deadline) {
            //@ts-ignore
            this.deadline = poll.deadline;
        }
        this.options = new Array<{ id: number; option: string }>();
        this.participant = new Array<{ name: string; chosenOptions: Array<{ id: number, value: "yes" | "no" | "ifNeededBe" }> }>()

        poll.comments?.forEach(c => this.comments.push({
            name: c.name,
            comment: c.comment,
            time: c.time?.toDateString()
        }))
        poll.options.forEach(o => this.options.push({id: o.id, option: o.option}))
        poll.participants.forEach(p => this.participant.push({name: p.name, chosenOptions: p.chosenOptions}))
    }

    static getPoll(dto: PollDTOV1, id: string, password: string): Poll {
        const participant: Array<Participant> = dto.participant.map(p => new Participant(p.name, false, undefined, p.chosenOptions))
        const options: Array<Option> = dto.options.map(o => new Option(o.id, o.option))
        const comments: Array<Comment> = dto.comments.map(c => new Comment(c.name, c.comment, new Date(c.time)));
        return new Poll(id, password, dto.title, dto.creatorName, dto.location, dto.note, new Date(dto.created), new Date(dto.deadline), participant, comments, dto.settings, options)
    }

}