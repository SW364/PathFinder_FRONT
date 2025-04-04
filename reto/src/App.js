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

function App() {
  return (
    <Router>
      <UserProvider>
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
            <Route path="/" element={<Dashboard />} />
            <Route path="/career" element={<CareerPath />} />
            <Route path="/assignation" element={<Assignation />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/courses" element={<Courses />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
