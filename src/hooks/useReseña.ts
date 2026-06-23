import { useState, useEffect } from "react";
import type { Resena } from "../types/Reseña";

const STORAGE_KEY = "resenas";

export function useResenas() {
  const [resenas, setResenas] = useState<Resena[]>([]);

  useEffect(() => {
    const guardadas = localStorage.getItem(STORAGE_KEY);
    if (guardadas) {
      setResenas(JSON.parse(guardadas));
    }
  }, []);

  function guardarEnStorage(nuevaLista: Resena[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevaLista));
    setResenas(nuevaLista);
  }

  function agregarResena(resena: Omit<Resena, "id">) {
    const nuevaResena: Resena = { ...resena, id: crypto.randomUUID() };
    guardarEnStorage([...resenas, nuevaResena]);
  }

  function editarResena(id: string, datosActualizados: Omit<Resena, "id">) {
    const nuevaLista = resenas.map((r) =>
      r.id === id ? { ...datosActualizados, id } : r
    );
    guardarEnStorage(nuevaLista);
  }

  function eliminarResena(id: string) {
    const nuevaLista = resenas.filter((r) => r.id !== id);
    guardarEnStorage(nuevaLista);
  }

  function obtenerResenaPorId(id: string) {
    return resenas.find((r) => r.id === id);
  }

  return { resenas, agregarResena, editarResena, eliminarResena, obtenerResenaPorId };
}