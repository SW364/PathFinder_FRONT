import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import CareerPath from "./Pages/CareerPath";
import Assignation from "./Pages/Assignation";
import EditProfile from "./Pages/EditProfile";
import Profile from "./Pages/Profile";

function App() {
  return (
    <Router>
      <div className="d-flex vh-100">
        <Sidebar />
        <div className="flex-grow-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/career" element={<CareerPath />} />
            <Route path="/assignation" element={<Assignation />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
