import React, { useState } from "react";
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

const courses = [
  {
    title: "Cloud Computing Essentials",
    image: "/Img/cloud.jpg",
    link: "/course/cloud",
  },
  {
    title: "Design Thinking for Innovation",
    image: "/Img/design.jpg",
    link: "/course/design",
  },
  {
    title: "DevOps and Continuous Deployment",
    image: "/Img/DevOps.png",
    link: "/course/DevOps",
  },
  { title: "AI Fundamentals", image: "/Img/AI.jpg", link: "/course/ai" },
];

export default function Recommendations() {
  const [addedCourses, setAddedCourses] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAddCourse = () => {
    const course = courses[activeIndex];
    if (!addedCourses.includes(course.title)) {
      setAddedCourses([...addedCourses, course.title]);
      alert(`✅ Added: ${course.title}`);
    }
  };

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
          {courses.map((course, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div
                  className={`course-card ${isActive ? "active" : ""}`}
                  style={{ backgroundImage: `url(${course.image})` }}
                ></div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Add Button Below */}
      <div className="add-button">
        <button
          onClick={handleAddCourse}
          disabled={addedCourses.includes(courses[activeIndex].title)}
          style={{
            opacity: addedCourses.includes(courses[activeIndex].title)
              ? 0.5
              : 1,
            cursor: addedCourses.includes(courses[activeIndex].title)
              ? "not-allowed"
              : "pointer",
          }}
        >
          {addedCourses.includes(courses[activeIndex].title) ? "Added" : "Add"}
        </button>

        <button
          className={addedCourses.length > 0 ? "enabled" : ""}
          onClick={() => alert("Navigating to your courses...")}
        >
          Go to Courses
        </button>
      </div>
    </div>
  );
}
