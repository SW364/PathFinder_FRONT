import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom"; // 👈 Importamos Link

function Sidebar() {
  return (
    <div
      className="text-white d-flex flex-column align-items-center pt-4"
      style={{ width: "250px", height: "100vh", backgroundColor: "#000000" }}
    >
      {/* ✅ Logo sigue centrado */}
      <img
        src="/Img/Logo1.png"
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

      {/* ✅ Menú alineado a la izquierda pero con padding izquierdo */}
      <ul
        className="nav flex-column"
        style={{ paddingLeft: "55px", width: "100%" }}
      >
        <li className="nav-item mb-2">
          <Link to="/" className="nav-link text-white fs-5 fw-light ps-0">
            Dashboard
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/career" className="nav-link text-white fs-5 fw-light ps-0">
            Career path
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            to="/courses"
            className="nav-link text-white fs-5 fw-light ps-0"
          >
            Courses
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            to="/assignation"
            className="nav-link text-white fs-5 fw-light ps-0"
          >
            Assignation
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/profile"
            className="nav-link text-white fs-5 fw-light ps-0"
          >
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
