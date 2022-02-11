import type {Poll} from "./Poll";
import type {Option} from "./Option";
import type {Participant} from "./PollParticipant";
import type {Settings} from "./PollSettings";

export class PollDTO {
    title: string;
    creatorName: string;
    creatorEmail?: string;
    location?: string;
    note?: string;
    created: Date;
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

    constructor(poll: Poll, settings: Settings, options: Array<Option>, participants: Array<Participant>) {
        this.title = poll.title;
        this.creatorName = poll.creatorName;
        this.creatorEmail = poll.creatorEmail;
        this.location = poll.location;
        this.note = poll.note;
        this.created = poll.created;
        this.settings = {
            treeOptions: settings.treeOptions,
            fcfs: settings.fcfs,
            onlyOneOption: settings.onlyOneOption,
            deadline: settings.deadline,
        }
        this.options = new Array<{ id: number; option: string }>();
        this.participant = new Array<{ name: string; chosenOptions: Array<{ id: number, value: "yes" | "no" | "ifNeededBe" }> }>()

        options.forEach(o => this.options.push({id: o.id, option: o.option}))
        participants.forEach(p => this.participant.push({name: p.name, chosenOptions: p.chosenOptions}))
    }

}