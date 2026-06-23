import { useState, useEffect } from "react";
import type { Resena } from "../types/Reseña";

interface Props {
  resenaEditando: Resena | null;
  onGuardar: (resena: Omit<Resena, "id">) => void;
  onCancelar: () => void;
}

export function FormularioResena({ resenaEditando, onGuardar, onCancelar }: Props) {
  const [nombreCliente, setNombreCliente] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [comentario, setComentario] = useState("");
  const [fecha, setFecha] = useState("");
  const [visible, setVisible] = useState<Resena["visible"]>("pendiente");

  useEffect(() => {
    if (resenaEditando) {
      setNombreCliente(resenaEditando.nombreCliente);
      setCalificacion(String(resenaEditando.calificacion));
      setComentario(resenaEditando.comentario);
      setFecha(resenaEditando.fecha);
      setVisible(resenaEditando.visible);
    } else {
      setNombreCliente("");
      setCalificacion("");
      setComentario("");
      setFecha("");
      setVisible("pendiente");
    }
  }, [resenaEditando]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onGuardar({
      nombreCliente,
      calificacion: Number(calificacion),
      comentario,
      fecha,
      visible,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{resenaEditando ? "Editar reseña" : "Nueva reseña"}</h3>

      <div>
        <label>Nombre del cliente</label>
        <input
          value={nombreCliente}
          onChange={(e) => setNombreCliente(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Calificación (1 a 5)</label>
        <input
          type="number"
          min="1"
          max="5"
          value={calificacion}
          onChange={(e) => setCalificacion(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Comentario</label>
        <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} required />
      </div>

      <div>
        <label>Fecha</label>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
      </div>

      <div>
        <label>Visibilidad</label>
        <select value={visible} onChange={(e) => setVisible(e.target.value as Resena["visible"])}>
          <option value="visible">Visible</option>
          <option value="oculto">Oculto</option>
          <option value="pendiente">Pendiente</option>
        </select>
      </div>

      <button type="submit">Guardar</button>
      {resenaEditando && <button type="button" onClick={onCancelar}>Cancelar</button>}
    </form>
  );
}
