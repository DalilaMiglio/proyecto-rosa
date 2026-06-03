import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useAuth } from "./hooks/useAuth";
import { About } from "./pages/About";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Tasks } from "./pages/Tasks";
import { ProtectedRoute } from "./routes/ProtectedRoute";

export default function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Navbar email={user?.email} />

      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}