import { useState } from "react";
import { useClientes } from "../hooks/useClientes";
import { FormularioCliente } from "../components/FormularioCliente";
import type { Cliente } from "../types/Cliente";

export function Clientes() {
  const { clientes, agregarCliente, editarCliente, eliminarCliente } = useClientes();
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [busqueda, setBusqueda] = useState("");

  function handleGuardar(datos: Omit<Cliente, "id">) {
    if (clienteEditando) {
      editarCliente(clienteEditando.id, datos);
      setClienteEditando(null);
    } else {
      agregarCliente(datos);
    }
  }

  function handleEliminar(id: string) {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este cliente?");
    if (confirmar) {
      eliminarCliente(id);
    }
  }

  const clientesFiltrados = clientes.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h1>Clientes</h1>

      <FormularioCliente
        clienteEditando={clienteEditando}
        onGuardar={handleGuardar}
        onCancelar={() => setClienteEditando(null)}
      />

      <input
        placeholder="Buscar cliente por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <ul>
        {clientesFiltrados.map((cliente) => (
          <li key={cliente.id}>
            {cliente.nombre} — {cliente.correo} — {cliente.telefono}
            <button onClick={() => setClienteEditando(cliente)}>Editar</button>
            <button onClick={() => handleEliminar(cliente.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}