import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupplierForm = ({ supplier, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    productsSupplied: ''
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name,
        contactInfo: supplier.contactInfo,
        productsSupplied: supplier.productsSupplied.join(', ')
      });
    }
  }, [supplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productsArray = formData.productsSupplied.split(',').map(product => product.trim());
    const newSupplier = { ...formData, productsSupplied: productsArray };

    if (supplier) {
      // Update existing supplier
      axios.put(`/api/suppliers/${supplier.id}`, newSupplier)
        .then(response => onSave(response.data))
        .catch(error => console.error('Error updating supplier', error));
    } else {
      // Create new supplier
      axios.post('/api/suppliers', newSupplier)
        .then(response => onSave(response.data))
        .catch(error => console.error('Error creating supplier', error));
    }
  };

  return (
    <div>
      <h2>{supplier ? 'Edit Supplier' : 'Add Supplier'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Supplier Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contact Information:
          <input
            type="text"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Products Supplied (comma-separated):
          <input
            type="text"
            name="productsSupplied"
            value={formData.productsSupplied}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default SupplierForm;