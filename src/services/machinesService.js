class MachinesService {
    #data = [];
    #idCount = 1;

    getAll() {
        return this.#data;
    };

    createNew(reqBody) {
        const newMachine ={
            id: this.#idCount++,
            ...reqBody
        }
        this.#data.push(newMachine);
        return newMachine;
    };

    get(id) {
        return this.#data.find(machine => machine.id === id);
    };

    updateStatus(id, reqBody) {
        const pos = this.#data.findIndex(machine => machine.id === id);
        if (pos === -1)
            return null;
        this.#data[pos].status = reqBody.status;
        return this.#data[pos];
    }

    remove(id) {
        const pos = this.#data.findIndex(machine => machine.id === id);
        console.log(pos);
        if (pos === -1)
            return false;
        this.#data.splice(pos, 1);
        return true;
    }
};

export default new MachinesService();