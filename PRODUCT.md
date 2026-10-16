# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- Huéspedes que buscan una habitación por fechas, comparan el precio y reservan con sus datos personales.
- Personal de recepción que gestiona la reserva: agrega servicios, hace el check-in (entrega la llave digital), el check-out y consulta la factura final.

## Product Purpose
Sistema de reservas de **Hotel Reservas UCC**: disponibilidad por fechas y tipo de habitación, tarifa dinámica por temporada, servicios adicionales, llave digital simulada y facturación generada por el servidor. Proyecto académico; el éxito es que el flujo completo (buscar, reservar, gestionar, facturar) se pueda recorrer sin ayuda.

## Positioning
El precio se calcula noche por noche según la temporada (alta = tarifa base x1.5 en enero, junio, julio y diciembre), y el sitio lo muestra antes de reservar.

## Operating Context
- Frontend React + MUI desplegado en Vercel; backend Spring Boot en AWS Elastic Beanstalk, accesible mediante `/api`.
- 16 habitaciones: 6 sencillas ($80), 6 dobles ($120), 4 suites ($250). Servicios: spa $50, desayuno $15 por noche, traslado $30. IVA 19% en la factura.

## Capabilities and Constraints
- Toda la interfaz visible en español; el código en inglés.
- Usar componentes existentes de MUI.
- No hay cuentas de usuario ni pagos en línea; la reserva se gestiona con su código (RES-xxxx).

## Brand Commitments
- Nombre: Hotel Reservas UCC.
- Referencias de nivel de acabado: Booking.com y Airbnb (estándar de la categoría ejecutado con fidelidad).
- Prohibido: emojis, degradados y tarjetas con borde de color a la izquierda.

## Evidence on Hand
- Fotografías de stock de Unsplash en `public/images/` (origen en `docs/IMAGENES.md`).
- No existen reseñas, puntuaciones ni testimonios reales: no se deben inventar.

## Product Principles
- El precio nunca sorprende: se ve el desglose por noche antes de confirmar.
- Cada estado de la reserva deja claro qué acción sigue.
- Lo que muestra la factura viene del servidor, no se recalcula en el cliente.
