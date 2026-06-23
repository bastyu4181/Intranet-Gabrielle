import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { PrivateRoute } from "./components/PrivateRoute";
import { Clientes } from "./pages/Clientes";
import { Pedidos } from "./pages/Pedidos";
import { PedidoDetalle } from "./pages/PedidoDetalle";
import { Resenas } from "./pages/Reseña";
import { ResenaDetalle } from "./pages/ReseñaDetalle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <PrivateRoute>
              <Clientes />
            </PrivateRoute>
          }
        />
        <Route
          path="/pedidos"
          element={
            <PrivateRoute>
              <Pedidos />
            </PrivateRoute>
          }
        />
        <Route
          path="/pedidos/:id"
          element={
            <PrivateRoute>
              <PedidoDetalle />
            </PrivateRoute>
          }
        />
        <Route
          path="/resenas"
          element={
            <PrivateRoute>
              <Resenas />
            </PrivateRoute>
          }
        />
        <Route
          path="/resenas/:id"
          element={
            <PrivateRoute>
              <ResenaDetalle />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
