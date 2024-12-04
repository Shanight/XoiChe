import React, { useState } from "react";
import { firestore } from "../../lib/firebase"; // Import Firestore từ cấu hình Firebase
import { collection, addDoc } from "firebase/firestore";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"; // Thư viện Google Maps
import "./OrderForm.css";

const OrderForm = ({ item, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "", // Địa chỉ sẽ được cập nhật từ bản đồ
    phone: "",
  });
  const [showMap, setShowMap] = useState(false); // State hiển thị bản đồ
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 10.8231, // Vĩ độ mặc định (TP. HCM)
    lng: 106.6297, // Kinh độ mặc định (TP. HCM)
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAmQullpEMPTl0p5P5gf_T8rOAh3pIwSaA", // Thay bằng API Key của bạn
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const ordersCollection = collection(firestore, "orders"); // Thư mục Firestore là "orders"
      await addDoc(ordersCollection, {
        ...formData,
        itemName: item.name,
        itemPrice: item.price,
        location: selectedLocation, // Lưu vị trí đã chọn
        timestamp: new Date().toISOString(), // Ghi thời gian đặt hàng
      });

      alert("Đặt hàng thành công!");
      onClose(); // Đóng form sau khi thành công
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });

    // Cập nhật địa chỉ dạng tọa độ vào input
    setFormData((prev) => ({
      ...prev,
      address: `${lat.toFixed(5)}, ${lng.toFixed(5)}`, // Hiển thị tọa độ trên input địa chỉ
    }));
  };

  const handleShowMap = () => setShowMap(true);
  const handleCloseMap = () => setShowMap(false);

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
            <div className="address-input">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="order-form-input"
              />
              <button type="button" className="map-icon" onClick={handleShowMap}>
                🗺️
              </button>
            </div>
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
          <button className="button1" type="submit">
            Xác nhận đặt hàng
          </button>
        </form>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      {showMap && isLoaded && (
        <div className="map-container">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={selectedLocation}
            zoom={15}
            onClick={handleMapClick}
          >
            <Marker position={selectedLocation} />
          </GoogleMap>
          <button className="close-map-btn" onClick={handleCloseMap}>
            Đóng Bản Đồ
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
