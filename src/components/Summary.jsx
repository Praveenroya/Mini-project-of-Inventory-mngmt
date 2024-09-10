import React from 'react';

const Summary = ({ summary }) => {
  return (
    <div>
      <h2>Summary</h2>
      <p>Total Products: {summary.totalProducts}</p>
      <p>Total Stock Value: ${summary.totalStockValue.toFixed(2)}</p>
      <p>Products Below Reorder Level: {summary.productsBelowReorderLevel}</p>
    </div>
  );
};

export default Summary;