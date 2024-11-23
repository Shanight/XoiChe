// src/components/MainLayout.js
import React from 'react';
import Header from '../components/header';
import Menu from '../components/menu';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom'; // Tạo điểm để render nội dung các trang con

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Menu />
      <main>
        <Outlet /> {/* Nội dung của trang sẽ hiển thị ở đây */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
