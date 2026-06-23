import { useState, useEffect } from "react";
import type { Pedido } from "../types/Pedido";

const STORAGE_KEY = "pedidos";

export function usePedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const guardados = localStorage.getItem(STORAGE_KEY);
    if (guardados) {
      setPedidos(JSON.parse(guardados));
    }
  }, []);

  function guardarEnStorage(nuevaLista: Pedido[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevaLista));
    setPedidos(nuevaLista);
  }

  function agregarPedido(pedido: Omit<Pedido, "id">) {
    const nuevoPedido: Pedido = { ...pedido, id: crypto.randomUUID() };
    guardarEnStorage([...pedidos, nuevoPedido]);
  }

  function editarPedido(id: string, datosActualizados: Omit<Pedido, "id">) {
    const nuevaLista = pedidos.map((p) =>
      p.id === id ? { ...datosActualizados, id } : p
    );
    guardarEnStorage(nuevaLista);
  }

  function eliminarPedido(id: string) {
    const nuevaLista = pedidos.filter((p) => p.id !== id);
    guardarEnStorage(nuevaLista);
  }

  function obtenerPedidoPorId(id: string) {
    return pedidos.find((p) => p.id === id);
  }

  return { pedidos, agregarPedido, editarPedido, eliminarPedido, obtenerPedidoPorId };
}
