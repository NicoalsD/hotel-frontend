import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import RoomTypeCatalog from '../../utils/RoomTypeCatalog.js'
import MoneyText from '../common/MoneyText.jsx'

/**
 * Tarjeta con el resumen de la habitación seleccionada para la reserva.
 * @param {Object} props
 * @param {import('../../models/Room.js').default} props.room Habitación seleccionada.
 */
function SelectedRoomCard({ room }) {
  const catalogEntry = RoomTypeCatalog.find(room.type)
  const Icon = catalogEntry?.icon

  return (
    <Card variant="outlined" component="section" aria-labelledby="selected-room-title">
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          {Icon && <Icon aria-hidden="true" color="primary" sx={{ fontSize: 40 }} />}
          <Stack>
            <Typography variant="h6" component="h2" id="selected-room-title">
              Habitación {room.number}
            </Typography>
            <Typography color="text.secondary">{room.typeLabel}</Typography>
          </Stack>
        </Stack>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {room.description}
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mb: 2 }}>
          <Chip size="small" label={`Piso ${room.floor}`} />
          <Chip size="small" label={`Capacidad: ${room.capacity}`} />
        </Stack>
        <Typography>
          Precio base por noche: <MoneyText value={room.basePrice} sx={{ fontWeight: 600 }} />
        </Typography>
      </CardContent>
    </Card>
  )
}

export default SelectedRoomCard
