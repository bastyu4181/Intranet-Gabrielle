import { useAuth } from "../context/AuthContext";
import { useClientes } from "../hooks/useClientes";
import { usePedidos } from "../hooks/usePedidos";
import { useResenas } from "../hooks/useReseña";
import { NavBar } from "../components/NavBar";

export function Dashboard() {
  const { usuario } = useAuth();
  const { clientes } = useClientes();
  const { pedidos } = usePedidos();
  const { resenas } = useResenas();

  const pedidosPendientes = pedidos.filter((p) => p.estado === "pendiente").length;
  const pedidosEnProceso = pedidos.filter((p) => p.estado === "en proceso").length;
  const pedidosFinalizados = pedidos.filter((p) => p.estado === "finalizado").length;

  return (
    <div>
      <NavBar />
      <h1>Bienvenida, {usuario?.nombre}</h1>

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
