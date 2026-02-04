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

    getKPI() {
        const machines = this.getAll();
        const totalMachines = machines.length;
        const runningMachines = machines.filter(m => m.status === 'RUNNING').length;
        const stoppedMachines = machines.filter(m => m.status === 'STOPPED').length;
        const maintenanceMachines = machines.filter(m => m.status === 'MAINTENANCE').length;
        const kpi = {
            totalMachines: totalMachines,
            runningMachines: runningMachines,
            stoppedMachines: stoppedMachines,
            maintenanceMachines: maintenanceMachines
        };
        return (kpi);
    }
};

export default new MachinesService();