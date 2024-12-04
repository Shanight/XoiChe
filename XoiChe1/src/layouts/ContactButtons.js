import React from "react";
import "./ContactButtons.css";

const ContactButtons = () => {
  const phone = "0123456789"; // Số điện thoại
  const zaloLink = `https://zalo.me/${phone}`;
  const messengerLink = "https://m.me/username"; // Thay bằng tên người dùng Messenger

  return (
    <div className="contact-buttons">
      <a href={zaloLink} target="_blank" rel="noopener noreferrer" className="contact-btn zalo-btn">
        <span role="img" aria-label="Zalo">
          🟦
        </span>{" "}
        Zalo
      </a>
      <a href={`tel:${phone}`} className="contact-btn phone-btn">
        <span role="img" aria-label="Phone">
          📞
        </span>{" "}
        Gọi
      </a>
      <a href={messengerLink} target="_blank" rel="noopener noreferrer" className="contact-btn messenger-btn">
        <span role="img" aria-label="Messenger">
          💬
        </span>{" "}
        Messenger
      </a>
    </div>
  );
};

export default ContactButtons;
