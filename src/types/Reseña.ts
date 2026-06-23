export interface Resena {
  id: string;
  nombreCliente: string;
  calificacion: number;
  comentario: string;
  fecha: string;
  visible: "visible" | "oculto" | "pendiente";
}