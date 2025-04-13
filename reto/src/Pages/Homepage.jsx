import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../helpers/UserContext";
import Notifications from "../components/Notifications";
import Projects from "../components/Projects";

const HomePage = () => {
  const { userData } = useContext(UserContext);
  const [apiData, setApiData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://pathfinder-back-hnoj.onrender.com/employees/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token,
          },
        });
        const data = await response.json();
        if (!data.error) {
          setApiData(data);

          // Simulación: adapta a lo que te devuelva tu API
          setNotifications([
            "Tu certificación de SCRUM Master está por vencer",
            "Te han aceptado la asignación de Luis Méndez para tu proyecto Plataforma de Banca Digital - BBanco",
          ]);
          setProjects([
            { name: "Plataforma de Banca Digital", platform: "BBanco", percentage: 80 },
            { name: "Portal de Gestión de Créditos", platform: "FinanZapp", percentage: 50 },
            { name: "Plataforma de Inversiones", platform: "InvestEasy", percentage: 90 },
          ]);
        }
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    };

    fetchData();
  }, [token]);

  const name = apiData?.name || userData.name || "Usuario";

  return (
    <Container className="mt-4">
      <h3 className="mb-4">
        Bienvenido, {name} <span role="img" aria-label="saludo">👋</span>
      </h3>
      <Row>
        <Col md={6}>
          <Notifications notifications={notifications} />
        </Col>
        <Col md={6}>
          <Projects projects={projects} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
