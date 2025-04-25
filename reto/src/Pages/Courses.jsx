import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { Container, Row, Col, Modal, Button} from "react-bootstrap";
import Header from "../components/Header";
import "../styles/Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await fetch(
          "https://pathfinder-back-hnoj.onrender.com/employees/courses",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        );

        const data = await response.json();
        console.log("API Response:", data);

        if (data.error) {
          setError(data.error);
        } else {
          setCourses(data.coursesOfEmployee || []);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Something went wrong");
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = (title) => {
    const updated = courses.filter((course) => course.name !== title);
    setCourses(updated);
  };

  const inProgressCourses = courses.filter((course) => course.Courseinfo.status < 100);
  const completedCourses = courses.filter((course) => course.Courseinfo.status === 100);

  return (
    <div className="courses-page">
      <Header 
        title="Your learning journey continues here"
        subtitle="Pick up where you left off and continue growing your skills!"
        notifications={[]}
      />

      <Container>
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Modal para el certificado dummy */}
        <Modal 
          show={showCertificateModal} 
          onHide={() => setShowCertificateModal(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Course Certificate</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <img 
              src="/img/certification.jpeg" // Asegúrate de tener esta imagen en public/img/
              alt="Course Certificate" 
              className="img-fluid"
              style={{ maxHeight: "70vh", border: "1px solid #eee" }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={() => setShowCertificateModal(false)}
            >
              Close
            </Button>
            <Button 
              variant="primary"
              onClick={() => {
                // Opción para descargar el certificado
                const link = document.createElement('a');
                link.href = '/img/certificate.jpg';
                link.download = 'certificate.jpg';
                link.click();
              }}
            >
              Download Certificate
            </Button>
          </Modal.Footer>
        </Modal>

        {inProgressCourses.length > 0 && (
          <>
            <h2 className="section-header mt-4">Courses in Progress</h2>
            <Row className="g-4">
              {inProgressCourses.map((course, idx) => (
                <Col lg={3} md={6} sm={12} key={idx}>
                  <CourseCard
                    image={course.imgUrl}
                    title={course.name}
                    description={course.description}
                    completed={course.Courseinfo.status}
                    actionText="Continue"
                    actionLink="#"
                    showCertificate={false}
                    onDelete={() => handleDelete(course.name)}
                  />
                </Col>
              ))}
            </Row>
          </>
        )}

        {completedCourses.length > 0 && (
          <>
            <h2 className="section-header mt-4">Completed Courses</h2>
            <Row className="g-4">
              {completedCourses.map((course, idx) => (
                <Col lg={3} md={6} sm={12} key={idx}>
                  <CourseCard
                    image={course.imgUrl}
                    title={course.name}
                    description={course.description}
                    completed={course.Courseinfo.status}
                    actionText="View Certificate"
                    onActionClick={() => setShowCertificateModal(true)}
                    showCertificate={true}
                    onDelete={() => handleDelete(course.name)}
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