// components/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import './Dashboard.css'; // Import CSS của Dashboard

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <p>Quản lý và theo dõi các sản phẩm và đơn hàng của bạn</p>
      </div>
      
      <div className="dashboard-nav">
        <Link to="/products">Sản phẩm</Link>
        <Link to="/orders">Đơn hàng</Link>
      </div>
    </div>
  );
};

export default Dashboard;
