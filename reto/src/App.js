import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { UserProvider } from "./helpers/UserContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import CareerPath from "./Pages/CareerPath";
import Assignation from "./Pages/Assignation";
import EditProfile from "./Pages/EditProfile";
import Profile from "./Pages/Profile";
import Courses from "./Pages/Courses";
import LoginPage from "./Pages/Login"; // 1. Nombre de componente debe comenzar con mayúscula

function App() {
  return (
    <Router>
      <UserProvider>
        {/* 2. Sidebar no debería mostrarse en la página de login */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={ // 3. Rutas protegidas (con layout común)
            <>
              <Sidebar />
              <div
                className="flex-grow-1"
                style={{
                  minHeight: "100vh",
                  overflowY: "auto",
                  backgroundColor: "#ffffff",
                  padding: "2rem",
                  marginLeft: "250px",
                  boxSizing: "border-box",
                }}
              >
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/career" element={<CareerPath />} />
                  <Route path="/assignation" element={<Assignation />} />
                  <Route path="/profile/edit" element={<EditProfile />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/courses" element={<Courses />} />
                </Routes>
              </div>
            </>
          } />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;