import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const courses = [
  {
    title: "Leadership and Management of Agile Teams",
    image: "/Img/agile.jpeg", // capital I
    link: "/course/agile",
  },
  {
    title: "Data Analysis Fundamentals",
    image: "/Img/data.jpg", // note: .jpg, check extension carefully
    link: "/course/data-analysis",
  },
  {
    title: "Intro to Cybersecurity",
    image: "/Img/cyber.jpeg", // capital I
    link: "/course/cybersecurity",
  },
];

export default function Recommendations() {
  return (
    <div style={{ marginLeft: "260px", padding: "2rem" }}>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
      >
        {courses.map((course, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                backgroundImage: `url(${course.image})`,
                backgroundSize: "cover",
                borderRadius: "12px",
                height: "400px",
                display: "flex",
                alignItems: "flex-end",
                padding: "2rem",
                color: "white",
                fontSize: "1.8rem",
                fontWeight: "bold",
                backgroundPosition: "center",
              }}
            >
              📘 {course.title}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
