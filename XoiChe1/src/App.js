// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout'; // Import MainLayout
import HomePage from './pages/Home/HomePage'; // Trang Home
import ChiTiet from './pages/ChiTiet/ChiTiet'; // Trang chi tiết
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Update from './pages/admin/Update';
import Login from './pages/admin/Login';
import SignUp from './pages/admin/SighUp';
const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Định tuyến các trang con */}
          <Route index element={<HomePage />} /> {/* Trang chủ */}
          <Route path="chitiet/:id" element={<ChiTiet />} /> {/* Chi tiết có ID */}

        </Route>
        <Route path="/Admin" index element={<Dashboard/>} /> {/* Chi tiết */}
        <Route path="/Products" index element={<Products/>} /> {/* Chi tiết */}
        <Route path="/Update" index element={<Update/>} /> {/* Chi tiết */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Orders" index element={<Orders/>} /> {/* Chi tiết */}

      </Routes>
    </Router>
  );
};

export default App;
