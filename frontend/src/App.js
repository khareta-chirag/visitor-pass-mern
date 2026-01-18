import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SecurityDashboard from "./pages/security/SecurityDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import VisitorRegister from "./pages/visitor/VisitorRegister";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/employee"
            element={
              <ProtectedRoute role="employee">
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/security" element={<SecurityDashboard />} />
          <Route path="/visit" element={<VisitorRegister />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
