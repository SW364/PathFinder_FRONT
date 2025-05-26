import React from "react";
import { Box, Typography } from "@mui/material";
import KpiGrid from "../components/KpiGrid";
import StatsCard from "../components/StatsCard";
import AcquisitionsCard from "../components/AcquisitionsCard";
import "../styles/Dashboard.css";

export default function Dashboard() {
  return (
    <Box
      sx={{ padding: "2rem", backgroundColor: "#f4f6f8", minHeight: "100vh" }}
    >
      {/* 🔥 KPI Cards */}
      <KpiGrid />

      {/* 🔥 Stats and Acquisitions Layout */}
      <Box
        mt={4}
        display="flex"
        gap={3}
        flexWrap="nowrap" // Prevent wrapping
        alignItems="flex-start" // Align cards at the top
      >
        {/* Statistics Card */}
        <Box flexGrow={1}>
          {" "}
          {/* Takes remaining width */}
          <StatsCard />
        </Box>

        {/* Acquisitions Card */}
        <Box width="300px">
          {" "}
          {/* Fixed width for Acquisitions */}
          <AcquisitionsCard />
        </Box>
      </Box>
    </Box>
  );
}
