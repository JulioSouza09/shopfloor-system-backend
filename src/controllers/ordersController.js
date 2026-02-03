import ordersService from "../services/ordersService.js";

export const getAllOrders = (req, res) => {
    try {
        res.json(ordersService.getAll());
    } catch (error) {
        console.error('Failed to get all orders: ', error);
        res.status(500).json({ error: "Failed to get all orders" });
    }
};

export const addNewOrder = (req, res) => {
    try {
        const newOrder = ordersService.createNew(req.body);
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Failed to add new order: ', error);
        res.status(500).json({ error: "Failed to add new order" });
    }
};

export const getOrder = (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const order = ordersService.get(id);
        console.log(order);
        if (!order)
            return res.status(404).json({ error: "Order not found." })
        res.json(order);
    } catch (error) {
        console.error('Failed to get order: ', error);
        res.status(500).json({ error: "Failed to get order" });
    }
};

export const updateOrder = (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const order = ordersService.update(id, req.body);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        };
        res.json(order);
    } catch (error) {
        console.error('Failed to update order: ', error);
        res.status(500).json({ error: "Failed to update order" });
    }
};

export const removeOrder = (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (!ordersService.remove(id))
            return res.status(404).json({ error: "Order not found" });
        res.json({ message: "Order deleted" });
    } catch (error) {
        console.error('Failed to remove order: ', error);
        res.status(500).json({ error: "Failed to remove order" });
    }
};