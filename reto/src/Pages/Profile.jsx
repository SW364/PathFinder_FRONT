import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../helpers/UserContext";
import "../styles/Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const [apiData, setApiData] = useState(null);
  const [userAbilities, setUserAbilities] = useState([]);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          "https://pathfinder-back-hnoj.onrender.com/employees/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        );
        const data = await response.json();
        console.log("📦 Datos del backend:", data);

        if (!data.error) {
          setApiData(data);
          setUserAbilities(data.abilitiesOfEmployee || []);
        }
      } catch (error) {
        console.error("❌ Error al conectar con /employees:", error);
      }
    };

    fetchProfileData();
  }, [token]);

  const handleEdit = () => {
    navigate("/profile/edit");
  };

  const name = apiData?.name || userData.name || "Tu nombre aquí";
  const role = apiData?.rolename || userData.role || "Tu rol";
  const email = apiData?.email || userData.email || "Tu correo";
  const assigned = apiData?.percentage || userData.assigned || "--";
  const courses = userData.courses || "No courses completed yet";
  const projects = userData.projects || "No projects added yet";

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-user-info">
          <h2 className="profile-name">{name}</h2>
          <p className="profile-role">
            <span className="role-badge">{role}</span>
          </p>
          <div className="profile-info">
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <span>{email}</span>
            </div>
            <div className="info-item assigned">
              <i className="fas fa-tasks"></i>
              <strong>Assigned: {assigned}%</strong>
            </div>
          </div>
        </div>

        <button className="edit-button" onClick={handleEdit}>
          <i className="fas fa-edit"></i> Edit Profile
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <div className="skills-box profile-info-box">
            <div className="box-header">
              <i className="fas fa-code"></i>
              <h5>Skills</h5>
            </div>
            <div className="box-content skills-list">
              {userAbilities.length > 0 ? (
                userAbilities.map((skill, index) => (
                  <div key={index} className="skill-tag">
                    <i className="fas fa-check"></i> {skill.name}
                  </div>
                ))
              ) : (
                <span>No skills added yet</span>
              )}
            </div>
          </div>

          <div className="courses-box profile-info-box">
            <div className="box-header">
              <i className="fas fa-graduation-cap"></i>
              <h5>Completed Courses</h5>
            </div>
            <div className="box-content">
              {courses.split(", ").map((course, index) => (
                <span key={index} className="course-item">
                  <i className="fas fa-check-circle"></i> {course}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="projects-box profile-info-box full-width">
          <div className="box-header">
            <i className="fas fa-project-diagram"></i>
            <h5>Projects</h5>
          </div>
          <div className="box-content">
            <p>{projects}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
