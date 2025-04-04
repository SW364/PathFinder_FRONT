import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../helpers/UserContext";
import "../styles/Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          "https://pathfinder-back-hnoj.onrender.com/employees/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDgsImlhdCI6MTc0MzcyMzI3NSwiZXhwIjoxNzQzODA5Njc1fQ.sFtDWOr6r7_Ec7AgjKuVBRM4V6AwiSrwwrQn0A5IeHM",
            },
          }
        );

        const data = await response.json();

        if (!data.error) {
          setApiData(data);
        } else {
          console.warn("Error del backend:", data.error);
        }
      } catch (error) {
        console.error("Error al conectar con el backend:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleEdit = () => {
    navigate("/profile/edit");
  };

  const name = apiData?.name || userData.name || "Tu nombre aquí";
  const role = apiData?.rolename || userData.role || "Tu rol";
  const email = apiData?.email || userData.email || "Tu correo";
  const assigned = apiData?.percentage || userData.assigned || "--";
  const skills = userData.skills || "Agrega tus habilidades";
  const courses = userData.courses || "Agrega tus cursos completados";
  const projects = userData.projects || "Describe tus proyectos aquí";

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-user-info">
          <h2 className="profile-name">{name}</h2>
          <p className="profile-role">{role}</p>
          <div className="profile-info">
            <span>{email}</span>
            <strong className="assigned">Assigned: {assigned}%</strong>
          </div>
        </div>

        <button className="edit-button" onClick={handleEdit}>
          Edit Profile
        </button>
      </div>

      <div className="profile-section-grid">
        <div className="profile-box">
          <h5>Skills</h5>
          <p>{skills}</p>
        </div>

        <div className="profile-box">
          <h5>Completed Courses</h5>
          <p>{courses}</p>
        </div>
      </div>

      <div className="profile-box full-width">
        <h5>Projects</h5>
        <p>{projects}</p>
      </div>
    </div>
  );
}

export default Profile;
