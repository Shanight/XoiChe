import React, { useState } from "react";
import { firestore } from "../../lib/firebase"; // Import Firestore từ cấu hình Firebase
import { collection, addDoc } from "firebase/firestore";
import "./OrderForm.css";

const OrderForm = ({ item, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gửi dữ liệu lên Firestore
      const ordersCollection = collection(firestore, "orders"); // Thư mục Firestore là "orders"
      await addDoc(ordersCollection, {
        ...formData,
        itemName: item.name,
        itemPrice: item.price,
        timestamp: new Date().toISOString(), // Ghi thời gian đặt hàng
      });

      alert("Đặt hàng thành công!");
      onClose(); // Đóng form sau khi thành công
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  if (!item) return null;

  return (
    <div className="order-form-overlay">
      <div className="order-form-container">
        <h2 className="order-form-title">Đặt Mâm Xôi</h2>
        <div className="order-form-details">
          <p><strong>Món:</strong> {item.name}</p>
          <p><strong>Giá:</strong> {item.price}</p>
        </div>
        <form className="order-form" onSubmit={handleSubmit}>
          <label className="order-form-label">
            Tên của bạn:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="order-form-input"
            />
          </label>
          <label className="order-form-label">
            Địa chỉ:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="order-form-input"
            />
          </label>
          <label className="order-form-label">
            Số điện thoại:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="order-form-input"
            />
          </label>
          <button className="order-form-submit" type="submit">
            Xác nhận đặt hàng
          </button>
        </form>
        <button className="order-form-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default OrderForm;
