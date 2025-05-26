import React from "react";
import { Box } from "@mui/material";
import KpiCard from "./KpiCard";

const KPI_DATA = [
  {
    title: "Total Applications",
    value: 5672,
    percent: 74,
    color: "#7e57c2",
    growth: "+14%",
  },
  {
    title: "Short Candidates",
    value: 3045,
    percent: 60,
    color: "#fdd835",
    growth: "+06%",
  },
  {
    title: "Rejected Candidates",
    value: 1055,
    percent: 46,
    color: "#ef5350",
    growth: "+46%",
  },
];

const KpiGrid = () => (
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="stretch"
    flexWrap="nowrap"
    gap={0.5} // 🔥 Smaller gap
    sx={{
      maxWidth: "1200px",
      margin: "0 auto",
      width: "100%",
    }}
  >
    {KPI_DATA.map((kpi, idx) => (
      <Box
        key={idx}
        flex="0 0 30%" // 🔥 Reduce width to ~30%
        maxWidth="30%" // 🔥 Or even 28% if you want more gap
      >
        <KpiCard {...kpi} />
      </Box>
    ))}
  </Box>
);

export default KpiGrid;
