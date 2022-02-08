export class Settings {
    treeOptions: boolean;
    fcfs: boolean; //First come, first served
    onlyOneOption: boolean;
    deadline: boolean;


    constructor(treeOptions: boolean = false, fcfs: boolean = false, onlyOneOption: boolean = false, deadline: boolean = false) {
        this.treeOptions = treeOptions;
        this.fcfs = fcfs;
        this.onlyOneOption = onlyOneOption;
        this.deadline = deadline;
    }
}