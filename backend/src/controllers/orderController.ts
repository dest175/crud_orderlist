import { Request, Response } from 'express';
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from '../services/orderServices';

export const createOrderController = async (req: Request, res: Response): Promise<void> => {
  const { customer_name, item, quantity, status } = req.body;
  const newOrder = createOrder(customer_name, item, quantity, status);
  res.status(201).json(newOrder);
};

export const getOrdersController = async (req: Request, res: Response): Promise<void> => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 5
    ;
    const status = req.query.status as string | undefined;
  
    const ordersResponse = getOrders(page, pageSize, status);
    res.json(ordersResponse);
  };

export const getOrderByIdController = async (req: Request, res: Response): Promise<void> => {
  const order = getOrderById(req.params.id);
  if (!order) {
    res.status(404).json({ error: 'Order not found' });
    return;
  }
  res.json(order);
};

export const updateOrderController = async (req: Request, res: Response): Promise<void> => {
  const order = updateOrder(req.params.id, req.body);
  if (!order) {
    res.status(404).json({ error: 'Order not found' });
    return;
  }
  res.json(order);
};

export const deleteOrderController = async (req: Request, res: Response): Promise<void> => {
  const success = deleteOrder(req.params.id);
  if (!success) {
    res.status(404).json({ error: 'Order not found' });
    return;
  }
  res.status(204).send();
};
