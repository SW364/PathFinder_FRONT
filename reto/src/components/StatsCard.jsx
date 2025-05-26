import React, { useState } from "react";
import Chart from "react-apexcharts";
import { FiCalendar } from "react-icons/fi";

const StatsCard = () => {
  const [mode, setMode] = useState("month");

  const fullData = {
    month: [
      {
        name: "Applications",
        data: [80, 70, 85, 75, 90, 95, 80, 65, 70, 85, 75, 80],
        color: "#6C3DF3",
      },
      {
        name: "Shortlisted",
        data: [50, 45, 55, 50, 60, 65, 55, 50, 60, 62, 63, 64],
        color: "#FFC34D",
      },
      {
        name: "Rejected",
        data: [30, 25, 35, 28, 40, 45, 35, 28, 40, 45, 42, 41],
        color: "#FF6347",
      },
      {
        name: "OnHold",
        data: [10, 15, 20, 18, 25, 30, 20, 18, 20, 22, 23, 24],
        color: "#C7C7FF",
      },
    ],
    week: [
      { name: "Applications", data: [80, 75, 72, 85], color: "#6C3DF3" },
      { name: "Shortlisted", data: [60, 50, 55, 62], color: "#FFC34D" },
      { name: "Rejected", data: [35, 28, 32, 30], color: "#FF6347" },
      { name: "OnHold", data: [20, 22, 18, 25], color: "#C7C7FF" },
    ],
  };

  const xCategories =
    mode === "month"
      ? [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ]
      : ["Week 1", "Week 2", "Week 3", "Week 4"];

  const [activeSeries, setActiveSeries] = useState({
    Applications: true,
    Shortlisted: true,
    Rejected: true,
    OnHold: true,
  });

  const handleToggle = (name) =>
    setActiveSeries((prev) => ({ ...prev, [name]: !prev[name] }));

  const filteredSeries = fullData[mode].filter((s) => activeSeries[s.name]);

  const options = {
    chart: {
      type: "bar",
      stacked: true,
      stackType: "100%",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "10%",
        borderRadius: 6,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: xCategories,
      labels: {
        style: { fontSize: "12px" },
        offsetY: 2,
        rotate: -45,
        trim: false,
        hideOverlappingLabels: false,
      },
    },
    grid: {
      show: false,
      padding: { bottom: -10 },
    },
    colors: filteredSeries.map((s) => s.color),
    legend: { show: false },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: (val) => `${val}%` } },
    yaxis: {
      labels: { formatter: (val) => `${val}%`, style: { fontSize: "14px" } },
      max: 100,
    },
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
    >
      <div
        style={{
          padding: "2rem",
          borderRadius: "20px",
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "800px",
          minHeight: "50px",
          position: "relative",
          borderTop: "4px solid #9b4dff",
        }}
      >
        <h2
          style={{ fontSize: "20px", marginBottom: "1rem", fontWeight: "bold" }}
        >
          Statistics of Active Applications
        </h2>
        <button
          onClick={() =>
            setMode((prev) => (prev === "month" ? "week" : "month"))
          }
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            backgroundColor: "transparent",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          <span
            style={{
              backgroundColor: "#EDE9FE",
              borderRadius: "8px",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FiCalendar size={16} color="#6C3DF3" />
          </span>
          <span style={{ color: "#000" }}>
            {mode === "month" ? "Month ▼" : "Week ▼"}
          </span>
        </button>

        <div style={{ position: "relative", paddingBottom: "2rem" }}>
          <Chart
            options={options}
            series={filteredSeries}
            type="bar"
            height={250}
          />
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              right: "0",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              paddingTop: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            {fullData[mode].map((s) => (
              <label
                key={s.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: "0.3rem",
                  margin: "0.3rem",
                }}
              >
                <div
                  onClick={() => handleToggle(s.name)}
                  style={{
                    width: "40px",
                    height: "20px",
                    borderRadius: "999px",
                    backgroundColor: activeSeries[s.name] ? s.color : "#ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: activeSeries[s.name]
                      ? "flex-end"
                      : "flex-start",
                    padding: "2px",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                    }}
                  ></div>
                </div>
                <span
                  style={{
                    fontWeight: "normal",
                    color: "#000",
                    fontSize: "12px",
                  }}
                >
                  {s.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
