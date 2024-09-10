import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch products from an API or local storage
    axios.get('/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products', error));
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/products/${id}`)
      .then(() => setProducts(products.filter(product => product.id !== id)))
      .catch(error => console.error('Error deleting product', error));
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  return (
    <div>
      <h1>Product List</h1>
      <button onClick={handleAdd}>Add Product</button>
      {showForm && (
        <ProductForm
          product={selectedProduct}
          onClose={() => setShowForm(false)}
          onSave={(updatedProduct) => {
            if (selectedProduct) {
              setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
            } else {
              setProducts([...products, updatedProduct]);
            }
            setShowForm(false);
          }}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Description</th>
            <th>Price</th>
            <th>Current Stock Level</th>
            <th>Reorder Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.currentStockLevel}</td>
              <td>{product.reorderLevel}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;