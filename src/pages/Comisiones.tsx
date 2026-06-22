import { useState } from "react";
import { Link } from "react-router-dom";
import { useComisiones } from "../hooks/useComisiones";
import { FormularioComision } from "../components/FormularioComision";
import type { Comision } from "../types/Comision";

export function Comisiones() {
  const { comisiones, agregarComision, editarComision, eliminarComision } = useComisiones();
  const [comisionEditando, setComisionEditando] = useState<Comision | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");

  function handleGuardar(datos: Omit<Comision, "id">) {
    if (comisionEditando) {
      editarComision(comisionEditando.id, datos);
      setComisionEditando(null);
    } else {
      agregarComision(datos);
    }
  }

  function handleEliminar(id: string) {
    const confirmar = window.confirm("¿Seguro que quieres eliminar esta comisión?");
    if (confirmar) {
      eliminarComision(id);
    }
  }

  const comisionesFiltradas =
    filtroEstado === "todos"
      ? comisiones
      : comisiones.filter((c) => c.estado === filtroEstado);

  return (
    <div>
      <h1>Comisiones</h1>

      <FormularioComision
        comisionEditando={comisionEditando}
        onGuardar={handleGuardar}
        onCancelar={() => setComisionEditando(null)}
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
        {comisionesFiltradas.map((comision) => (
          <li key={comision.id}>
            <Link to={`/comisiones/${comision.id}`}>{comision.nombreProyecto}</Link>
            {" — "}
            {comision.tipoIlustracion} — ${comision.precioBase} — {comision.estado}
            <button onClick={() => setComisionEditando(comision)}>Editar</button>
            <button onClick={() => handleEliminar(comision.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}