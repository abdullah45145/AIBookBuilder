import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./component/auth/ProtectedRoute";

import Landingpage from "./pages/Landingpage";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";
import DashboardPage from "./pages/DashboardPage";
import Editorpage from "./pages/Editorpage";
import Profilepage from "./pages/Profilepage";
import ViewBookpage from "./pages/ViewBookpage";
// import Features from "./component/landing/Feautures";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />
        {/* <Route path="/features" element={<Features />} /> */}

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor/:bookId"
          element={
            <ProtectedRoute>
              <Editorpage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profilepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewbook/:bookId"
          element={
            <ProtectedRoute>
              <ViewBookpage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
