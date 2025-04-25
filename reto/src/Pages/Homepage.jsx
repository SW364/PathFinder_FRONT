import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header"; // Asegúrate de que la ruta sea correcta
import CertificationCard from "../components/CertificationCard";
import "../styles/HomePage.css";

const HomePage = () => {
  const [notifications, setNotifications] = useState([]);
  const [certs, setCerts] = useState([]);
  const name = localStorage.getItem("userName") || "Usuario";

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch("https://pathfinder-back-hnoj.onrender.com/employees/certifications", {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.json();
      const certsData = data.certificationsOfEmployee.map((cert) => ({
        id: cert.id,
        name: cert.name,
        description: cert.description,
        expiration: cert.Certinfo.expiration,
      }));

      setCerts(certsData);

      const now = new Date();
      const expiringSoon = certsData.filter((cert) => {
        const expirationDate = new Date(cert.expiration);
        const diffDays = (expirationDate - now) / (1000 * 60 * 60 * 24);
        return diffDays <= 7;
      });

      if (expiringSoon.length > 0) {
        const newNotifs = expiringSoon.map(
          (c) => `The certification "${c.name}" Expiring soon`
        );
        setNotifications(newNotifs);
      }
    } catch (error) {
      console.error("Error obteniendo certificaciones:", error);
      setNotifications(["Hubo un error al cargar las certificaciones"]);
    }
  };

  return (
    <>
      {/* Reemplazamos la sección hero con nuestro Header parametrizable */}
      <Header 
        title={`Welcome, ${name}`}
        subtitle="Check your notifications and active certifications"
        notifications={notifications}
      />

      <Container className="homepage-container fade-in">
        {/* Eliminamos la columna de notificaciones ya que ahora están en el modal */}
        <Row className="mt-4">
          <h4 className="mb-3">Certifications</h4>
          {certs.map((cert) => (
            <Col key={cert.id} md={6} className="mb-3">
              <CertificationCard
                name={cert.name}
                description={cert.description}
                expiration={cert.expiration}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;