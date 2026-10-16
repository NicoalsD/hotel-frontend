# Componentes

Catálogo de los componentes de `src/components/`. Cada carpeta agrupa un flujo o una responsabilidad. Los componentes son funciones de React con un solo componente por archivo.

## Búsqueda (`components/search/`)

- **SearchForm**: formulario de fechas de entrada y salida. Valida el rango con `validateDates` y muestra los mensajes en español.
- **RoomTypeFilter**: selector del tipo de habitación; el valor vacío significa todos los tipos.
- **AvailabilitySummary**: resume el rango de fechas, las noches y la cantidad de habitaciones disponibles.
- **AvailabilityLegend**: explica los estados de disponibilidad de las tarjetas.
- **RoomCard**: tarjeta de una habitación con su disponibilidad, noches y total estimado. Emite `onSelect`.
- **RoomGrid**: cuadrícula con todas las habitaciones consultadas.
