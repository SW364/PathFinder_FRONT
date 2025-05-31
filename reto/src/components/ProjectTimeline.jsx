// ProjectTimeline.jsx
import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion, useInView } from "framer-motion";
import WorkIcon from "@mui/icons-material/Work";

const API_URL = process.env.REACT_APP_API_URL;

const ProjectTimeline = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, {
    triggerOnce: true,
    margin: "-100px",
  });

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Token no encontrado. Inicia sesión.");

        const res = await fetch(`${API_URL}/employees/timeline`, {
          headers: { "Content-Type": "application/json", token },
        });
        if (!res.ok) throw new Error("Respuesta HTTP " + res.status);

        const data = await res.json();
        console.log("API RESPONSE:", data); // Debug Log

        if (data.error) {
          throw new Error(data.error);
        }

        if (!Array.isArray(data.AbilitiesA))
          throw new Error("Formato de respuesta inesperado");

        const mapped = data.AbilitiesA.map((a) => ({
          date: a.Absinfo?.createdAt?.split("T")[0] || "N/A",
          label: a.name || "Unnamed ability",
          icon: <WorkIcon />,
          color: "#7e57c2",
        }));
        setEvents(mapped);
      } catch (err) {
        console.error(err); // Optional : lgo to console
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  /* --- UI (sin cambios) -------------------------------------------------- */
  return (
    <Box
      /* contenedor */ ref={timelineRef}
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: "12px",
        padding: "2rem",
        boxShadow: "0 4px 20px rgba(0,0,0,.1)",
        borderTop: "4px solid #9b4dff",
        marginTop: "1rem",
        overflowX: "auto",
      }}
    >
      {/* título */}
      <Typography variant="h6" fontWeight={600}>
        Project Timeline
      </Typography>
      <Box
        sx={{
          height: "3px",
          width: "60px",
          bgcolor: "#9b4dff",
          mb: 2,
          borderRadius: 2,
        }}
      />

      {/* cuerpo */}
      {loading ? (
        <Typography>Loading timeline…</Typography>
      ) : error ? (
        <Box
          sx={{ bgcolor: "#fdecea", color: "#b71c1c", p: 2, borderRadius: 2 }}
        >
          {error}
        </Box>
      ) : events.length === 0 ? (
        <Typography>No timeline data found</Typography>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          {events.map((ev, i) => (
            <React.Fragment key={i}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    minWidth: 150,
                    bgcolor: "#fff",
                    borderRadius: 3,
                    p: 2,
                    boxShadow: "0 4px 15px rgba(0,0,0,.1)",
                    border: "3px solid",
                    borderImage: "linear-gradient(135deg,#7e57c2,#9b4dff) 1",
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      bgcolor: "#7e57c2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      mx: "auto",
                      mb: 1,
                      fontSize: 30,
                    }}
                  >
                    {ev.icon}
                  </Box>
                  <Typography fontWeight="bold">{ev.label}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {ev.date}
                  </Typography>
                </Box>
              </motion.div>

              {i < events.length - 1 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "60px" } : { width: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                >
                  <Box
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      background: "linear-gradient(90deg,#9b4dff,#e1bee7)",
                    }}
                  />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProjectTimeline;
