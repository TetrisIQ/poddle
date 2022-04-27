export class Option {
  id: number;
  option: string;
  type: string;
  count: number;
  ifNeeded: number;

  constructor(id: number = 0, option: string = "", type: string = "text") {
    this.id = id;
    this.option = option;
    this.count = 0;
    this.type = type;
    this.ifNeeded = 0;
  }
}
