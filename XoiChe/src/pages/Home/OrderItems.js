import React from 'react';
import './OrderItems.css'; // Import CSS cho phần này
import hinh1 from '../../img/xoi-ga-ngu-vuon-hong-6434.jpg'

const OrderItems = () => {
  const items = [
    { name: 'Mâm Xôi Tết', price: '500,000 VND', img: hinh1 },
    { name: 'Mâm Xôi Tươi', price: '300,000 VND', img: hinh1 },
    { name: 'Mâm Xôi Truyền Thống', price: '450,000 VND', img: hinh1 },
    { name: 'Mâm Xôi Cao Cấp', price: '700,000 VND', img: hinh1 },
    { name: 'Mâm Xôi Chay', price: '600,000 VND', img: hinh1 },
    { name: 'Mâm Xôi Đặc Biệt', price: '800,000 VND', img: hinh1 }, // Mục thêm vào
  ];

  return (
    <div className="order-container container">
      {items.map((item, index) => (
        <div key={index} className="order-item">
          <img src={item.img} alt={item.name} className="item-img" />
          <h3 className="item-name">{item.name}</h3>
          <p className="item-price">{item.price}</p>
          <div className="order-buttons">
            <button className="view-details">Xem Chi Tiết</button>
            <button className="order-now">Đặt Mâm Xôi</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderItems;
