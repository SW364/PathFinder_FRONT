import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CareerPath.css";

export default function CareerPath() {
  const [form, setForm] = useState({
    objective: "",
    skills: "",
    values: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    navigate("/recommendations"); // ← Redirect here
  };

  return (
    <div
      className="career-path-container"
      style={{ padding: "2rem", marginLeft: "40px" }}
    >
      <div className="goal-sidecard">
        <h3>💡 Tips to Write Better Goals</h3>
        <ul>
          <li>Be specific and realistic about your objectives.</li>
          <li>Think about your long-term growth.</li>
          <li>Let your values guide your choices.</li>
        </ul>
      </div>

      <h1 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
        What is your next goal?
      </h1>
      <p style={{ maxWidth: "850px", marginBottom: "2rem" }}>
        Let us help you build a career you love. By considering your profile and
        aspirations, we will recommend personalized courses that set you on the
        path to achieving your dreams.
      </p>

      <form onSubmit={handleSubmit} style={{ maxWidth: "700px" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            What is your most important professional objective right now?
          </label>
          <textarea
            name="objective"
            value={form.objective}
            onChange={handleChange}
            placeholder="This helps clarify the exact direction you want to pursue."
            rows="4"
            style={{
              width: "100%",
              borderRadius: "10px",
              padding: "1rem",
              border: "1px solid #ccc",
              resize: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            What skills or knowledge do you feel you most need to develop to
            achieve your goal?
          </label>
          <textarea
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="This helps identify the priority areas for training and ensures you focus on courses or programs that truly add value."
            rows="4"
            style={{
              width: "100%",
              borderRadius: "10px",
              padding: "1rem",
              border: "1px solid #ccc",
              resize: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            How do your personal values and lifestyle influence the career you
            want to build?
          </label>
          <textarea
            name="values"
            value={form.values}
            onChange={handleChange}
            placeholder="This question digs deeper into the alignment between your professional aspirations and personal motivations..."
            rows="4"
            style={{
              width: "100%",
              borderRadius: "10px",
              padding: "1rem",
              border: "1px solid #ccc",
              resize: "none",
            }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-dark"
          style={{
            width: "160px",
            fontWeight: "500",
            letterSpacing: "0.3px",
            whiteSpace: "nowrap",
          }}
        >
          Find Courses
        </button>
      </form>
    </div>
  );
}
