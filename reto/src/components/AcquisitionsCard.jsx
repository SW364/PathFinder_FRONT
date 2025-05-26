import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import { motion } from "framer-motion";

const acquisitionData = [
  { name: "Applications", percent: 80, color: "#6C3DF3" },
  { name: "Shortlisted", percent: 55, color: "#FFC34D" },
  { name: "Rejected", percent: 47, color: "#FF6347" },
  { name: "On Hold", percent: 35, color: "#C7C7FF" },
  { name: "Finalised", percent: 24, color: "#34D399" }, // verde
];

const AcquisitionsCard = () => {
  const [animatedPercents, setAnimatedPercents] = useState(
    acquisitionData.map(() => 0)
  );

  useEffect(() => {
    const intervals = acquisitionData.map((item, index) => {
      return setInterval(() => {
        setAnimatedPercents((prev) => {
          const newPercents = [...prev];
          if (newPercents[index] < item.percent) {
            newPercents[index] += 1;
          } else {
            clearInterval(intervals[index]);
          }
          return newPercents;
        });
      }, 10); // Velocidad ajustable
    });

    return () => intervals.forEach((int) => clearInterval(int));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "1.5rem",
          borderRadius: "20px",
          backgroundColor: "#fff",
          width: "350px",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginLeft: "-55px",
          borderTop: "4px solid #9b4dff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight="bold">
            Acquisitions
          </Typography>
          <Typography
            sx={{
              backgroundColor: "#EDE9FE",
              padding: "4px 8px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: "500",
            }}
          >
            Month ▼
          </Typography>
        </Box>

        {acquisitionData.map((item, index) => (
          <Box key={index} mb={1.5}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: item.color,
                  }}
                />
                <Typography variant="body2" fontWeight={500}>
                  {item.name}
                </Typography>
              </Box>
              <Typography variant="body2" fontWeight={600}>
                {animatedPercents[index]}%
              </Typography>
            </Box>

            <Box
              sx={{
                backgroundColor: "#f0f0f0",
                height: "6px",
                borderRadius: "4px",
                overflow: "hidden",
                mt: 0.5,
              }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${animatedPercents[index]}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                  backgroundColor: item.color,
                  height: "100%",
                }}
              />
            </Box>

            {index < acquisitionData.length - 1 && <Divider sx={{ my: 1 }} />}
          </Box>
        ))}
      </Paper>
    </motion.div>
  );
};

export default AcquisitionsCard;
