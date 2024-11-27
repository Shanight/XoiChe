// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import './../Home/HomePage'; // Thêm CSS cho slide
import hinh1 from '../../img/IMG_2753.jpeg';
import './ChiTiet.css';
import NoiDung from './NoiDung';
const ChiTiet = () => {


    useEffect(() => {
        // Chuyển slide tự động mỗi 3 giây

    });

    return (
        <div className="home-page">
            <NoiDung/>
            
        </div>
    );
};

export default ChiTiet;
