import React from 'react';
import { Order } from '../types/order';

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <div className="order-card">
      <h3>{order.customer_name}</h3>
      <p>Item: {order.item}</p>
      <p>Quantity: {order.quantity}</p>
      <p>Status: {order.status}</p>
      <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
    </div>
  );
};

export default OrderCard;
