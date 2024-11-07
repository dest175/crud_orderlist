import express from 'express';
import { createOrderController, getOrdersController, getOrderByIdController, updateOrderController, deleteOrderController } from '../controllers/orderController';

const router = express.Router();

router.post('/', createOrderController);
router.get('/', getOrdersController);
router.get('/:id', getOrderByIdController);
router.put('/:id', updateOrderController);
router.delete('/:id', deleteOrderController);

export default router;
