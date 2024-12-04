import React, { useState } from 'react';
import Logo from '../img/462548496_1109205531211514_7837345094638361018_n.png';
import './Menu.css';
import { Link } from "react-router-dom";

const Menu = () => {
  const menuItemsLeft = ['TRANG CHỦ', 'VỀ CHÚNG TÔI', 'KHAI TRƯƠNG'];
  const menuItemsRight = ['TIN TỨC', 'LIÊN HỆ'];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="menu">
      <div className="menu-container">
        {/* Menu trái */}
        <ul className="menu-left">
          {menuItemsLeft.map((item, index) => (
            <li key={index} className="menu-item">
              <Link to="/" className="menu-link">{item}</Link>
            </li>
          ))}
        </ul>

        {/* Logo */}
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
        </div>

        {/* Menu phải */}
        <ul className="menu-right">
          <li className="menu-item dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
            <span className="menu-link">MÂM CÚNG TRỌN GÓI</span>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/" className="dropdown-link">Mâm cúng khai trương</Link></li>
                <li><Link to="/" className="dropdown-link">Mâm cúng động thổ</Link></li>
                <li><Link to="/" className="dropdown-link">Mâm cúng thôi nôi</Link></li>
                <li><Link to="/" className="dropdown-link">Mâm cúng Đầy tháng</Link></li>
                <li><Link to="/" className="dropdown-link">Mâm cúng nhà mới</Link></li>
                <li><Link to="/" className="dropdown-link">Mâm cúng thân tài</Link></li>
                <li><Link to="/" className="dropdown-link">Mâm cúng cúng rầm</Link></li>
                <li><Link to="/" className="dropdown-link">Mâm cúng cúng tên</Link></li>
              </ul>
            )}
          </li>
          {menuItemsRight.map((item, index) => (
            <li key={index} className="menu-item">
              <a href="#" className="menu-link">{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
