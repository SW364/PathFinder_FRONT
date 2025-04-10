import React from "react";
import CourseCard from "../components/CourseCard";
import { Container, Row, Col } from "react-bootstrap";


const Courses = () => {
  const courses = [
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

  return (
    <Container className="mt-6">
  <h2 className="mb-5">Your courses 📚</h2>
  <Row className="g-4">
    {courses.map((course, idx) => (
      <Col lg={3} md={6} sm={12} key={idx}>
        <CourseCard {...course} />
      </Col>
    ))}
  </Row>
</Container>

  );
};

export default Courses;
