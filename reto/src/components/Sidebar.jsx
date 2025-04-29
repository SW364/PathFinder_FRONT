import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const level = localStorage.getItem("userLevel"); // "Usuario", "TFS", or "Manager"

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userLevel");
    navigate("/");
  };

  const isAdvancedUser = level === "TFS" || level === "Manager";

  return (
    <div
      className="text-white d-flex flex-column justify-content-between pt-4 pb-4"
      style={{
        width: "250px",
        minHeight: "100vh",
        backgroundColor: "#000000",
        flexShrink: 0,
      }}
    >
      <div>
        <img
          src="/img/Logo1.png"
          alt="accenture logo"
          className="mb-4"
          style={{
            height: "35px",
            objectFit: "contain",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />

        <ul className="nav flex-column w-100">
          <li className="sidebar-link-container">
            <Link to="/home" className="sidebar-link fs-5 fw-light">
              Home
            </Link>
          </li>

          {isAdvancedUser && (
            <li className="sidebar-link-container">
              <Link to="/dashboard" className="sidebar-link fs-5 fw-light">
                Dashboard
              </Link>
            </li>
          )}

          <li className="sidebar-link-container">
            <Link to="/career" className="sidebar-link fs-5 fw-light">
              Career path
            </Link>
          </li>

          <li className="sidebar-link-container">
            <Link to="/courses" className="sidebar-link fs-5 fw-light">
              Courses
            </Link>
          </li>

          {isAdvancedUser && (
            <li className="sidebar-link-container">
              <Link to="/assignation" className="sidebar-link fs-5 fw-light">
                Assignation
              </Link>
            </li>
          )}

          <li className="sidebar-link-container">
            <Link to="/profile" className="sidebar-link fs-5 fw-light">
              Profile
            </Link>
          </li>
        </ul>
      </div>

      <button
        className="btn btn-outline-light mt-4 w-75 mx-auto fw-bold"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
}

export default Sidebar;
