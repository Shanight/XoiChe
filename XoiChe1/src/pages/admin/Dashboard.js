import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, firestore } from "../../lib/firebase";
import { getDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";  // Import hàm signOut
import './Dashboard.css'; // Import CSS của Dashboard

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(""); // State để lưu tên người dùng
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate("/login");
          return;
        }

        // Lấy thông tin người dùng từ Firestore
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (!userDoc.exists() || userDoc.data().role !== 1) {
          alert("Bạn không có quyền truy cập trang này!");
          navigate("/login");
        } else {
          setUserName(userDoc.data().name); // Lưu tên người dùng vào state
        }
      } catch (error) {
        console.error(error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkRole();
  }, [navigate]);

  // Hàm đăng xuất
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Đăng xuất người dùng
      navigate("/login"); // Chuyển hướng về trang đăng nhập
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  if (loading) {
    return <p>Đang tải...</p>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <p>Quản lý và theo dõi các sản phẩm và đơn hàng</p>
      </div>

      <div className="dashboard-right">
        <div className="user-info">
          <p>Chào, {userName}</p>
          <button onClick={handleSignOut}>Đăng xuất</button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <Link to="/products">
            <div className="card-icon">📦</div>
            <h3>Sản phẩm</h3>
            <p>Quản lý danh sách và cập nhật sản phẩm</p>
          </Link>
        </div>

        <div className="dashboard-card">
          <Link to="/update">
            <div className="card-icon">🛠️</div>
            <h3>Update</h3>
            <p>Cập nhật thông tin sản phẩm</p>
          </Link>
        </div>

        <div className="dashboard-card">
          <Link to="/orders">
            <div className="card-icon">📑</div>
            <h3>Đơn hàng</h3>
            <p>Theo dõi và xử lý đơn hàng</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
