import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../helpers/UserContext";
import "../styles/Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const [apiData, setApiData] = useState(null);
  const [allAbilities, setAllAbilities] = useState([]); // Todas las habilidades del sistema
  const [userAbilities, setUserAbilities] = useState([]); // Habilidades del usuario

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDgsImlhdCI6MTc0MzcyMzI3NSwiZXhwIjoxNzQzODA5Njc1fQ.sFtDWOr6r7_Ec7AgjKuVBRM4V6AwiSrwwrQn0A5IeHM";

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
          setUserAbilities(data.abilities || []); // Guarda los IDs de las habilidades
        }
      } catch (error) {
        console.error("❌ Error al conectar con /employees:", error);
      }
    };

    const fetchAllAbilities = async () => {
      try {
        const res = await fetch(
          "https://pathfinder-back-hnoj.onrender.com/abilities"
        );
        const abilities = await res.json();
        console.log("🧠 Todas las habilidades:", abilities);
        setAllAbilities(abilities);
      } catch (error) {
        console.error("❌ Error al cargar habilidades:", error);
      }
    };

    fetchProfileData();
    fetchAllAbilities();
  }, []);

  const handleEdit = () => {
    navigate("/profile/edit");
  };

  // Buscar los nombres de las habilidades del usuario
  const userAbilityIds = userAbilities.map((a) =>
    typeof a === "object" ? a.id : a
  ); // cubre ambos casos
  const abilityNames =
    allAbilities
      .filter((a) => userAbilityIds.includes(a.id))
      .map((a) => a.name)
      .join(", ") || "Agrega tus habilidades";

  const name = apiData?.name || userData.name || "Tu nombre aquí";
  const role = apiData?.rolename || userData.role || "Tu rol";
  const email = apiData?.email || userData.email || "Tu correo";
  const assigned = apiData?.percentage || userData.assigned || "--";
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
          <p>{abilityNames}</p>
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
