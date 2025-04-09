import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../helpers/UserContext";
import "../styles/EditProfile.css";

function EditProfile() {
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("authToken"));

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
  const [showPassword, setShowPassword] = useState(false);

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
        console.error("Error loading profile data:", error);
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
        console.error("Error loading abilities:", err);
      }
    };

    fetchData();
    fetchAbilities();
  }, [token]);

  const hasChanges =
    form.name !== originalData.name ||
    form.email !== originalData.email ||
    JSON.stringify(selectedAbilities.sort()) !==
      JSON.stringify(originalAbilities.sort());

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
      confirmUpdate();
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

        alert("Profile successfully updated!");

        setUserData({
          ...form,
          abilities: selectedAbilities,
        });

        navigate("/profile");
      } else {
        alert(data.error || "Error updating profile.");
      }
    } catch (error) {
      console.error("PUT request error:", error);
      alert("Server connection error.");
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <div className="edit-profile-header">
          <h2>Edit Profile</h2>
          <p>Update your personal and professional information</p>
        </div>

        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-section">
            <h3 className="section-title">Basic Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <input
                  name="role"
                  type="text"
                  placeholder="Your job title"
                  value={form.role}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Assignment</label>
                <input
                  name="assigned"
                  type="text"
                  placeholder="e.g. 85%"
                  value={form.assigned}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Abilities</h3>
            <div className="form-group">
              <label>Select your abilities</label>
              <select
                multiple
                value={selectedAbilities}
                onChange={(e) => {
                  const selected = Array.from(
                    e.target.selectedOptions,
                    (option) => Number(option.value)
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
              <small>Hold Ctrl (Cmd on Mac) to select multiple</small>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Training</h3>
            <div className="form-group">
              <label>Completed Courses</label>
              <textarea
                name="courses"
                placeholder="List your courses separated by commas"
                value={form.courses}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Projects</h3>
            <div className="form-group">
              <label>Describe your projects</label>
              <textarea
                name="projects"
                placeholder="Detail the projects you’ve worked on"
                value={form.projects}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="save-button"
              disabled={!hasChanges}
            >
              Save Changes
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {showModal && (
        <div className="password-modal">
          <div className="modal-content">
            <h3>Confirm Changes </h3>
            <p>Please enter your password to confirm the changes</p>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your password "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <div className="modal-actions">
              <button onClick={confirmUpdate} className="confirm-button">
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
