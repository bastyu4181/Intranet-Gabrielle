Funcionalidades

Autenticación


Login simulado con correo y contraseña
Sesión persistente en localStorage
Rutas protegidas: si no hay sesión iniciada, redirige automáticamente a /login


Credenciales de prueba:


Correo: gabrielle@studio.com
Contraseña: 1234


Navegación


Barra de navegación (NavBar) visible en todas las pantallas internas, con acceso directo a Dashboard, Clientes, Pedidos y Reseñas, además de cierre de sesión


Dashboard


Resumen general: total de clientes, total de pedidos, desglose de pedidos por estado (pendientes, en proceso, finalizados) y total de reseñas


Módulo de Clientes (CRUD)


Registrar nuevo cliente (nombre, correo, teléfono)
Validación de teléfono: solo acepta números, bloquea letras y símbolos mientras se escribe
Listar clientes
Buscar cliente por nombre (incluye búsqueda automática al llegar desde el detalle de un pedido)
Editar cliente existente
Eliminar cliente (con confirmación)


Módulo de Pedidos (CRUD)


Registrar nuevo pedido: nombre del cliente, tipo de ilustración (fanart, ilustración de personaje, retrato, diseño para empresa), descripción, precio base, tiempo estimado, categoría, estado, fecha y hora, comentario
Validación de relación con Clientes: el pedido solo se guarda si el nombre del cliente coincide con uno ya registrado en el módulo de Clientes
Listar pedidos
Filtrar pedidos por estado (pendiente / en proceso / finalizado)
Vista de detalle individual por pedido (ruta dinámica /pedidos/:id), con link directo al cliente asociado
Editar pedido existente
Eliminar pedido (con confirmación)


Módulo de Reseñas (CRUD)


Registrar nueva reseña: nombre del cliente, calificación, comentario, fecha, visibilidad (visible / oculto / pendiente)
Listar reseñas
Filtrar reseñas por visibilidad
Vista de detalle individual por reseña (ruta dinámica /resenas/:id)
Editar reseña existente
Eliminar reseña (con confirmación)


Estructura del proyecto

src/
  components/     → Componentes reutilizables (formularios, NavBar, rutas protegidas)
  pages/          → Pantallas completas (Login, Dashboard, Clientes, Pedidos, PedidoDetalle, Resenas, ResenaDetalle)
  context/        → AuthContext (manejo de sesión global)
  hooks/          → Hooks personalizados (useClientes, usePedidos, useResenas)
  types/          → Interfaces de TypeScript (Cliente, Pedido, Resena, Usuario)

Cómo correr el proyecto localmente

bashgit clone https://github.com/bastyu4181/Intranet-Gabrielle.git
cd Intranet-Gabrielle
npm install
npm run dev
