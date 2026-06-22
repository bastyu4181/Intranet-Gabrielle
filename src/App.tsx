import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { PrivateRoute } from "./components/PrivateRoute";
import { Clientes } from "./pages/Clientes";
import { Comisiones } from "./pages/Comisiones";
import { ComisionDetalle } from "./pages/ComisionDetalle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/clientes"
          element={
            <PrivateRoute>
              <Clientes />
            </PrivateRoute>
          }
        />
        <Route
          path="/comisiones"
          element={
            <PrivateRoute>
              <Comisiones />
            </PrivateRoute>
          }
        />
        <Route
          path="/comisiones/:id"
          element={
            <PrivateRoute>
              <ComisionDetalle />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;