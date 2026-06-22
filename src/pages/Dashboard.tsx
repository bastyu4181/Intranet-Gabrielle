import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useClientes } from "../hooks/useClientes";
import { useComisiones } from "../hooks/useComisiones";

export function Dashboard() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const { clientes } = useClientes();
  const { comisiones } = useComisiones();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const comisionesPendientes = comisiones.filter((c) => c.estado === "pendiente").length;
  const comisionesEnProceso = comisiones.filter((c) => c.estado === "en proceso").length;
  const comisionesFinalizadas = comisiones.filter((c) => c.estado === "finalizado").length;

  return (
    <div>
      <h1>Bienvenida, {usuario?.nombre}</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>

      <nav>
        <Link to="/clientes">Ir a Clientes</Link>
        {" | "}
        <Link to="/comisiones">Ir a Comisiones</Link>
      </nav>

      <h2>Resumen general</h2>
      <ul>
        <li>Total de clientes: {clientes.length}</li>
        <li>Total de comisiones: {comisiones.length}</li>
        <li>Pendientes: {comisionesPendientes}</li>
        <li>En proceso: {comisionesEnProceso}</li>
        <li>Finalizadas: {comisionesFinalizadas}</li>
      </ul>
    </div>
  );
}