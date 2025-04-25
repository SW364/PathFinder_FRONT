import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
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

  const renderPopover = (
    <Popover id={`popover-${title}`} className="custom-popover">
      <Popover.Body className="popover-body">
        <p>{description}</p>
      </Popover.Body>
    </Popover>
  );

  const handleButtonClick = () => {
    if (showCertificate) {
      setIsOpen(true);
    } else {
      window.location.href = actionLink;
    }
  };

  return (
    <>
      <OverlayTrigger
        placement="top"
        delay={{ show: 150, hide: 300 }}
        overlay={renderPopover}
        trigger={["hover", "focus"]}
      >
        <Card className="shadow-sm p-2 bg-light rounded h-100 position-relative course-card-hover">
          <Card.Img
            variant="top"
            src={`/Img/${image}`}
            alt={title}
            style={{ height: "180px", objectFit: "cover" }}
          />
          <Card.Body className="d-flex flex-column justify-content-between text-center">
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
      </OverlayTrigger>

      {/* Esto activa directamente el visor de pantalla completa */}
      <PhotoProvider>
        {isOpen && (
          <PhotoView
            src="Img/certification.jpeg"
            onClose={() => setIsOpen(false)}
          >
            {/* invisible trigger element */}
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
