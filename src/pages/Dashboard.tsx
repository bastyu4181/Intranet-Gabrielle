import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useClientes } from "../hooks/useClientes";
import { usePedidos } from "../hooks/usePedidos";
import { useResenas } from "../hooks/useReseña";

export function Dashboard() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const { clientes } = useClientes();
  const { pedidos } = usePedidos();
  const { resenas } = useResenas();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const pedidosPendientes = pedidos.filter((p) => p.estado === "pendiente").length;
  const pedidosEnProceso = pedidos.filter((p) => p.estado === "en proceso").length;
  const pedidosFinalizados = pedidos.filter((p) => p.estado === "finalizado").length;

  return (
    <div>
      <h1>Bienvenida, {usuario?.nombre}</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>

      <nav>
        <Link to="/clientes">Ir a Clientes</Link>
        {" | "}
        <Link to="/pedidos">Ir a Pedidos</Link>
        {" | "}
        <Link to="/resenas">Ir a Reseñas</Link>
      </nav>

      <h2>Resumen general</h2>
      <ul>
        <li>Total de clientes: {clientes.length}</li>
        <li>Total de pedidos: {pedidos.length}</li>
        <li>Pedidos pendientes: {pedidosPendientes}</li>
        <li>Pedidos en proceso: {pedidosEnProceso}</li>
        <li>Pedidos finalizados: {pedidosFinalizados}</li>
        <li>Total de reseñas: {resenas.length}</li>
      </ul>
    </div>
  );
}
