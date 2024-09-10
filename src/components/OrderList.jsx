import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderForm from './OrderForm';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Fetch orders from an API or local storage
    axios.get('/api/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders', error));
  }, []);

  const handleCreate = () => {
    setSelectedOrder(null);
    setShowForm(true);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/orders/${id}`)
      .then(() => setOrders(orders.filter(order => order.id !== id)))
      .catch(error => console.error('Error deleting order', error));
  };

  const handleStatusChange = (id, status) => {
    axios.patch(`/api/orders/${id}`, { status })
      .then(response => setOrders(orders.map(order => order.id === id ? response.data : order)))
      .catch(error => console.error('Error updating order status', error));
  };

  return (
    <div>
      <h1>Order List</h1>
      <button onClick={handleCreate}>Create Order</button>
      {showForm && (
        <OrderForm
          order={selectedOrder}
          onClose={() => setShowForm(false)}
          onSave={(updatedOrder) => {
            if (selectedOrder) {
              setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
            } else {
              setOrders([...orders, updatedOrder]);
            }
            setShowForm(false);
          }}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.productName}</td>
              <td>{order.quantity}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleEdit(order)}>Edit</button>
                <button onClick={() => handleDelete(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;