import React from 'react';
import { Order } from '../types/order';
import './OrderDetailsModal.css';

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose, onEdit, onDelete }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Order Details</h2>
        <p><strong>ID:</strong> {order.id}</p>
        <p><strong>Customer Name:</strong> {order.customer_name}</p>
        <p><strong>Item:</strong> {order.item}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Creation Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
        <div className="modal-actions">
          <button className="edit-button" onClick={onEdit}>Edit</button>
          <button className="delete-button" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
