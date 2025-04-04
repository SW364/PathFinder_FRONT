import React from "react";

function Courses() {
  return (
    <div className="courses-container">
      <h2 className="mb-4">Courses</h2>
      <p>
        Here you'll be able to explore, assign, and track all available courses.
      </p>

      <div
        className="course-card"
        style={{
          backgroundColor: "#f1f1f1",
          padding: "1rem",
          borderRadius: "12px",
          marginTop: "1rem",
        }}
      >
        <h5>React Fundamentals</h5>
        <p>
          Learn the basics of React including components, props, and state
          management.
        </p>
      </div>
    </div>
  );
}

export default Courses;
