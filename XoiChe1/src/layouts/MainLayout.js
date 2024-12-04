import React from "react";
import Header from "../components/header";
import Menu from "../components/menu";
import Footer from "../components/Footer";
import ContactButtons from "../layouts/ContactButtons";
import ChatWidget from "../layouts/ChatWidget"; // Import ChatWidget
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div style={{ position: "relative" }}>
      <Header />
      <Menu />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ContactButtons />
      <ChatWidget /> {/* Thêm ChatWidget */}
    </div>
  );
};

export default MainLayout;
