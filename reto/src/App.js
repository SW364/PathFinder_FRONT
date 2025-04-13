import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { UserProvider } from "./helpers/UserContext";
import Layout from "./components/Layout";
import Dashboard from "./Pages/Dashboard";
import CareerPath from "./Pages/CareerPath";
import Assignation from "./Pages/Assignation";
import EditProfile from "./Pages/EditProfile";
import Profile from "./Pages/Profile";
import Courses from "./Pages/Courses";
import LoginPage from "./Pages/Login";
import Recommendations from "./Pages/Recommendations";
import HomePage from "./Pages/Homepage";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/career"
            element={
              <Layout>
                <CareerPath/>
              </Layout>
            }
          />
          <Route
            path="/assignation"
            element={
              <Layout>
                <Assignation />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <Layout>
                <EditProfile />
              </Layout>
            }
          />
          <Route
            path="/courses"
            element={
              <Layout>
                <Courses />
              </Layout>
            }
          />
          <Route
            path="/recommendations"
            element={
              <Layout>
                <Recommendations />
              </Layout>
            }
          />
          <Route
            path="/Home"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
