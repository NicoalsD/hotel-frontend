import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import DateFormatter from '../../utils/DateFormatter.js'

/**
 * Resumen de la búsqueda: rango de fechas, noches y cantidad de habitaciones disponibles.
 * @param {Object} props
 * @param {string} props.checkIn Fecha de entrada (YYYY-MM-DD).
 * @param {string} props.checkOut Fecha de salida (YYYY-MM-DD).
 * @param {Array<import('../../models/RoomAvailability.js').default>} props.rooms Habitaciones consultadas.
 */
function AvailabilitySummary({ checkIn, checkOut, rooms }) {
  const nights = DateFormatter.nightsBetween(checkIn, checkOut)
  const availableCount = rooms.filter((room) => room.available).length

  return (
    <Stack spacing={0.5}>
      <Typography variant="h6" component="h2">
        {DateFormatter.format(checkIn)} - {DateFormatter.format(checkOut)}
      </Typography>
      <Typography color="text.secondary">
        {nights} {nights === 1 ? 'noche' : 'noches'} · {availableCount} de {rooms.length} habitaciones disponibles
      </Typography>
    </Stack>
  )
}

export default AvailabilitySummary
