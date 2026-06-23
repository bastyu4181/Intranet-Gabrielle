import { useParams, useNavigate } from "react-router-dom";
import { useResenas } from "../hooks/useReseña";

export function ResenaDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { obtenerResenaPorId } = useResenas();

  const resena = id ? obtenerResenaPorId(id) : undefined;

  if (!resena) {
    return (
      <div>
        <p>Reseña no encontrada.</p>
        <button onClick={() => navigate("/resenas")}>Volver</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Reseña de {resena.nombreCliente}</h1>
      <p><strong>Calificación:</strong> {resena.calificacion} ★</p>
      <p><strong>Comentario:</strong> {resena.comentario}</p>
      <p><strong>Fecha:</strong> {resena.fecha}</p>
      <p><strong>Visibilidad:</strong> {resena.visible}</p>
      <button onClick={() => navigate("/resenas")}>Volver</button>
    </div>
  );
}