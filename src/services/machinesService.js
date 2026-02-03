import db from "../database/db.js";

class MachinesService {
    getAll() {
        const select = db.prepare('SELECT * FROM machines');
        return select.all();
    }

    createNew(reqBody) {
        const insert = db.prepare(`
            INSERT INTO machines (name, status) VALUES (?, ?)
            RETURNING *
        `);
        return insert.get(reqBody.name, reqBody.status);

    }

    get(id) {
        const select = db.prepare(`
            SELECT * FROM machines
            WHERE id = ?
        `);
        return select.get(id);
    }

    updateStatus(id, reqBody) {
        const update = db.prepare(`
            UPDATE machines
            SET status = ?
            WHERE id = ?
            RETURNING *
        `);
        return update.get(reqBody.status, id);
    }

    remove(id) {
        const remove = db.prepare(`
            DELETE FROM machines
            WHERE id = ?
        `);
        const result = remove.run(id);
        return result.changes > 0;
    }
};

export default new MachinesService();