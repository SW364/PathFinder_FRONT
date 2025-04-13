import React from "react";
import PropTypes from "prop-types";
import { Card, Badge, ListGroup } from "react-bootstrap";

const Notifications = ({ notifications }) => (
  <Card className="border">
    <Card.Header className="d-flex justify-content-between align-items-center bg-white border-bottom">
      <h5 className="mb-0 fw-bold">
        <i className="bi bi-bell-fill me-2 text-dark"></i>
        Notifications
      </h5>
      <Badge pill bg="dark" text="white">
        {notifications.length}
      </Badge>
    </Card.Header>
    <Card.Body className="p-0">
      {notifications.length > 0 ? (
        <ListGroup variant="flush">
          {notifications.map((msg, i) => (
            <ListGroup.Item 
              key={i}
              className="d-flex align-items-start py-3 border-bottom"
            >
              <span className="badge bg-dark me-2 mt-1">•</span>
              <span className="text-dark">{msg}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <div className="text-center py-4 text-secondary">
          No new notifications
        </div>
      )}
    </Card.Body>
  </Card>
);

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Notifications;