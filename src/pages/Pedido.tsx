import { useState } from "react";
import { Link } from "react-router-dom";
import { usePedidos } from "../hooks/usePedidos";
import { FormularioPedido } from "../components/FormularioPedido";
import type { Pedido } from "../types/Pedido";
import { NavBar } from "../components/NavBar";

export function Pedidos() {
  const { pedidos, agregarPedido, editarPedido, eliminarPedido } = usePedidos();
  const [pedidoEditando, setPedidoEditando] = useState<Pedido | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");

  function handleGuardar(datos: Omit<Pedido, "id">) {
    if (pedidoEditando) {
      editarPedido(pedidoEditando.id, datos);
      setPedidoEditando(null);
    } else {
      agregarPedido(datos);
    }
  }

  function handleEliminar(id: string) {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este pedido?");
    if (confirmar) {
      eliminarPedido(id);
    }
  }

  const pedidosFiltrados =
    filtroEstado === "todos" ? pedidos : pedidos.filter((p) => p.estado === filtroEstado);

  return (
    <div>
      <NavBar />
      <h1>Pedidos</h1>

      <FormularioPedido
        pedidoEditando={pedidoEditando}
        onGuardar={handleGuardar}
        onCancelar={() => setPedidoEditando(null)}
      />

      <div>
        <label>Filtrar por estado: </label>
        <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="en proceso">En proceso</option>
          <option value="finalizado">Finalizado</option>
        </select>
      </div>

      <ul>
        {pedidosFiltrados.map((pedido) => (
          <li key={pedido.id}>
            <Link to={`/pedidos/${pedido.id}`}>{pedido.nombreCliente}</Link>
                {" — "}{pedido.tipoIlustracion} — ${pedido.precioBase} — {pedido.estado}
            <button onClick={() => setPedidoEditando(pedido)}>Editar</button>
            <button onClick={() => handleEliminar(pedido.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
