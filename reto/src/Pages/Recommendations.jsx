import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../styles/Recommendations.css";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const recommendedCourses = [
  {
    title: "Cloud Computing Essentials",
    image: "/Img/cloud.jpg",
    completed: 0,
    actionText: "Start",
    actionLink: "#",
    showCertificate: false,
  },
  {
    title: "Design Thinking for Innovation",
    image: "/Img/design.jpg",
    completed: 0,
    actionText: "Start",
    actionLink: "#",
    showCertificate: false,
  },
  {
    title: "DevOps and Continuous Deployment",
    image: "/Img/DevOps.png",
    completed: 0,
    actionText: "Start",
    actionLink: "#",
    showCertificate: false,
  },
  {
    title: "AI Fundamentals",
    image: "/Img/AI.jpg",
    completed: 0,
    actionText: "Start",
    actionLink: "#",
    showCertificate: false,
  },
];

export default function Recommendations() {
  const [addedCourses, setAddedCourses] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("addedCourses")) || [];
    setAddedCourses(savedCourses);
  }, []);

  const handleAddCourse = () => {
    const selected = recommendedCourses[activeIndex];
    const updated = [...addedCourses, selected];
    localStorage.setItem("addedCourses", JSON.stringify(updated));
    setAddedCourses(updated);
  };

  const handleGoToCourses = () => {
    setShowModal(true);
  };

  const confirmGoToCourses = () => {
    setShowModal(false);
    navigate("/courses");
  };

  const isAdded = addedCourses.some(
    (course) => course.title === recommendedCourses[activeIndex].title
  );

  return (
    <div className="recommendation-page">
      <h2 className="recommendation-title">Recommended Courses</h2>
      <div className="underline" />

      <div className="carousel-wrapper">
        <Swiper
          modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
          effect="coverflow"
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation
          pagination={{ clickable: true }}
          loop={false}
          centeredSlides={true}
          slidesPerView={3}
          initialSlide={2}
          spaceBetween={0}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 2.5,
            slideShadows: false,
          }}
        >
          {recommendedCourses.map((course, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div
                  className={`course-card ${isActive ? "active" : ""}`}
                  style={{ backgroundImage: `url(${course.image})` }}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="add-button">
        <button onClick={handleAddCourse} disabled={isAdded}>
          {isAdded ? "Added" : "Add"}
        </button>

        <button
          className={addedCourses.length > 0 ? "enabled" : ""}
          onClick={handleGoToCourses}
        >
          Go to Courses
        </button>
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Navigation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to go to your <strong>Courses</strong> page?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button
            style={{ backgroundColor: "#9b4dff", border: "none" }}
            onClick={confirmGoToCourses}
          >
            Yes, Go
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
