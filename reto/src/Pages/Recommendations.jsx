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

export default function Recommendations() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [addedCourses, setAddedCourses] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const aiCourses =
      JSON.parse(localStorage.getItem("recommendedCourses")) || [];
    setRecommendedCourses(aiCourses);

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
    (course) => course.title === recommendedCourses[activeIndex]?.title
  );

  if (recommendedCourses.length === 0) {
    return (
      <div className="recommendation-page">
        <h2 className="recommendation-title">No courses found</h2>
        <p>Please return to the previous step and try again.</p>
      </div>
    );
  }

  return (
    <div className="recommendation-page">
      <h2 className="recommendation-title">Recommended Courses</h2>
      <div className="underline" />

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
                  style={{
                    backgroundImage: `url("/img/${
                      decodeURIComponent(course.imgUrl) || "default.jpg"
                    }")`,
                  }}
                  onClick={() => {
                    setSelectedCourse(course);
                    setShowCourseModal(true);
                  }}
                />
              )}
            </SwiperSlide>

          ))}
        </Swiper>

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

      {/* Confirm Navigation Modal */}
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

      {/* Course Detail Modal */}
      <Modal
        show={showCourseModal}
        onHide={() => setShowCourseModal(false)}
        dialogClassName="course-detail-modal"
      >
        <Modal.Body>
          <div className="course-detail-layout">
            <div className="course-info">
              <h1 className="course-title">{selectedCourse?.name}</h1>
              <p className="course-description-text">
                {selectedCourse?.description}
              </p>
              <div className="course-extra">
                <p>
                  <strong>Created by:</strong>{" "}
                  {selectedCourse?.instructor || "Unknown"}
                </p>
                <p>
                  <strong>Language:</strong>{" "}
                  {selectedCourse?.language || "English"}
                </p>
              </div>
              <div className="rating-stars">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">☆</span>
                <span className="rating-number">(4.0)</span>
              </div>
              <p className="preview-text">Preview this course</p>
            </div>

            <div className="course-image-container">
              <div className="course-image">
                <img
                  src={`/img/${decodeURIComponent(selectedCourse?.imgUrl)}`}
                  alt={selectedCourse?.name}
                />
                <div className="play-button">▶</div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCourseModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
