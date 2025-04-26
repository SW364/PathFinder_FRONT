import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import "../styles/Coursecard.css";

const CourseCard = ({
  image,
  title,
  description,
  completed,
  actionText,
  actionLink,
  showCertificate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    if (showCertificate) {
      setIsOpen(true);
    } else {
      window.location.href = actionLink;
    }
  };

  return (
    <>
      <Card className="course-card-wrapper">
        <div className="card-hover-effect">
          <div className="card-img-slide">
            <Card.Img
              src={`/Img/${image}`}
              alt={title}
              className="custom-img"
            />
          </div>
          <div className="card-description-slide">
            <p>{description}</p>
          </div>
        </div>

        <Card.Body className="card-static-info">
          <Card.Title>{title}</Card.Title>
          <Card.Text>Completed: {completed}%</Card.Text>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              style={{
                backgroundColor: "var(--accent-color)",
                borderColor: "var(--accent-color)",
              }}
              onClick={handleButtonClick}
            >
              {actionText}
            </Button>
          </div>
        </Card.Body>
      </Card>

      <PhotoProvider>
        {isOpen && (
          <PhotoView
            src="Img/certification.jpeg"
            onClose={() => setIsOpen(false)}
          >
            <img
              src="Img/certification.jpeg"
              alt="Certificate"
              style={{ display: "none" }}
            />
          </PhotoView>
        )}
      </PhotoProvider>
    </>
  );
};

export default CourseCard;
