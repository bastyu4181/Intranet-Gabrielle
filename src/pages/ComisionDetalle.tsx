import { useParams, useNavigate } from "react-router-dom";
import { useComisiones } from "../hooks/useComisiones";

export function ComisionDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { obtenerComisionPorId } = useComisiones();

  const comision = id ? obtenerComisionPorId(id) : undefined;

  if (!comision) {
    return (
      <div>
        <p>Comisión no encontrada.</p>
        <button onClick={() => navigate("/comisiones")}>Volver</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{comision.nombreProyecto}</h1>
      <p><strong>Tipo de ilustración:</strong> {comision.tipoIlustracion}</p>
      <p><strong>Descripción:</strong> {comision.descripcion}</p>
      <p><strong>Precio base:</strong> ${comision.precioBase}</p>
      <p><strong>Tiempo estimado:</strong> {comision.tiempoEstimado}</p>
      <p><strong>Categoría:</strong> {comision.categoria}</p>
      <p><strong>Estado:</strong> {comision.estado}</p>
      <p><strong>Fecha límite:</strong> {comision.fechaLimite}</p>
      <button onClick={() => navigate("/comisiones")}>Volver</button>
    </div>
  );
}