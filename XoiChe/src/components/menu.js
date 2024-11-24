import React, { useState } from 'react';
import Logo from '../img/462548496_1109205531211514_7837345094638361018_n.png';
import './Menu.css';

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
              <a href="#" className="menu-link">{item}</a>
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
                <li><a href="#" className="dropdown-link">Mâm cúng khai trương</a></li>
                <li><a href="#" className="dropdown-link">Mâm cúng động thổ</a></li>
                <li><a href="#" className="dropdown-link">Mâm cúng thôi nôi</a></li>
                <li><a href="#" className="dropdown-link">Mâm cúng Đầy tháng</a></li>
                <li><a href="#" className="dropdown-link">Mâm cúng nhà mới</a></li>
                <li><a href="#" className="dropdown-link">Mâm cúng thân tài</a></li>
                <li><a href="#" className="dropdown-link">Mâm cúng cúng rầm</a></li>
                <li><a href="#" className="dropdown-link">Mâm cúng cúng tên</a></li>
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
