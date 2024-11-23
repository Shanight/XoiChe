import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3 className="footer-title">Giới thiệu</h3>
        <p className="footer-text">
          Chúng tôi chuyên cung cấp dịch vụ và sản phẩm chất lượng cao, luôn đặt
          khách hàng lên hàng đầu.
        </p>
      </div>
      <div className="footer-section">
        <h3 className="footer-title">Địa chỉ</h3>
        <p className="footer-text">123 Đường ABC, Quận X, Thành phố Y</p>
      </div>
      <div className="footer-section">
        <h3 className="footer-title">Google Map</h3>
        <iframe
          className="footer-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.000000000!2d144.9630579504959!3d-37.8136277432936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x000000000000000%3A0x000000000000!2sExample!5e0!3m2!1sen!2sau!4v0000000000000"
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
        ></iframe>
      </div>
    </footer>
  );
};

export default Footer;
