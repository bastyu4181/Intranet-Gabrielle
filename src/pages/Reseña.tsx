import { useState } from "react";
import { Link } from "react-router-dom";
import { useResenas } from "../hooks/useReseña";
import { FormularioResena } from "../components/FormularioReseña";
import type { Resena } from "../types/Reseña";

export function Resenas() {
  const { resenas, agregarResena, editarResena, eliminarResena } = useResenas();
  const [resenaEditando, setResenaEditando] = useState<Resena | null>(null);
  const [filtroVisible, setFiltroVisible] = useState<string>("todas");

  function handleGuardar(datos: Omit<Resena, "id">) {
    if (resenaEditando) {
      editarResena(resenaEditando.id, datos);
      setResenaEditando(null);
    } else {
      agregarResena(datos);
    }
  }

  function handleEliminar(id: string) {
    const confirmar = window.confirm("¿Seguro que quieres eliminar esta reseña?");
    if (confirmar) {
      eliminarResena(id);
    }
  }

  const resenasFiltradas =
    filtroVisible === "todas" ? resenas : resenas.filter((r) => r.visible === filtroVisible);

  return (
    <div>
      <h1>Reseñas</h1>

      <FormularioResena
        resenaEditando={resenaEditando}
        onGuardar={handleGuardar}
        onCancelar={() => setResenaEditando(null)}
      />

      <div>
        <label>Filtrar por visibilidad: </label>
        <select value={filtroVisible} onChange={(e) => setFiltroVisible(e.target.value)}>
          <option value="todas">Todas</option>
          <option value="visible">Visible</option>
          <option value="oculto">Oculto</option>
          <option value="pendiente">Pendiente</option>
        </select>
      </div>

      <ul>
        {resenasFiltradas.map((resena) => (
          <li key={resena.id}>
            <Link to={`/resenas/${resena.id}`}>{resena.nombreCliente}</Link>
            {" — "}{resena.calificacion}★ — {resena.visible} — {resena.fecha}
            <button onClick={() => setResenaEditando(resena)}>Editar</button>
            <button onClick={() => handleEliminar(resena.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}