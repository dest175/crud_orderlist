import axios from 'axios';
import { Order } from '../types/order';

const API_URL = 'http://localhost:3000/orders';

export const getAllOrders = async (page: number, pageSize: number, status?: string) => {
  const response = await axios.get<{ data: Order[]; page: number; totalPages: number; pageSize: number }>(API_URL, {
    params: { page, pageSize, status },
  });
  return response.data;
};

export const deleteOrder = async (orderId: string) => {
  await axios.delete(`${API_URL}/${orderId}`);
};

export const updateOrder = async (orderId: string, updatedOrder: Partial<Order>) => {
  const response = await axios.put<Order>(`${API_URL}/${orderId}`, updatedOrder);
  return response.data;
};

export const createOrder = async (newOrder: Omit<Order, 'id' | 'created_at'>) => {
  const response = await axios.post<Order>(API_URL, newOrder);
  return response.data;
};
