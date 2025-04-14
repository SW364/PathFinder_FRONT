import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Courses.css";

const staticCourses = [
  {
    image: "Img/Agile.jpg",
    title: "Leadership and Management of Agile Teams",
    completed: 75,
    actionText: "Continue",
    actionLink: "#",
    showCertificate: false,
  },
  {
    image: "Img/data.jpg",
    title: "Data Analysis for Decision Making",
    completed: 100,
    actionText: "View Certificate",
    actionLink: "#",
    showCertificate: true,
  },
  {
    image: "Img/AI.jpg",
    title: "Fundamentals of Artificial Intelligence",
    completed: 100,
    actionText: "View Certificate",
    actionLink: "#",
    showCertificate: true,
  },
  {
    image: "Img/Cyber.jpg",
    title: "Cybersecurity and Data Protection",
    completed: 100,
    actionText: "View Certificate",
    actionLink: "#",
    showCertificate: true,
  },
  {
    image: "Img/AI.jpg",
    title: "Data Science",
    completed: 100,
    actionText: "View Certificate",
    actionLink: "#",
    showCertificate: true,
  },
];

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const added = JSON.parse(localStorage.getItem("addedCourses")) || [];
    const merged = [...staticCourses];

    added.forEach((newCourse) => {
      const exists = merged.find((c) => c.title === newCourse.title);
      if (!exists) merged.push(newCourse);
    });

    setCourses(merged);
  }, []);

  const handleDelete = (title) => {
    const updated = courses.filter((course) => course.title !== title);
    setCourses(updated);

    const updatedAddedCourses = JSON.parse(
      localStorage.getItem("addedCourses") || "[]"
    ).filter((course) => course.title !== title);
    localStorage.setItem("addedCourses", JSON.stringify(updatedAddedCourses));
  };

  const inProgressCourses = courses.filter((course) => course.completed < 100);
  const completedCourses = courses.filter((course) => course.completed === 100);

  return (
    <div className="courses-page">
      <section className="hero-section">
        <div className="container hero-text">
          <h1>Your learning journey continues here</h1>
          <p>Pick up where you left off and continue growing your skills!</p>
        </div>
      </section>

      <Container>
        {inProgressCourses.length > 0 && (
          <>
            <h2 className="section-header">Courses in Progress</h2>
            <Row className="g-4">
              {inProgressCourses.map((course, idx) => (
                <Col lg={3} md={6} sm={12} key={idx}>
                  <CourseCard
                    {...course}
                    onDelete={
                      !staticCourses.some((c) => c.title === course.title)
                        ? () => handleDelete(course.title)
                        : null
                    }
                  />
                </Col>
              ))}
            </Row>
          </>
        )}

        {completedCourses.length > 0 && (
          <>
            <h2 className="section-header">Completed Courses</h2>
            <Row className="g-4">
              {completedCourses.map((course, idx) => (
                <Col lg={3} md={6} sm={12} key={idx}>
                  <CourseCard
                    {...course}
                    onDelete={
                      !staticCourses.some((c) => c.title === course.title)
                        ? () => handleDelete(course.title)
                        : null
                    }
                  />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default Courses;
