// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout'; // Import MainLayout
import HomePage from './pages/Home/HomePage'; // Trang Home


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Định tuyến các trang con */}
          <Route index element={<HomePage />} /> {/* Trang chủ */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
