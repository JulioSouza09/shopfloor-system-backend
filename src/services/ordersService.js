class OrdersService {
    #data = [];
    #id_count = 1;

    getAll() {
        return this.#data;
    };

    createNew(reqBody) {
        const newOrder ={
            id: this.#id_count++,
            ...reqBody
        }
        this.#data.push(newOrder);
        return newOrder;
    };

    get(id) {
        return this.#data.find(order => order.id === id);
    };

    update(id, reqBody) {
        const pos = this.#data.findIndex(order => order.id === id);
        if (pos === -1)
            return null;
        this.#data[pos] = {
            id: this.#data[pos].id,
            ...reqBody
        };
        return this.#data[pos];
    }

    remove(id) {
        const pos = this.#data.findIndex(order => order.id === id);
        console.log(pos);
        if (pos === -1)
            return false;
        this.#data.splice(pos, 1);
        return true;
    }
};

export default new OrdersService();