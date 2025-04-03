import React from "react";

function EditProfile() {
  return (
    <div className="container mt-5">
      <h2>Editar Perfil</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            placeholder="Escribe tu nombre"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            placeholder="correo@ejemplo.com"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
