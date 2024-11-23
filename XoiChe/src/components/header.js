import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons'; // Chỉ giữ lại icon cần dùng
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <a href="https://www.facebook.com/your_facebook_page" target="_blank" rel="noopener noreferrer" className="facebook-link">
          <FontAwesomeIcon icon={faFacebook} className="facebook-icon" />
          Tên Facebook
        </a>
      </div>
      <div className="header-right">
        <FontAwesomeIcon icon={faPhone} className="header-icon" />
        <span className="header-text">Hotline: 0900 000 00</span>
        <span className="search-icon">🔍</span>
      </div>
    </header>
  );
};

export default Header;
