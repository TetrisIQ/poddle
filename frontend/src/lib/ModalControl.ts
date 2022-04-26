import {writable} from "svelte/store";


export class Modal {
    public readonly title: string;
    public readonly body: string;
    public readonly id: number;
    public customButtonBar;
    public customBody;

    private static curentId = 0;

    constructor(title: string, body: string) {
        this.title = title;
        this.body = body
        this.id = Modal.curentId++;
    }

    setCustomBody = (body): Modal => {
        this.customBody = body;
        return this;
    }

    setCustomButtonBar = (buttonBar): Modal => {
        this.customButtonBar = buttonBar;
        return this;
    }
}

export const modalStore = writable<Modal>();
export default class ModalControl {

    static close(): void {
        modalStore.set(undefined);
    }

    static open = (title: string, body: string): Modal => {
        const newModal = new Modal(title, body);
        modalStore.set(newModal);
        return newModal;
    };

}