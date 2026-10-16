import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import DateFormatter from '../../utils/DateFormatter.js'
import RoomImageCatalog from '../../utils/RoomImageCatalog.js'
import RoomTypeCatalog from '../../utils/RoomTypeCatalog.js'

/**
 * Tarjeta con la fotografía de la habitación y los datos principales de la estadía.
 * @param {Object} props
 * @param {import('../../models/Reservation.js').default} props.reservation Reserva en gestión.
 */
function StayOverviewCard({ reservation }) {
  const { room, guest } = reservation
  const typeLabel = room ? RoomTypeCatalog.label(room.type) : null
  const nightsLabel = `${reservation.nights} ${reservation.nights === 1 ? 'noche' : 'noches'}`
  const details = [
    { label: 'Entrada', value: DateFormatter.format(reservation.checkIn) },
    { label: 'Salida', value: DateFormatter.format(reservation.checkOut) },
    { label: 'Noches', value: nightsLabel },
    { label: 'Huésped', value: guest?.fullName ?? 'No disponible' },
  ]

  return (
    <Card component="section" aria-labelledby="estadia-reserva">
      <Stack direction={{ xs: 'column', md: 'row' }}>
        {room && (
          <Box
            component="img"
            src={RoomImageCatalog.forRoom(room.type, room.id)}
            alt={`Habitación ${room.number}, tipo ${typeLabel.toLowerCase()}`}
            sx={{
              width: { xs: '100%', md: 200 },
              aspectRatio: { xs: '16 / 9', md: 'auto' },
              minHeight: { md: 180 },
              objectFit: 'cover',
              display: 'block',
              flexShrink: 0,
            }}
          />
        )}
        <CardContent sx={{ flex: 1, p: { xs: 2.5, md: 3 } }}>
          <Stack spacing={2.5}>
            <Box>
              <Typography id="estadia-reserva" variant="h4" component="h2">
                {room ? `Habitación ${room.number}` : 'Habitación sin asignar'}
              </Typography>
              {room && (
                <Typography color="text.secondary">
                  {typeLabel} · Hasta {room.capacity} {room.capacity === 1 ? 'persona' : 'personas'}
                </Typography>
              )}
            </Box>
            <Box component="dl" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' }, gap: 2, m: 0 }}>
              {details.map((detail) => (
                <Box component="div" key={detail.label}>
                  <Typography component="dt" variant="body2" color="text.secondary">
                    {detail.label}
                  </Typography>
                  <Typography component="dd" sx={{ m: 0, fontWeight: 700 }}>
                    {detail.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  )
}

export default StayOverviewCard
