import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

const CourseCard = ({
  image,
  title,
  completed,
  actionText,
  actionLink,
  showCertificate,
  onDelete,
}) => {
  return (
    <Card className="shadow-sm p-2 bg-light rounded h-100 position-relative">
      {/* 3-dot Dropdown for deletable courses */}
      {onDelete && (
        <Dropdown className="position-absolute top-0 end-0 m-2">
          <Dropdown.Toggle
            variant="light"
            size="sm"
            style={{
              border: "none",
              background: "transparent",
              fontSize: "1.3rem",
              color: "#333",
            }}
          >
            ⋮
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={onDelete} className="text-danger">
              Remove
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}

      <Card.Img
        variant="top"
        src={image}
        alt={title}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{title}</Card.Title>
        <Card.Text>Completed: {completed}%</Card.Text>
        <div className="d-grid gap-2">
          <Button
            variant="dark"
            href={actionLink}
            disabled={completed === 0 && showCertificate}
          >
            {actionText}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
