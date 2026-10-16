# Arquitectura del frontend

Este documento describe la organización interna de la aplicación web del Sistema de Reservas de Hotel.

## Stack

- React 19 con Vite 8 (JavaScript, archivos `.jsx` y `.js`).
- Material UI v9 (`@mui/material` y `@mui/icons-material`) como única librería de componentes visuales.
- `react-router-dom` v7 para el enrutamiento en el cliente.
- `dayjs` para el manejo de fechas.

## Estructura de carpetas

```
src/
  main.jsx                  Punto de entrada: tema, CssBaseline y BrowserRouter
  App.jsx                   Definición de rutas
  theme/theme.js            Tema de Material UI
  config/AppConfig.js       Lectura de variables de entorno (VITE_API_BASE_URL)
  api/                      Cliente HTTP, errores y servicio de la API del hotel
  models/                   Clases de dominio que representan las respuestas del backend
  hooks/                    Hooks reutilizables (useAsync)
  utils/                    Utilidades: formato de moneda y fechas, validaciones, catálogos
  pages/                    Páginas asociadas a una ruta
  components/
    search/                 Búsqueda de disponibilidad
    booking/                Flujo de reserva y vista previa de precio
    reservation/            Consulta y gestión de reservas
    invoice/                Factura generada por el servidor
    common/                 Componentes genéricos (estados, mensajes, montos)
    layout/                 Encabezado, pie de página y contenedor de página
```

## Modelos como clases

Cada modelo vive en su propio archivo dentro de `src/models/`, tiene un constructor que recibe los campos planos, un método estático `fromJson(json)` que convierte la respuesta del backend en una instancia y, cuando aplica, getters de ayuda. Ejemplos:

- `Reservation`: `canCheckIn`, `canCheckOut`, `canAddServices`, `isFinished`.
- `PriceQuote`: `hasHighSeason`, `hasLowSeason`, `averageNightlyPrice`.
- `NightlyRate`: `isHighSeason`.

Modelos disponibles: `Room`, `RoomAvailability`, `Guest`, `PriceQuote`, `NightlyRate`, `Reservation`, `AdditionalService`, `ServiceCatalogItem`, `DigitalKey`, `Invoice` e `InvoiceLine`.

## HotelApiService

`src/api/HotelApiService.js` es la única puerta de acceso al backend. Recibe un `HttpClient` y expone métodos de alto nivel que devuelven instancias de modelos:

| Método | Descripción |
| --- | --- |
| `searchAvailability(checkIn, checkOut, roomType)` | Disponibilidad por fechas y tipo |
| `getPriceQuote(roomType, checkIn, checkOut)` | Cotización de precio |
| `listRooms()` | Habitaciones con su estado |
| `createReservation(request)` | Crea una reserva |
| `getReservation(id)` / `listReservations()` | Consulta de reservas |
| `addService(id, serviceType)` / `getServiceCatalog()` | Servicios adicionales |
| `checkIn(id)` / `checkOut(id)` | Check-in y check-out |
| `getInvoice(id)` | Factura de una reserva finalizada |

La instancia compartida se exporta desde `src/api/hotelApiInstance.js`. `HttpClient` usa `fetch`, serializa JSON y lanza `ApiError` (con `status` y `path`) cuando la respuesta no es exitosa. Los componentes nunca escriben la URL del backend directamente.

## Rutas

| Ruta | Página | Descripción |
| --- | --- | --- |
| `/` | `HomePage` | Inicio y búsqueda rápida |
| `/buscar` | `SearchPage` | Disponibilidad; fechas y tipo viven en la URL |
| `/reservar/:roomId` | `BookingPage` | Flujo de reserva para una habitación |
| `/reservas` | `ReservationsPage` | Buscador por código y listado de reservas |
| `/reservas/:reservationId` | `ReservationDetailPage` | Gestión: servicios, check-in, check-out y llave digital |
| `/reservas/:reservationId/factura` | `InvoicePage` | Factura de la reserva |
| `*` | `NotFoundPage` | Ruta no encontrada |

## Flujo de datos

Las páginas consultan datos con el hook `useAsync`, que expone `data`, `loading`, `error` y `execute`. Los componentes reciben datos y callbacks por props y no conocen la capa HTTP.
