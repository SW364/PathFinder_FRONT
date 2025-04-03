import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../helpers/UserContext";
import "../styles/Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);

  const handleEdit = () => {
    navigate("/profile/edit");
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-user-info">
          <h2 className="profile-name">{userData.name || "Tu nombre aquí"}</h2>
          <p className="profile-role">{userData.role || "Tu rol"}</p>
          <div className="profile-info">
            <span>{userData.email || "Tu correo"}</span>
            <strong className="assigned">
              Assigned: {userData.assigned || "--"}
            </strong>
          </div>
        </div>

        <button className="edit-button" onClick={handleEdit}>
          Edit Profile
        </button>
      </div>

      <div className="profile-section-grid">
        <div className="profile-box">
          <h5>Skills</h5>
          <p>{userData.skills || "Agrega tus habilidades"}</p>
        </div>

        <div className="profile-box">
          <h5>Completed Courses</h5>
          <p>{userData.courses || "Agrega tus cursos completados"}</p>
        </div>
      </div>

      <div className="profile-box full-width">
        <h5>Projects</h5>
        <p>{userData.projects || "Describe tus proyectos aquí"}</p>
      </div>
    </div>
  );
}

export default Profile;
