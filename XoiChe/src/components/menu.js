import React from 'react';
import Logo from '../img/462548496_1109205531211514_7837345094638361018_n.png';
import './Menu.css'; // Import file CSS

const Menu = () => {
  const menuItemsLeft = ['TRANG CHỦ', 'VỀ CHÚNG TÔI', 'KHAI TRƯƠNG'];
  const menuItemsRight = ['MÂM CÚNG TRỌN GÓI', 'TIN TỨC', 'LIÊN HỆ'];

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
