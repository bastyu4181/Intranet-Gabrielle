import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function NavBar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav style={{ display: "flex", gap: "10px", padding: "10px", borderBottom: "1px solid #444" }}>
      <Link to="/dashboard">
        <button type="button">Dashboard</button>
      </Link>
      <Link to="/clientes">
        <button type="button">Clientes</button>
      </Link>
      <Link to="/pedidos">
        <button type="button">Pedidos</button>
      </Link>
      <Link to="/resenas">
        <button type="button">Reseñas</button>
      </Link>

      <div style={{ marginLeft: "auto" }}>
        <span>{usuario?.nombre}</span>
        <button type="button" onClick={handleLogout} style={{ marginLeft: "10px" }}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}