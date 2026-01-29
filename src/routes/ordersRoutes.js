import express from 'express'

import { getALlOrders, addNewOrder } from '../controllers/ordersController';

const router = express.Router();

router.get('/orders', getALlOrders);

router.post('/orders', addNewOrder);

export default router;