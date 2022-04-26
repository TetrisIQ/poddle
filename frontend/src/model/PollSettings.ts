export class Settings {
    treeOptions: boolean;
    fcfs: boolean; //First come, first served
    voteLimit: boolean;
    voteLimitAmount: number;
    deadline: boolean;


    constructor(treeOptions: boolean = false, fcfs: boolean = false, voteLimit: boolean = false, voteLimitAmount: number = 1, deadline: boolean = false) {
        this.treeOptions = treeOptions;
        this.fcfs = fcfs;
        this.voteLimit = voteLimit; // limit of 0 is disabled
        this.voteLimitAmount = voteLimitAmount;
        this.deadline = deadline;
    }
}