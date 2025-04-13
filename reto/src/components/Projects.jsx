import React from "react";
import PropTypes from "prop-types";
import { Card, ProgressBar, Badge, ListGroup } from "react-bootstrap";
import { Laptop } from "react-bootstrap-icons";

const Projects = ({ projects }) => (
  <Card className="borde">
    <Card.Header className="bg-white border-bottom d-flex align-items-center">
      <h5 className="mb-0 fw-bold text-dark">Projects</h5>
      <Badge pill bg="dark" text="white" className="ms-auto">
        {projects.length} active
      </Badge>
    </Card.Header>
    <Card.Body className="pt-0">
      <ListGroup variant="flush">
        {projects.map((project, i) => (
          <ListGroup.Item key={i} className="border-bottom py-3 px-0">
            <div className="d-flex justify-content-between mb-2">
              <h6 className="mb-0 fw-semibold text-dark">{project.name}</h6>
              <small className="text-muted">
                <Laptop className="me-1" size={12} />
                {project.platform}
              </small>
            </div>
            <div className="d-flex align-items-center">
              <ProgressBar 
                now={project.percentage} 
                className="flex-grow-1 me-3 bg-light" 
                variant="dark"
                style={{ 
                  height: '6px',
                  backgroundColor: '#f8f9fa' // Light gray background
                }}
              />
              <small className="fw-bold" style={{ 
                minWidth: '40px', 
                color: '#6f42c1' // Purple color for percentage
              }}>
                {project.percentage}%
              </small>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {projects.length === 0 && (
        <div className="text-center py-4 text-muted">
          No active projects
        </div>
      )}
    </Card.Body>
  </Card>
);

Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      platform: PropTypes.string.isRequired,
      percentage: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Projects;