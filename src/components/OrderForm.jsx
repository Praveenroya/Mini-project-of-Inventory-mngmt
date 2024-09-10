import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderForm = ({ order, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    status: 'Pending'
  });

  useEffect(() => {
    if (order) {
      setFormData(order);
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (order) {
      // Update existing order
      axios.put(`/api/orders/${order.id}`, formData)
        .then(response => onSave(response.data))
        .catch(error => console.error('Error updating order', error));
    } else {
      // Create new order
      axios.post('/api/orders', formData)
        .then(response => onSave(response.data))
        .catch(error => console.error('Error creating order', error));
    }
  };

  return (
    <div>
      <h2>{order ? 'Edit Order' : 'Create Order'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input type="text" name="productName" value={formData.productName} onChange={handleChange} required />
        </label>
        <label>
          Quantity:
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </label>
        <label>
          Status:
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default OrderForm;