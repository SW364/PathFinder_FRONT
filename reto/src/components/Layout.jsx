// src/components/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div
        className="flex-grow-1"
        style={{
          minHeight: "100vh",
          overflowY: "auto",
          backgroundColor: "#ffffff",
          padding: "2rem",
          marginLeft: "250px",
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
