import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    price: '',
    currentStockLevel: '',
    reorderLevel: ''
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product) {
      // Update existing product
      axios.put(`/api/products/${product.id}`, formData)
        .then(response => onSave(response.data))
        .catch(error => console.error('Error updating product', error));
    } else {
      // Add new product
      axios.post('/api/products', formData)
        .then(response => onSave(response.data))
        .catch(error => console.error('Error adding product', error));
    }
  };

  return (
    <div>
      <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          SKU:
          <input type="text" name="sku" value={formData.sku} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </label>
        <label>
          Current Stock Level:
          <input type="number" name="currentStockLevel" value={formData.currentStockLevel} onChange={handleChange} required />
        </label>
        <label>
          Reorder Level:
          <input type="number" name="reorderLevel" value={formData.reorderLevel} onChange={handleChange} required />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default ProductForm;
