import { useState, useEffect } from "react";
import type { Comision } from "../types/Comision";

interface Props {
  comisionEditando: Comision | null;
  onGuardar: (comision: Omit<Comision, "id">) => void;
  onCancelar: () => void;
}

export function FormularioComision({ comisionEditando, onGuardar, onCancelar }: Props) {
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [tipoIlustracion, setTipoIlustracion] = useState<Comision["tipoIlustracion"]>("fanart");
  const [descripcion, setDescripcion] = useState("");
  const [precioBase, setPrecioBase] = useState("");
  const [tiempoEstimado, setTiempoEstimado] = useState("");
  const [categoria, setCategoria] = useState("");
  const [estado, setEstado] = useState<Comision["estado"]>("pendiente");
  const [fechaLimite, setFechaLimite] = useState("");

  useEffect(() => {
    if (comisionEditando) {
      setNombreProyecto(comisionEditando.nombreProyecto);
      setTipoIlustracion(comisionEditando.tipoIlustracion);
      setDescripcion(comisionEditando.descripcion);
      setPrecioBase(String(comisionEditando.precioBase));
      setTiempoEstimado(comisionEditando.tiempoEstimado);
      setCategoria(comisionEditando.categoria);
      setEstado(comisionEditando.estado);
      setFechaLimite(comisionEditando.fechaLimite);
    } else {
      setNombreProyecto("");
      setTipoIlustracion("fanart");
      setDescripcion("");
      setPrecioBase("");
      setTiempoEstimado("");
      setCategoria("");
      setEstado("pendiente");
      setFechaLimite("");
    }
  }, [comisionEditando]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onGuardar({
      nombreProyecto,
      tipoIlustracion,
      descripcion,
      precioBase: Number(precioBase),
      tiempoEstimado,
      categoria,
      estado,
      fechaLimite,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{comisionEditando ? "Editar comisión" : "Nueva comisión"}</h3>

      <div>
        <label>Nombre del proyecto</label>
        <input value={nombreProyecto} onChange={(e) => setNombreProyecto(e.target.value)} required />
      </div>

      <div>
        <label>Tipo de ilustración</label>
        <select
          value={tipoIlustracion}
          onChange={(e) => setTipoIlustracion(e.target.value as Comision["tipoIlustracion"])}
        >
          <option value="fanart">Fanart</option>
          <option value="ilustracion de personaje">Ilustración de personaje</option>
          <option value="retrato">Retrato</option>
          <option value="diseño para empresa">Diseño para empresa</option>
        </select>
      </div>

      <div>
        <label>Descripción</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
      </div>

      <div>
        <label>Precio base</label>
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
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value as Comision["estado"])}
        >
          <option value="pendiente">Pendiente</option>
          <option value="en proceso">En proceso</option>
          <option value="finalizado">Finalizado</option>
        </select>
      </div>

      <div>
        <label>Fecha límite</label>
        <input
          type="date"
          value={fechaLimite}
          onChange={(e) => setFechaLimite(e.target.value)}
          required
        />
      </div>

      <button type="submit">Guardar</button>
      {comisionEditando && <button type="button" onClick={onCancelar}>Cancelar</button>}
    </form>
  );
}