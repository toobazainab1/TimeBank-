import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import OurSkills from "./pages/OurSkills";
import TimeSession from "./pages/TimeSession";
import UserDashboard from "./pages/UserDashboard";
import OurImpact from "./pages/OurImpact";
import ContactUs from "./pages/ContactUs";
import OurMission from "./pages/OurMission";
import AuthPage from "./pages/AuthPage";

// 🔐 Protected Route (login required)
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return user ? children : <Navigate to="/auth" replace />;
};

// 🔓 Auth Route (already logged in → dashboard)
const AuthRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return user ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        {/* 🌐 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <AuthPage />
            </AuthRoute>
          }
        />
        <Route path="/skills" element={<OurSkills />} />
        <Route path="/impact" element={<OurImpact />} />
        <Route path="/mission" element={<OurMission />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/sessions"
          element={
            <ProtectedRoute>
              <TimeSession />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* ❌ Unknown routes → Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
