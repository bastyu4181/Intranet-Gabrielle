import { useState, useEffect } from "react";
import type { Comision } from "../types/Comision";

const STORAGE_KEY = "comisiones";

export function useComisiones() {
  const [comisiones, setComisiones] = useState<Comision[]>([]);

  useEffect(() => {
    const guardadas = localStorage.getItem(STORAGE_KEY);
    if (guardadas) {
      setComisiones(JSON.parse(guardadas));
    }
  }, []);

  function guardarEnStorage(nuevaLista: Comision[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevaLista));
    setComisiones(nuevaLista);
  }

  function agregarComision(comision: Omit<Comision, "id">) {
    const nuevaComision: Comision = { ...comision, id: crypto.randomUUID() };
    guardarEnStorage([...comisiones, nuevaComision]);
  }

  function editarComision(id: string, datosActualizados: Omit<Comision, "id">) {
    const nuevaLista = comisiones.map((c) =>
      c.id === id ? { ...datosActualizados, id } : c
    );
    guardarEnStorage(nuevaLista);
  }

  function eliminarComision(id: string) {
    const nuevaLista = comisiones.filter((c) => c.id !== id);
    guardarEnStorage(nuevaLista);
  }

  function obtenerComisionPorId(id: string) {
    return comisiones.find((c) => c.id === id);
  }

  return {
    comisiones,
    agregarComision,
    editarComision,
    eliminarComision,
    obtenerComisionPorId,
  };
}