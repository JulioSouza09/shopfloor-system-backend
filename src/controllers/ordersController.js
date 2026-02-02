import ordersService from "../services/ordersService.js";

export const getAllOrders = (req, res) => {
    res.json(ordersService.getAll());
};

export const addNewOrder = (req, res) => {
    const newOrder = ordersService.createNew(req.body);
    res.status(201).json(newOrder);
};

export const getOrder = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const order = ordersService.get(id);
    if (!order)
        return res.status(404).json({ error: "Order not found." })
    res.json(order);
};

export const updateOrder = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const order = ordersService.update(id, req.body);
    if (!order) {
        return res.status(404).json({ error: "Order not found" });
    };
    res.json(order);
};

export const removeOrder = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!ordersService.remove(id))
        return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted" });
};