import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../helpers/UserContext";
import "../styles/EditProfile.css";

function EditProfile() {
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    assigned: "",
    skills: "",
    courses: "",
    projects: "",
  });

  const [originalData, setOriginalData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");

  const [abilities, setAbilities] = useState([]);
  const [selectedAbilities, setSelectedAbilities] = useState([]);
  const [originalAbilities, setOriginalAbilities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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

        if (!data.error) {
          const loadedData = {
            name: data.name || "",
            role: data.rolename || "",
            email: data.email || "",
            assigned: data.percentage || "",
            skills: "",
            courses: "",
            projects: "",
          };
          setForm(loadedData);
          setOriginalData(loadedData);
          setSelectedAbilities(data.abilities || []);
          setOriginalAbilities(data.abilities || []);
        }
      } catch (error) {
        console.error("Error cargando datos del perfil:", error);
      }
    };

    const fetchAbilities = async () => {
      try {
        const res = await fetch(
          "https://pathfinder-back-hnoj.onrender.com/abilities"
        );
        const data = await res.json();
        setAbilities(data);
      } catch (err) {
        console.error("Error cargando habilidades:", err);
      }
    };

    fetchData();
    fetchAbilities();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const basicInfoChanged =
      form.name !== originalData.name || form.email !== originalData.email;
    const abilitiesChanged =
      JSON.stringify(selectedAbilities.sort()) !==
      JSON.stringify(originalAbilities.sort());

    if (basicInfoChanged || abilitiesChanged) {
      setShowModal(true);
    } else {
      confirmUpdate(); // Aunque nada cambió, por seguridad
    }
  };

  const confirmUpdate = async () => {
    try {
      const response = await fetch(
        "https://pathfinder-back-hnoj.onrender.com/employees/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            pass: password,
          }),
        }
      );

      const data = await response.json();

      if (data.msg === "Employee info updated") {
        // 🔄 Reemplazar las habilidades del usuario
        for (const abilityId of selectedAbilities) {
          await fetch(
            "https://pathfinder-back-hnoj.onrender.com/employees/abilities",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                token,
              },
              body: JSON.stringify({ abilityId }),
            }
          );
        }

        alert("¡Perfil actualizado exitosamente!");
        setUserData(form);
        navigate("/profile");
      } else {
        alert(data.error || "Error al actualizar el perfil.");
      }
    } catch (error) {
      console.error("Error en la solicitud PUT:", error);
      alert("Error de conexión con el servidor.");
    }
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
            className="form-control mb-3 custom-input readonly-input"
            placeholder="Rol"
            value={form.role}
            readOnly
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
            className="form-control mb-3 custom-input readonly-input"
            placeholder="Ej. 85%"
            value={form.assigned}
            readOnly
          />

          <h5 className="fw-bold mt-3">Skills</h5>
          <select
            multiple
            className="form-control mb-3 custom-input"
            value={selectedAbilities}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, (option) =>
                Number(option.value)
              );
              setSelectedAbilities(selected);
            }}
          >
            {abilities.map((ability) => (
              <option key={ability.id} value={ability.id}>
                {ability.name}
              </option>
            ))}
          </select>

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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h5 className="fw-bold mb-3">Confirmar contraseña</h5>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-dark w-100" onClick={confirmUpdate}>
              Confirmar
            </button>
            <button
              className="btn btn-secondary w-100 mt-2"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
