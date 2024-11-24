import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons'; // Chỉ giữ lại icon cần dùng
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef(null);

  // Toggle search input visibility
  const toggleSearch = () => {
    setShowSearch(true);
    setTimeout(() => {
      if (searchInputRef.current) searchInputRef.current.focus();
    }, 100); // Focus input sau khi render
  };

  // Hide search input when clicking outside
  const handleClickOutside = (e) => {
    if (searchInputRef.current && !searchInputRef.current.contains(e.target)) {
      setShowSearch(false);
    }
  };

  useEffect(() => {
    if (showSearch) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showSearch]);

  return (
    <header className="header">
      <div className="header-left">
        <a
          href="https://www.facebook.com/your_facebook_page"
          target="_blank"
          rel="noopener noreferrer"
          className="facebook-link"
        >
          <FontAwesomeIcon icon={faFacebook} className="facebook-icon" />
          Tên Facebook
        </a>
      </div>
      <div className="header-right">
        <FontAwesomeIcon icon={faPhone} className="header-icon" />
        <span className="header-text">Hotline: 0900 000 00</span>
        <div className="search-container">
          {showSearch && (
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="search-input"
              ref={searchInputRef}
            />
          )}
          <span
            className="search-icon"
            onClick={(e) => {
              e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
              toggleSearch();
            }}
          >
            🔍
          </span>
        </div>
      </div>
    </header>
  );
};


export default Header;
