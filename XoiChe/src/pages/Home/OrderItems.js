import React, { useState } from "react";
import "./OrderItems.css";
import OrderForm from "./OrderForm"; // Import component mới tạo
import hinh1 from "../../img/xoi-ga-ngu-vuon-hong-6434.jpg";

const OrderItems = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const xoiItems = [
    { name: "Mâm Xôi Tết", price: "500,000 VND", img: hinh1 },
    { name: "Mâm Xôi Tươi", price: "300,000 VND", img: hinh1 },
    { name: "Mâm Xôi Truyền Thống", price: "450,000 VND", img: hinh1 },
    { name: "Mâm Xôi Cao Cấp", price: "700,000 VND", img: hinh1 },
    { name: "Mâm Xôi Chay", price: "600,000 VND", img: hinh1 },
    { name: "Mâm Xôi Đặc Biệt", price: "800,000 VND", img: hinh1 },
  ];

  const cungsItems = [
    { name: "Mâm Cúng Đám Hỏi", price: "500,000 VND", img: hinh1 },
    { name: "Mâm Cúng Lễ Vật", price: "400,000 VND", img: hinh1 },
    { name: "Mâm Cúng Tân Gia", price: "450,000 VND", img: hinh1 },
    { name: "Mâm Cúng Lễ Hội", price: "650,000 VND", img: hinh1 },
    { name: "Mâm Cúng Thôi Nôi", price: "700,000 VND", img: hinh1 },
    { name: "Mâm Cúng Giỗ", price: "600,000 VND", img: hinh1 },
  ];

  const handleOrderNow = (item) => {
    setSelectedItem(item);
  };

  const closeForm = () => {
    setSelectedItem(null);
  };

  const renderItems = (items) => {
    return items.map((item, index) => (
      <div key={index} className="order-item">
        <img src={item.img} alt={item.name} className="item-img" />
        <h3 className="item-name">{item.name}</h3>
        <p className="item-price">{item.price}</p>
        <div className="order-buttons">
          <button className="view-details">Xem Chi Tiết</button>
          <button className="order-now" onClick={() => handleOrderNow(item)}>
            Đặt Mâm Xôi
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <h1 className="services-title" style={{ textAlign: "center", padding: "20px" }}>Mâm Xôi</h1>
      <div className="order-container container">{renderItems(xoiItems)}</div>

      <h1 className="services-title" style={{ textAlign: "center", padding: "20px" }}>Mâm Cúng</h1>
      <div className="order-container container">{renderItems(cungsItems)}</div>

      {/* Hiển thị form nếu có sản phẩm được chọn */}
      {selectedItem && <OrderForm item={selectedItem} onClose={closeForm} />}
    </div>
  );
};

export default OrderItems;
