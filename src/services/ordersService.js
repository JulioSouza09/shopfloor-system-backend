import db from '../database/db.js'

class OrdersService {
    getAll() {
        const select = db.prepare('SELECT * FROM orders');
        return select.all();
    };

    createNew(reqBody) {
        const insert = db.prepare(`
            INSERT INTO orders (product, quantity, status) VALUES (?, ?, ?) RETURNING *
        `);
        return insert.get(reqBody.product, reqBody.quantity, reqBody.status);
    };

    get(id) {
        const select = db.prepare('SELECT * FROM orders WHERE id = ?');
        return select.get(id);
    };

    update(id, reqBody) {
        const update = db.prepare(`
            UPDATE orders
            SET product = ?, quantity = ?, status = ?
            WHERE id = ?
            RETURNING *
        `)
        return update.get(reqBody.product, reqBody.quantity, reqBody.status, id);
    }

    remove(id) {
        const remove = db.prepare('DELETE FROM orders WHERE id = ?');
        const result = remove.run(id);
        return result.changes > 0;
    }
};

export default new OrdersService();