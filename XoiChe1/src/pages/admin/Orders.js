import React, { useState, useEffect } from "react";
import { firestore } from "../../lib/firebase"; // Import Firestore từ cấu hình Firebase
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; // Thêm deleteDoc để xóa dữ liệu
import "./Order.css";
import { Link } from 'react-router-dom';

const Order = () => {
  const [orders, setOrders] = useState([]); // State để lưu dữ liệu đơn hàng
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái tải dữ liệu

  // Hàm lấy dữ liệu từ Firestore
  const fetchOrders = async () => {
    try {
      const ordersCollection = collection(firestore, "orders"); // Truy vấn đến collection "orders"
      const querySnapshot = await getDocs(ordersCollection); // Lấy dữ liệu từ collection
      const ordersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList); // Cập nhật state với dữ liệu lấy được
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
    } finally {
      setLoading(false); // Đánh dấu đã tải xong
    }
  };

  // Hàm xóa đơn hàng từ Firestore
  const handleDelete = async (id) => {
    try {
      const orderDoc = doc(firestore, "orders", id); // Tạo reference đến document cần xóa
      await deleteDoc(orderDoc); // Thực hiện xóa
      setOrders(orders.filter(order => order.id !== id)); // Cập nhật lại state để loại bỏ đơn hàng đã xóa
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng:", error);
    }
  };

  // Gọi hàm fetchOrders khi component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Hàm tính tổng giá trị đơn hàng (nếu cần)
  const calculateTotal = () => {
    return orders.reduce((total, item) => {
      // Kiểm tra nếu itemPrice là chuỗi hợp lệ
      const price = item.itemPrice ? parseInt(item.itemPrice.replace(" VND", "").replace(",", "")) : 0;
      return total + price;
    }, 0);
  };

  // Hiển thị loading nếu dữ liệu đang được tải
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-container">
      <div className="order-header">
        <h2>Đơn Hàng Của Bạn</h2>
        <p>Danh sách các sản phẩm đã đặt và tổng giá trị đơn hàng</p>
      </div>
      <Link to="/Dashboard"> <button className="btn btn-danger">Quay lại</button></Link>
      <table>
        <thead>
          <tr style={{textAlign:"center"}}>
            <th>Tên Sản Phẩm</th>
            <th>Địa Chỉ</th>
            <th>Số Điện Thoại</th>
            <th>Giá</th>
            <th>Thời Gian</th>
            <th>Hành Động</th> {/* Thêm cột hành động */}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.itemName}</td>
              <td>{order.address}</td>
              <td>{order.phone}</td>
              <td>{order.itemPrice}</td>
              <td>{new Date(order.timestamp).toLocaleString()}</td>
              <td>
                <button onClick={() => handleDelete(order.id)} className="delete-btn">
                  Xóa
                </button>
              </td> {/* Thêm nút xóa */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total">
        <h3>Tổng Giá Trị: {calculateTotal().toLocaleString()} VND</h3>
      </div>
    </div>
  );
};

export default Order;
