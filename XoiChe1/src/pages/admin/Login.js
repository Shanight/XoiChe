import React, { useState } from "react";
import { auth, firestore } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";  // Để lấy thông tin user từ Firestore
import { useNavigate, Link } from "react-router-dom"; // Import Link để điều hướng
import './Login.css'; // Import CSS của Login

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Đăng nhập người dùng
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Lấy thông tin người dùng từ Firestore
      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Kiểm tra vai trò (role) và điều hướng người dùng
        if (userData.role === 1) {
          // Điều hướng đến trang Dashboard (admin)
          navigate("/admin");
        } else if (userData.role === 2) {
          // Điều hướng đến trang chính (home)
          navigate("/");
        } else {
          setMessage("Không có quyền truy cập.");
        }
      } else {
        setMessage("Không tìm thấy thông tin người dùng.");
      }
      
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="title">Đăng Nhập</h2>
      <form className="sign-up-form" onSubmit={handleLogin}>
        <div className="input-group">
          <span className="input-icon">📧</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <span className="input-icon">🔒</span>
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit">Đăng Nhập</button>
      </form>
      {message && <p className="message">{message}</p>}

      {/* Thêm liên kết tới trang đăng ký */}
      <p className="redirect-message">
        Chưa có tài khoản? <Link to="/signup">Đăng ký ngay</Link>
      </p>
    </div>
  );
};

export default Login;
