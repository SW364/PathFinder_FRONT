import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { motion, useInView } from "framer-motion";
import FlagIcon from "@mui/icons-material/Flag";
import LaunchIcon from "@mui/icons-material/Launch";
import UpdateIcon from "@mui/icons-material/Update";
import BugReportIcon from "@mui/icons-material/BugReport";
import WorkIcon from "@mui/icons-material/Work";

const ProjectTimeline = () => {
  const events = [
    {
      date: "Sep 2023",
      label: "Start Project A",
      icon: <FlagIcon />,
      color: "#7e57c2",
    },
    {
      date: "Dec 2023",
      label: "First Release",
      icon: <LaunchIcon />,
      color: "#66bb6a",
    },
    {
      date: "Feb 2024",
      label: "Added Features",
      icon: <UpdateIcon />,
      color: "#42a5f5",
    },
    {
      date: "Apr 2024",
      label: "Testing Phase",
      icon: <BugReportIcon />,
      color: "#ffa726",
    },
    { date: "May 2024", label: "Launch", icon: <WorkIcon />, color: "#ab47bc" },
  ];

  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, {
    triggerOnce: true,
    margin: "-100px",
  });

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: "12px",
        padding: "2rem",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        borderTop: "4px solid #9b4dff",
        marginTop: "1rem",
        overflowX: "auto",
      }}
      ref={timelineRef}
    >
      <Box sx={{ display: "inline-block", marginBottom: "1rem" }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#333" }}>
          Project Timeline
        </Typography>
        <Box
          sx={{
            height: "3px",
            width: "60px",
            backgroundColor: "#9b4dff",
            marginTop: "4px",
            borderRadius: "2px",
          }}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
        {events.map((event, index) => (
          <React.Fragment key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  minWidth: "150px",
                  background: "white",
                  borderRadius: "15px",
                  padding: "1rem",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  border: "3px solid",
                  borderImageSlice: 1,
                  borderWidth: "3px",
                  borderImageSource: `linear-gradient(135deg, ${event.color}, #9b4dff)`,
                  transition: "all 0.4s ease",
                  "&:hover": {
                    transform: "scale(1.08)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${event.color}, #ffffff)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    margin: "10px auto",
                    fontSize: "30px",
                  }}
                >
                  {event.icon}
                </Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {event.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.date}
                </Typography>
              </Box>
            </motion.div>

            {index < events.length - 1 && (
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "60px" } : { width: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Box
                  sx={{
                    height: "4px",
                    background: "linear-gradient(90deg, #9b4dff, #e1bee7)",
                    borderRadius: "2px",
                    backgroundSize: "200% 200%",
                    animation: "moveGradient 3s linear infinite",
                  }}
                />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </Box>

      <style>{`
        @keyframes moveGradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </Box>
  );
};

export default ProjectTimeline;
