import React, { useState } from 'react';
import './NewOrderModal.css';

interface NewOrderModalProps {
  onClose: () => void;
  onSave: (newOrder: { customer_name: string; item: string; quantity: number; status: 'pending' | 'completed' | 'cancelled' }) => void;
}

const NewOrderModal: React.FC<NewOrderModalProps> = ({ onClose, onSave }) => {
  const [customerName, setCustomerName] = useState('');
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<'pending' | 'completed' | 'cancelled'>('pending');

  const handleSave = () => {
    onSave({ customer_name: customerName, item, quantity, status });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>New Order</h2>
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

export default NewOrderModal;
