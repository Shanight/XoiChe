import React, { useState, useEffect } from "react";
import { firestore } from "../../lib/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import "./Order.css";
import { Link } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(firestore, "orders");
        const querySnapshot = await getDocs(ordersCollection);
        const ordersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      const orderDoc = doc(firestore, "orders", id);
      await deleteDoc(orderDoc);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng:", error);
    }
  };

  const calculateTotal = () => {
    return orders.reduce((total, item) => {
      const price =
        typeof item.itemPrice === "string"
          ? parseInt(item.itemPrice.replace(/[^\d]/g, ""), 10) // Loại bỏ ký tự không phải số và chuyển sang số
          : item.itemPrice; // Nếu là số rồi thì sử dụng luôn
      return total + (isNaN(price) ? 0 : price); // Đảm bảo không cộng giá trị NaN
    }, 0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-container">
      <div className="order-header">
        <h2>Đơn Hàng Của Bạn</h2>
        <p>Danh sách các sản phẩm đã đặt và tổng giá trị đơn hàng</p>
      </div>
      <Link to="/admin">
        <button className="btn btn-danger">Quay lại</button>
      </Link>
      <table>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>Tên Sản Phẩm</th>
            <th>Địa Chỉ</th>
            <th>Số Điện Thoại</th>
            <th>Giá</th>
            <th>Thời Gian</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.itemName}</td>
              <td>{order.address}</td>
              <td>{order.phone}</td>
              <td>
                {typeof order.itemPrice === "string"
                  ? parseInt(order.itemPrice.replace(/[^\d]/g, ""), 10).toLocaleString("vi-VN") + " VND"
                  : `${order.itemPrice.toLocaleString("vi-VN")} VND`}
              </td>
              <td>
                {order.timestamp
                  ? new Date(order.timestamp).toLocaleString()
                  : "Không có thông tin"}
              </td>
              <td>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="delete-btn"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total">
  <h3>Tổng Giá Trị: {calculateTotal().toLocaleString("vi-VN")} VND</h3>
</div>
    </div>
  );
};

export default Order;
