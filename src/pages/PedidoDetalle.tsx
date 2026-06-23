import { useParams, useNavigate, Link } from "react-router-dom";
import { usePedidos } from "../hooks/usePedidos";
import { NavBar } from "../components/NavBar";

export function PedidoDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { obtenerPedidoPorId } = usePedidos();

  const pedido = id ? obtenerPedidoPorId(id) : undefined;

  if (!pedido) {
    return (
      <div>
        <NavBar />
        <p>Pedido no encontrado.</p>
        <button onClick={() => navigate("/pedidos")}>Volver</button>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <h1>
        Pedido de{" "}
        <Link to={`/clientes?buscar=${encodeURIComponent(pedido.nombreCliente)}`}>
          {pedido.nombreCliente}
        </Link>
      </h1>
      <p><strong>Tipo de ilustración:</strong> {pedido.tipoIlustracion}</p>
      <p><strong>Descripción:</strong> {pedido.descripcion}</p>
      <p><strong>Precio base:</strong> ${pedido.precioBase}</p>
      <p><strong>Tiempo estimado:</strong> {pedido.tiempoEstimado}</p>
      <p><strong>Categoría:</strong> {pedido.categoria}</p>
      <p><strong>Estado:</strong> {pedido.estado}</p>
      <p><strong>Fecha y hora:</strong> {pedido.fechaHora}</p>
      <p><strong>Comentario:</strong> {pedido.comentario}</p>
      <button onClick={() => navigate("/pedidos")}>Volver</button>
    </div>
  );
}
