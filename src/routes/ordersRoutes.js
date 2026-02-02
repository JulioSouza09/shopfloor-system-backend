import express from 'express'
import { getValidator } from '../middlewares/globalMiddlewares.js';
import orderSchema from '../validators/orderValidator.js'
import * as ordersController from '../controllers/ordersController.js';

const router = express.Router();

router.get('/', ordersController.getAllOrders);
router.post('/', getValidator(orderSchema), ordersController.addNewOrder);
router.get('/:id', ordersController.getOrder);
router.put('/:id', getValidator(orderSchema), ordersController.updateOrder);
router.delete('/:id', ordersController.removeOrder);

export default router;