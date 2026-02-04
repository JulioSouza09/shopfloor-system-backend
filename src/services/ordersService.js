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

    getKPI() {
        const orders = this.getAll();
        const totalOrders = orders.length;
        const completedOrders = orders.filter(o => o.status === 'COMPLETED').length;
        const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
        const inProgressOrders = orders.filter(o => o.status === 'IN_PROGRESS').length;
        const completionRate = totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0;
        const totalUnitsProduced = orders.reduce((sum, order) => {
            if (order.status === 'COMPLETED')
                return sum + order.quantity;
            return sum + 0;
        }, 0);
        const kpi = {
            totalOrders: totalOrders,
            completedOrders: completedOrders,
            pendingOrders: pendingOrders,
            inProgressOrders: inProgressOrders,
            completionRate: completionRate,
            totalUnitsProduced: totalUnitsProduced
        };
        return kpi;
    }
};

export default new OrdersService();