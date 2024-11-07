import React, { useState } from 'react';
import { Order } from '../types/order';
import './EditOrderModal.css';

interface EditOrderModalProps {
  order: Order;
  onClose: () => void;
  onSave: (updatedOrder: Order) => void;
}

const EditOrderModal: React.FC<EditOrderModalProps> = ({ order, onClose, onSave }) => {
  const [customerName, setCustomerName] = useState(order.customer_name);
  const [item, setItem] = useState(order.item);
  const [quantity, setQuantity] = useState(order.quantity);
  const [status, setStatus] = useState(order.status);

  const handleSave = () => {
    const updatedOrder = { ...order, customer_name: customerName, item, quantity, status };
    onSave(updatedOrder);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Edit Order</h2>
        <form>
          <div className="form-group">
            <label>Customer Name</label>
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Item</label>
            <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as 'pending' | 'completed' | 'cancelled')}>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </form>
        <div className="modal-actions">
          <button className="save-button" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditOrderModal;
