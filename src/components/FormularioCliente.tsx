import { useState, useEffect } from "react";
import type { Cliente } from "../types/Cliente";

interface Props {
  clienteEditando: Cliente | null;
  onGuardar: (cliente: Omit<Cliente, "id">) => void;
  onCancelar: () => void;
}

export function FormularioCliente({ clienteEditando, onGuardar, onCancelar }: Props) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    if (clienteEditando) {
      setNombre(clienteEditando.nombre);
      setCorreo(clienteEditando.correo);
      setTelefono(clienteEditando.telefono);
    } else {
      setNombre("");
      setCorreo("");
      setTelefono("");
    }
  }, [clienteEditando]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onGuardar({ nombre, correo, telefono });
    setNombre("");
    setCorreo("");
    setTelefono("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{clienteEditando ? "Editar cliente" : "Nuevo cliente"}</h3>
      <div>
        <label>Nombre</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </div>
      <div>
        <label>Correo</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Teléfono</label>
        <input value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
      </div>
      <button type="submit">Guardar</button>
      {clienteEditando && <button type="button" onClick={onCancelar}>Cancelar</button>}
    </form>
  );
}