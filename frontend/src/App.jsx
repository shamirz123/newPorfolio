import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./Components/admin/AdminDashboard";
import AdminLogin from "./Components/admin/AdminLogin";
import ProtectedRoute from "./Components/admin/ProtectedRoute";
import PortfolioHome from "./pages/PortfolioHome";
import TestimonialForm from "./pages/TestimonialForm";
import { isAuthenticated } from "./api/client";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioHome />} />
      <Route path="/testimonial" element={<TestimonialForm />} />
      <Route
        path="/admin/login"
        element={
          isAuthenticated() ? (
            <Navigate to="/admin" replace />
          ) : (
            <AdminLogin />
          )
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
