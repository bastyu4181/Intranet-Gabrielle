import { useState, useEffect } from "react";
import type { Pedido } from "../types/Pedido";
import { useClientes } from "../hooks/useClientes";

interface Props {
  pedidoEditando: Pedido | null;
  onGuardar: (pedido: Omit<Pedido, "id">) => void;
  onCancelar: () => void;
}

export function FormularioPedido({ pedidoEditando, onGuardar, onCancelar }: Props) {
  const [nombreCliente, setNombreCliente] = useState("");
  const [tipoIlustracion, setTipoIlustracion] = useState<Pedido["tipoIlustracion"]>("fanart");
  const [descripcion, setDescripcion] = useState("");
  const [precioBase, setPrecioBase] = useState("");
  const [tiempoEstimado, setTiempoEstimado] = useState("");
  const [categoria, setCategoria] = useState("");
  const [estado, setEstado] = useState<Pedido["estado"]>("pendiente");
  const [fechaHora, setFechaHora] = useState("");
  const [comentario, setComentario] = useState("");
  const { clientes } = useClientes();
  const [errorCliente, setErrorCliente] = useState("");

  useEffect(() => {
    if (pedidoEditando) {
      setNombreCliente(pedidoEditando.nombreCliente);
      setTipoIlustracion(pedidoEditando.tipoIlustracion);
      setDescripcion(pedidoEditando.descripcion);
      setPrecioBase(String(pedidoEditando.precioBase));
      setTiempoEstimado(pedidoEditando.tiempoEstimado);
      setCategoria(pedidoEditando.categoria);
      setEstado(pedidoEditando.estado);
      setFechaHora(pedidoEditando.fechaHora);
      setComentario(pedidoEditando.comentario);
    } else {
      setNombreCliente("");
      setTipoIlustracion("fanart");
      setDescripcion("");
      setPrecioBase("");
      setTiempoEstimado("");
      setCategoria("");
      setEstado("pendiente");
      setFechaHora("");
      setComentario("");
    }
  }, [pedidoEditando]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const clienteExiste = clientes.some(
      (c) => c.nombre.toLowerCase().trim() === nombreCliente.toLowerCase().trim()
    );

    if (!clienteExiste) {
      setErrorCliente("Este cliente no está registrado. Primero debes agregarlo en el módulo de Clientes.");
      return;
    }

    setErrorCliente("");
    onGuardar({
      nombreCliente,
      tipoIlustracion,  
      descripcion,
      precioBase: Number(precioBase),
      tiempoEstimado,
      categoria,
      estado,
      fechaHora,
      comentario,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{pedidoEditando ? "Editar pedido" : "Nuevo pedido"}</h3>

    <div>
      <label>Nombre del cliente</label>
      <input
        value={nombreCliente}
        onChange={(e) => setNombreCliente(e.target.value)}
        required
      />
      {errorCliente && <p style={{ color: "red" }}>{errorCliente}</p>}
    </div>

      <div>
        <label>Tipo de ilustración</label>
        <select
          value={tipoIlustracion}
          onChange={(e) => setTipoIlustracion(e.target.value as Pedido["tipoIlustracion"])}
        >
          <option value="fanart">Fanart</option>
          <option value="ilustracion de personaje">Ilustración de personaje</option>
          <option value="retrato">Retrato</option>
          <option value="diseño para empresa">Diseño para empresa</option>
        </select>
      </div>

      <div>
        <label>Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Precio base ($)</label>
        <input
          type="number"
          value={precioBase}
          onChange={(e) => setPrecioBase(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Tiempo estimado</label>
        <input
          value={tiempoEstimado}
          onChange={(e) => setTiempoEstimado(e.target.value)}
          placeholder="ej: 5 días"
          required
        />
      </div>

      <div>
        <label>Categoría</label>
        <input value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
      </div>

      <div>
        <label>Estado</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value as Pedido["estado"])}>
          <option value="pendiente">Pendiente</option>
          <option value="en proceso">En proceso</option>
          <option value="finalizado">Finalizado</option>
        </select>
      </div>

      <div>
        <label>Fecha y hora</label>
        <input
          type="datetime-local"
          value={fechaHora}
          onChange={(e) => setFechaHora(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Comentario</label>
        <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} />
      </div>

      <button type="submit">Guardar</button>
      {pedidoEditando && <button type="button" onClick={onCancelar}>Cancelar</button>}
    </form>
  );
}
