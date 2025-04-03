import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/profile/edit");
  };

  return (
    <div className="container mt-4">
      <h2>Mi Perfil</h2>
      <div className="mb-3">
        <strong>Nombre:</strong> Juan Pérez
      </div>
      <div className="mb-3">
        <strong>Email:</strong> juan.perez@example.com
      </div>
      <button className="btn btn-primary" onClick={handleEdit}>
        Editar Perfil
      </button>
    </div>
  );
}

export default Profile;
