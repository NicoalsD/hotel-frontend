import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import DateFormatter from '../../utils/DateFormatter.js'
import RoomImageCatalog from '../../utils/RoomImageCatalog.js'
import { tokens } from '../../theme/theme.js'

/**
 * Fila etiqueta-valor del resumen (entrada, salida).
 * @param {Object} props
 * @param {string} props.label Etiqueta de la fila.
 * @param {string} props.value Valor a mostrar.
 */
function SummaryRow({ label, value }) {
  return (
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right' }}>
        {value}
      </Typography>
    </Stack>
  )
}

/**
 * Resumen de la reserva: fotografía de la habitación, fechas y precio.
 * @param {Object} props
 * @param {import('../../models/Room.js').default} props.room Habitación seleccionada.
 * @param {string} props.checkIn Fecha de entrada (YYYY-MM-DD) o vacía.
 * @param {string} props.checkOut Fecha de salida (YYYY-MM-DD) o vacía.
 */
function PriceSummaryCard({ room, checkIn, checkOut }) {
  return (
    <Card component="section" aria-labelledby="price-summary-title" sx={{ boxShadow: tokens.shadow, overflow: 'hidden' }}>
      <Box
        component="img"
        src={RoomImageCatalog.forRoom(room.type, room.id)}
        alt={`Fotografía de la habitación ${room.number}`}
        loading="lazy"
        sx={{ display: 'block', width: '100%', aspectRatio: '16 / 9', objectFit: 'cover' }}
      />
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack spacing={0.5}>
          <Typography variant="h3" component="h2" id="price-summary-title">
            Habitación {room.number}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {room.typeLabel} · Hasta {room.capacity} {room.capacity === 1 ? 'persona' : 'personas'}
          </Typography>
        </Stack>
        <Divider sx={{ my: 2.5 }} />
        <Stack spacing={1.25}>
          <SummaryRow label="Entrada" value={checkIn ? DateFormatter.format(checkIn) : 'Sin definir'} />
          <SummaryRow label="Salida" value={checkOut ? DateFormatter.format(checkOut) : 'Sin definir'} />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PriceSummaryCard
