import React, { useState } from "react";
import { auth, firestore } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi"; // Import React Icons
import "./SignUp.css";
import { useNavigate,Link} from "react-router-dom";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, "users", userCredential.user.uid), {
        name: name,
        email: email,
        phone: phone,
        role: 2, // Mặc định là khách hàng
      });

      setMessage("Đăng ký thành công!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="title">Đăng Ký</h2>
      <form onSubmit={handleSignUp} className="sign-up-form">
        <div className="input-group">
          <FiUser className="input-icon" />
          <input
            type="text"
            placeholder="Tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <FiMail className="input-icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <FiPhone className="input-icon" />
          <input
            type="tel"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <FiLock className="input-icon" />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <FiLock className="input-icon" />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <p className="redirect-message">
         Có tài khoản? <Link to="/Login">Đăng nhập</Link>
      </p>
        <button type="submit" className="btn-submit">Đăng Ký</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SignUp;
