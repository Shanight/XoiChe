import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { firestore } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./OrderItems.css";
import OrderForm from "./OrderForm";

const OrderItems = () => {
  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(firestore, "products");
      const productDocs = await getDocs(productsCollection);
      const productData = productDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(productData);
    };

    fetchProducts();
  }, []);

  // Hàm định dạng số tiền với dấu chấm
  const formatPrice = (price) => {
    return price
      .toString()
      .replace(/\D/g, "") // Loại bỏ tất cả ký tự không phải số
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") // Thêm dấu chấm sau mỗi 3 chữ số
      .replace(/^\./, ""); // Loại bỏ dấu chấm đầu tiên nếu có
  };

  const handleOrderNow = (item) => {
    setSelectedItem(item);
  };

  const handleViewDetails = (id) => {
    navigate(`/chitiet/${id}`); // Điều hướng đến trang chi tiết
  };

  const groupedProducts = products.reduce((groups, product) => {
    const { category } = product;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    return groups;
  }, {});

  return (
    <div>
      {Object.keys(groupedProducts).map((category) => (
        <div key={category}>
          <h1 className="services-title">{category}</h1>
          <div className="order-container1" style={{ padding: "100px" }}>
            {groupedProducts[category].map((item, index) => (
              <div key={index} className="order-item">
                {/* Hiển thị ảnh chính */}
                <img
                  src={item.mainImageUrl || item.imageUrl} // Sử dụng mainImageUrl (nếu có)
                  alt={item.name}
                  className="item-img"
                />
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">
                  {formatPrice(item.price)} VND
                </p>
                <div className="order-buttons">
                  <button className="view-details" onClick={() => handleViewDetails(item.id)}>
                    Xem Chi Tiết
                  </button>
                  <button className="order-now" onClick={() => handleOrderNow(item)}>
                    Đặt Mâm Xôi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedItem && <OrderForm item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
};

export default OrderItems;
