import { useState, useEffect } from "react";
import type { Cliente } from "../types/Cliente";

const STORAGE_KEY = "clientes";

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const guardados = localStorage.getItem(STORAGE_KEY);
    if (guardados) {
      setClientes(JSON.parse(guardados));
    }
  }, []);

  function guardarEnStorage(nuevaLista: Cliente[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevaLista));
    setClientes(nuevaLista);
  }

  function agregarCliente(cliente: Omit<Cliente, "id">) {
    const nuevoCliente: Cliente = { ...cliente, id: crypto.randomUUID() };
    guardarEnStorage([...clientes, nuevoCliente]);
  }

  function editarCliente(id: string, datosActualizados: Omit<Cliente, "id">) {
    const nuevaLista = clientes.map((c) =>
      c.id === id ? { ...datosActualizados, id } : c
    );
    guardarEnStorage(nuevaLista);
  }

  function eliminarCliente(id: string) {
    const nuevaLista = clientes.filter((c) => c.id !== id);
    guardarEnStorage(nuevaLista);
  }

  return { clientes, agregarCliente, editarCliente, eliminarCliente };
}
