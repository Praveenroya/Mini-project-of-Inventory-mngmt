import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SupplierForm from './SupplierForm';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    // Fetch suppliers from an API or local storage
    axios.get('/api/suppliers')
      .then(response => setSuppliers(response.data))
      .catch(error => console.error('Error fetching suppliers', error));
  }, []);

  const handleCreate = () => {
    setSelectedSupplier(null);
    setShowForm(true);
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/suppliers/${id}`)
      .then(() => setSuppliers(suppliers.filter(supplier => supplier.id !== id)))
      .catch(error => console.error('Error deleting supplier', error));
  };

  return (
    <div>
      <h1>Supplier List</h1>
      <button onClick={handleCreate}>Add Supplier</button>
      {showForm && (
        <SupplierForm
          supplier={selectedSupplier}
          onClose={() => setShowForm(false)}
          onSave={(updatedSupplier) => {
            if (selectedSupplier) {
              setSuppliers(suppliers.map(s => s.id === updatedSupplier.id ? updatedSupplier : s));
            } else {
              setSuppliers([...suppliers, updatedSupplier]);
            }
            setShowForm(false);
          }}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Supplier Name</th>
            <th>Contact Information</th>
            <th>Products Supplied</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map(supplier => (
            <tr key={supplier.id}>
              <td>{supplier.name}</td>
              <td>{supplier.contactInfo}</td>
              <td>{supplier.productsSupplied.join(', ')}</td>
              <td>
                <button onClick={() => handleEdit(supplier)}>Edit</button>
                <button onClick={() => handleDelete(supplier.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierList;