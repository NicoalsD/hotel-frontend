# Componentes

Catálogo de los componentes de `src/components/`. Cada carpeta agrupa un flujo o una responsabilidad. Los componentes son funciones de React con un solo componente por archivo.

## Búsqueda (`components/search/`)

- **SearchForm**: formulario de fechas de entrada y salida. Valida el rango con `validateDates` y muestra los mensajes en español.
- **RoomTypeFilter**: selector del tipo de habitación; el valor vacío significa todos los tipos.
- **AvailabilitySummary**: resume el rango de fechas, las noches y la cantidad de habitaciones disponibles.
- **AvailabilityLegend**: explica los estados de disponibilidad de las tarjetas.
- **RoomCard**: tarjeta de una habitación con su disponibilidad, noches y total estimado. Emite `onSelect`.
- **RoomGrid**: cuadrícula con todas las habitaciones consultadas.

## Reserva (`components/booking/`)

- **BookingStepper**: indicador de progreso con los pasos Habitación, Datos del huésped y Confirmación.
- **SelectedRoomCard**: resumen de la habitación elegida para reservar.
- **PricePreview**: vista previa de precio con noches, chips de temporada alta y baja, desglose por noche y total estimado. Muestra `LoadingState` mientras calcula y `ErrorAlert` con reintento si falla.
- **NightlyRatesTable**: tabla con el precio de cada noche y su temporada.
- **GuestForm**: formulario controlado de nombre, documento, teléfono y correo. La validación la realiza `BookingPage` con `GuestValidator`.
- **ReservationSuccessDialog**: diálogo que confirma la reserva creada y muestra su código.

## Gestión de reservas (`components/reservation/`)

- **ReservationLookup**: buscador por código con el formato `RES-n`. Al encontrar la reserva navega a su gestión.
- **ReservationList**: tabla con todas las reservas, de la más reciente a la más antigua.
- **ReservationSummary**: resumen de fechas, noches, habitación y totales.
- **GuestInfoCard**: datos del huésped titular.
- **StayActions**: botones de check-in y check-out, cada uno con confirmación previa.
- **ConfirmActionDialog**: diálogo genérico de confirmación para acciones irreversibles.
- **DigitalKeyCard**: tarjeta con la llave digital emitida en el check-in.
- **ServicesPanel**: panel que combina el catálogo y los servicios ya agregados para una reserva activa.
- **ServiceCatalogList**: lista del catálogo con un botón para agregar cada servicio.
- **AddedServicesTable**: tabla de los servicios ya agregados a la reserva.
