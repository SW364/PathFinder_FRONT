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
import LoginPage from "./Pages/Login";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          {/* Página de login */}
          <Route path="/" element={<LoginPage />} />

          {/* Rutas protegidas con Sidebar */}
          <Route
            path="/dashboard"
            element={
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
                  <Dashboard />
                </div>
              </>
            }
          />
          <Route
            path="/career"
            element={
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
                  <CareerPath />
                </div>
              </>
            }
          />
          <Route
            path="/assignation"
            element={
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
                  <Assignation />
                </div>
              </>
            }
          />
          <Route
            path="/profile"
            element={
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
                  <Profile />
                </div>
              </>
            }
          />
          <Route
            path="/profile/edit"
            element={
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
                  <EditProfile />
                </div>
              </>
            }
          />
          <Route
            path="/courses"
            element={
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
                  <Courses />
                </div>
              </>
            }
          />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
