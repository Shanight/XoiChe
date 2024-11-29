// components/Products.jsx
import React from "react";
import { Link } from "react-router-dom";

const Products = () => {
  return (
    <div>
      <h2>Products Management</h2>
      <p>Manage your products here.</p>
      <Link to="/">Back to Dashboard</Link>
    </div>
  );
};

export default Products;
