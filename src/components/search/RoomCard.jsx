import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import MoneyText from '../common/MoneyText.jsx'
import RoomTypeCatalog from '../../utils/RoomTypeCatalog.js'

/**
 * Tarjeta de una habitación con su disponibilidad, noches y total estimado.
 * @param {Object} props
 * @param {import('../../models/RoomAvailability.js').default} props.room Resultado de disponibilidad.
 * @param {(room: import('../../models/RoomAvailability.js').default) => void} props.onSelect Se invoca al pulsar "Seleccionar".
 */
function RoomCard({ room, onSelect }) {
  const titleId = `room-card-${room.roomId}`
  const TypeIcon = RoomTypeCatalog.find(room.type)?.icon

  return (
    <Card variant="outlined" component="article" aria-labelledby={titleId} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <Typography id={titleId} variant="h6" component="h3">
            Habitación {room.number}
          </Typography>
          <Chip
            size="small"
            label={room.availabilityLabel}
            color={room.available ? 'success' : 'default'}
            variant={room.available ? 'filled' : 'outlined'}
          />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1, color: 'text.secondary' }}>
          {TypeIcon && <TypeIcon fontSize="small" aria-hidden="true" />}
          <Typography variant="body2">
            {room.typeLabel} · Piso {room.floor} · Capacidad {room.capacity}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ mt: 1.5 }}>
          {room.description}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Stack spacing={0.5}>
          <Typography variant="body2">Noches: {room.nights}</Typography>
          <Typography variant="body2">
            Total estimado: <MoneyText value={room.estimatedTotal} sx={{ fontWeight: 700 }} />
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          disabled={!room.canBeBooked}
          onClick={() => onSelect(room)}
          aria-label={`Seleccionar habitación ${room.number}`}
        >
          Seleccionar
        </Button>
      </CardActions>
    </Card>
  )
}

export default RoomCard
