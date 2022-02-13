class LStore {

    setMyName(name: string) {
        localStorage.setItem("name", name);
    }

    getMyName(): string {
        const name = localStorage.getItem("name")
        if (name === null) {
            return "Anonymous"
        } else {
            return name;
        }
    }

}


export const lstore = new LStore();
