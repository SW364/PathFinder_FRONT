import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CourseCard from "../components/CourseCard";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";

export const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await fetch("https://pathfinder-back-hnoj.onrender.com/courses/", {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch courses");
        }

        setCourses(data);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <Header title="Our Courses" subtitle="Explore our wide range of courses" />
      <Container className="mt-4">
        <h2 className="mb-4">Available Courses</h2>

        {loading && (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        )}

        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}

        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {courses.map((course) => (
            <Col key={course.id}>
              <CourseCard
                image={course.image || "placeholder.jpg"} // asegúrate de que cada curso tenga imagen o usa una por defecto
                title={course.name}
                description={course.description}
                completed={course.completed || 0}
                actionText="Add"
                showCertificate={false}
                onActionClick={() => alert(`Added course: ${course.name}`)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
