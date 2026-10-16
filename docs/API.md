# API consumida

El frontend consume la API REST del backend bajo el prefijo `/api/hotel`. Todas las llamadas se realizan a través de `HotelApiService`. Las fechas usan el formato `YYYY-MM-DD` y los identificadores de reserva tienen la forma `RES-n`.

| Método | Ruta | Método del servicio | Uso |
| --- | --- | --- | --- |
| GET | `/api/hotel/disponibilidad?checkIn&checkOut&roomType` | `searchAvailability` | Disponibilidad de habitaciones |
| GET | `/api/hotel/tarifa?roomType&checkIn&checkOut` | `getPriceQuote` | Cotización de precio por noche y total |
| GET | `/api/hotel/habitaciones` | `listRooms` | Habitaciones con su estado |
| POST | `/api/hotel/reservar` | `createReservation` | Crea una reserva con habitación, fechas y huésped |
| GET | `/api/hotel/reserva/{id}` | `getReservation` | Detalle de una reserva |
| GET | `/api/hotel/reservas` | `listReservations` | Listado de reservas |
| GET | `/api/hotel/servicios/catalogo` | `getServiceCatalog` | Catálogo de servicios adicionales |
| POST | `/api/hotel/servicios/{id}` | `addService` | Agrega un servicio (SPA, BREAKFAST o TRANSFER) |
| PUT | `/api/hotel/checkin/{id}` | `checkIn` | Check-in y emisión de la llave digital |
| PUT | `/api/hotel/checkout/{id}` | `checkOut` | Check-out de la reserva |
| GET | `/api/hotel/factura/{id}` | `getInvoice` | Factura de una reserva finalizada |

## Manejo de errores

`HttpClient` lanza un `ApiError` con los campos `status` y `path` cuando la respuesta no es exitosa. Las páginas muestran el mensaje mediante `ErrorAlert`, que permite reintentar la operación.

## Cuerpo de la reserva

```json
{
  "roomId": 1,
  "checkIn": "2026-10-20",
  "checkOut": "2026-10-23",
  "guest": { "fullName": "...", "documentNumber": "...", "email": "...", "phone": "..." }
}
```

## Cuerpo para agregar un servicio

```json
{ "serviceType": "SPA" }
```
