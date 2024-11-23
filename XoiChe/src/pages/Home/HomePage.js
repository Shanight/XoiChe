// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import './HomePage.css'; // Thêm CSS cho slide
import hinh1 from '../../img/IMG_2753.jpeg';
import hinh2 from '../../img/gai-7.jpg';
import Services from './Services';
import OrderItems from './OrderItems';
const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    hinh1,
    hinh2,
    hinh1
  ];

  useEffect(() => {
    // Chuyển slide tự động mỗi 3 giây
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length); // Cập nhật slide tiếp theo
    }, 3000);

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="home-page">
      <div className="slider">
        <img src={slides[currentSlide]} alt={`Slide ${currentSlide + 1}`} className="slide-image" />
      </div>
      <h1 className='services-title' style={{textAlign:"center",padding:"20px"}}>Đặt Mâm Xôi</h1>
      <OrderItems />
      <Services/>
    </div>
  );
};

export default HomePage;
