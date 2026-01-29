let data = [];

export const getALlOrders = (req, res) => {
    res.json(data);
};

export const addNewOrder = (req, res) => {
    console.log(req.body)
    data.push(req.body);
    res.status(201).json({ status: "success" });
};