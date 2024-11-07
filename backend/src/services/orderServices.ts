import { v4 as uuidv4 } from 'uuid';
import { Order, orders } from '../models/orderModel';

export const createOrder = (customer_name: string, item: string, quantity: number, status: 'pending' | 'completed' | 'cancelled'): Order => {
  const newOrder: Order = {
    id: uuidv4(),
    customer_name,
    item,
    quantity,
    status,
    created_at: new Date(),
  };
  orders.unshift(newOrder);
  return newOrder;
};

export const getOrders = (page: number = 1, pageSize: number = 20, status?: string) => {
    let filteredOrders = orders;
    
    // Filtrar por estado si se proporciona
    if (status) {
      filteredOrders = orders.filter(order => order.status === status);
    }
    
    // Calcular el total de páginas
    const totalOrders = filteredOrders.length;
    const totalPages = Math.ceil(totalOrders / pageSize);
    
    // Determinar el rango de órdenes para la página actual
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedOrders = filteredOrders.slice(start, end);
  
    return {
      page,
      pageSize,
      totalOrders,
      totalPages,
      data: paginatedOrders,
    };
  };

export const getOrderById = (id: string): Order | undefined => {
  return orders.find(order => order.id === id);
};

export const updateOrder = (id: string, updatedData: Partial<Order>): Order | null => {
  const order = orders.find(order => order.id === id);
  if (order) {
    Object.assign(order, updatedData);
    return order;
  }
  return null;
};

export const deleteOrder = (id: string): boolean => {
  const index = orders.findIndex(order => order.id === id);
  if (index !== -1) {
    orders.splice(index, 1);
    return true;
  }
  return false;
};
