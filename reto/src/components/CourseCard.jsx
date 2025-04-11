import React from "react";
import { Card, Button } from "react-bootstrap";
import "../styles/Coursecard.css";

const CourseCard = ({ 
  image, 
  title, 
  completed, 
  actionText, 
  actionLink, 
  showCertificate 
}) => {
  return (
    <Card className="course-card mb-4 h-100 d-flex flex-column">
      <Card.Img variant="top" src={image} className="course-card-img" />
      <Card.Body className="d-flex flex-column flex-grow-1">
        <Card.Title className="course-card-title">{title}</Card.Title>
        <Card.Text className="course-card-progress">Completed: {completed}%</Card.Text>
        <div className="mt-auto">
          {completed < 100 ? (
            <Button className="continue-button" href={actionLink}>{actionText}</Button>
          ) : (
            showCertificate && <Button className="certificate-button" href={actionLink}>{actionText}</Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;