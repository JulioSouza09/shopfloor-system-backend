import express from 'express'

const router = express.Router();

let data = [];

router.get('/orders', (req, res) => {
    res.json(data);
});

router.post('/orders', (req, res) => {
    console.log(req.body)
    data.push(req.body);
    res.status(201).json({ status: "success" });
});

export default router;