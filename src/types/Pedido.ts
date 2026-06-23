export interface Pedido {
  id: string;
  nombreCliente: string;
  tipoIlustracion: "fanart" | "ilustracion de personaje" | "retrato" | "diseño para empresa";
  descripcion: string;
  precioBase: number;
  tiempoEstimado: string;
  categoria: string;
  estado: "pendiente" | "en proceso" | "finalizado";
  fechaHora: string;
  comentario: string;
}