import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../helpers/UserContext";
import "../styles/EditProfile.css";

function EditProfile() {
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    assigned: "",
    skills: "",
    courses: "",
    projects: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(form); // guarda los datos en contexto
    navigate("/profile");
  };

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h4 className="mb-4 fw-bold">Basic Information</h4>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            className="form-control mb-3 custom-input"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="role"
            type="text"
            className="form-control mb-3 custom-input"
            placeholder="Rol"
            value={form.role}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            className="form-control mb-3 custom-input"
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
          />

          <h5 className="fw-bold mt-4">Assigned</h5>
          <input
            name="assigned"
            type="text"
            className="form-control mb-3 custom-input"
            placeholder="Ej. 85%"
            value={form.assigned}
            onChange={handleChange}
          />

          <h5 className="fw-bold mt-3">Skills</h5>
          <textarea
            name="skills"
            className="form-control mb-3 auto-expand custom-input"
            rows="1"
            placeholder="Escribe tus habilidades"
            value={form.skills}
            onChange={handleChange}
          />

          <h5 className="fw-bold mt-3">Completed Courses</h5>
          <textarea
            name="courses"
            className="form-control mb-3 auto-expand custom-input"
            rows="4"
            placeholder="Lista de cursos completados"
            value={form.courses}
            onChange={handleChange}
          />

          <h5 className="fw-bold mt-3">Projects</h5>
          <textarea
            name="projects"
            className="form-control mb-3 auto-expand custom-input"
            rows="1"
            placeholder="Escribe tus proyectos"
            value={form.projects}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-dark w-100 mt-4">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
