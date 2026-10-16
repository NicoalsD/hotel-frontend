import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import BlockIcon from '@mui/icons-material/Block'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined'
import MoneyText from '../common/MoneyText.jsx'
import RoomImageCatalog from '../../utils/RoomImageCatalog.js'
import RoomTypeCatalog from '../../utils/RoomTypeCatalog.js'
import { tokens } from '../../theme/theme.js'

/**
 * Tarjeta horizontal de una habitación: fotografía, datos, disponibilidad y precio total de la estancia.
 * Las habitaciones no disponibles se muestran atenuadas y sin acción de reserva.
 * @param {Object} props
 * @param {import('../../models/RoomAvailability.js').default} props.room Resultado de disponibilidad.
 * @param {(room: import('../../models/RoomAvailability.js').default) => void} props.onSelect Se invoca al pulsar "Ver y reservar".
 */
function RoomResultCard({ room, onSelect }) {
  const titleId = `room-result-${room.roomId}`
  const TypeIcon = RoomTypeCatalog.find(room.type)?.icon
  const nightsLabel = `${room.nights} ${room.nights === 1 ? 'noche' : 'noches'}`

  return (
    <Card component="article" aria-labelledby={titleId} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, overflow: 'hidden' }}>
      <Box
        component="img"
        src={RoomImageCatalog.forRoom(room.type, room.roomId)}
        alt={`Fotografía de la habitación ${room.number}`}
        loading="lazy"
        sx={{
          width: { xs: '100%', md: 240 },
          aspectRatio: { xs: '16 / 9', md: 'auto' },
          minHeight: { md: 200 },
          objectFit: 'cover',
          display: 'block',
          flexShrink: 0,
          opacity: room.available ? 1 : 0.55,
          filter: room.available ? 'none' : 'grayscale(0.6)',
        }}
      />

      <Stack spacing={1.25} sx={{ p: { xs: 2.5, md: 3 }, flexGrow: 1, minWidth: 0 }}>
        <Typography id={titleId} variant="h4" component="h3">
          Habitación {room.number}
        </Typography>
        <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap', color: 'text.secondary', alignItems: 'center' }}>
          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
            {TypeIcon && <TypeIcon fontSize="small" aria-hidden="true" />}
            <Typography variant="body2">{room.typeLabel}</Typography>
          </Stack>
          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
            <LayersOutlinedIcon fontSize="small" aria-hidden="true" />
            <Typography variant="body2">Piso {room.floor}</Typography>
          </Stack>
          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
            <PersonOutlineIcon fontSize="small" aria-hidden="true" />
            <Typography variant="body2">
              Capacidad {room.capacity} {room.capacity === 1 ? 'persona' : 'personas'}
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {room.description}
        </Typography>
        <Box sx={{ pt: 0.5 }}>
          {room.available ? (
            <Stack
              direction="row"
              spacing={0.75}
              sx={{ alignItems: 'center', display: 'inline-flex', px: 1, py: 0.5, borderRadius: '6px', bgcolor: tokens.successSoft, color: tokens.success }}
            >
              <CheckCircleOutlinedIcon sx={{ fontSize: 18 }} aria-hidden="true" />
              <Typography variant="body2" component="span" sx={{ fontWeight: 700, color: 'inherit' }}>
                Disponible para tus fechas
              </Typography>
            </Stack>
          ) : (
            <Stack
              direction="row"
              spacing={0.75}
              sx={{ alignItems: 'center', display: 'inline-flex', px: 1, py: 0.5, borderRadius: '6px', bgcolor: tokens.dangerSoft, color: tokens.danger }}
            >
              <BlockIcon sx={{ fontSize: 18 }} aria-hidden="true" />
              <Typography variant="body2" component="span" sx={{ fontWeight: 700, color: 'inherit' }}>
                No disponible en estas fechas
              </Typography>
            </Stack>
          )}
        </Box>
      </Stack>

      <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
      <Divider sx={{ display: { xs: 'block', md: 'none' } }} />

      <Stack
        spacing={1}
        sx={{ p: { xs: 2.5, md: 3 }, width: { xs: '100%', md: 200 }, flexShrink: 0, textAlign: { md: 'right' }, justifyContent: 'space-between', alignItems: { md: 'flex-end' } }}
      >
        <Box>
          <Typography variant="body2" color="text.secondary">
            {nightsLabel}
          </Typography>
          <MoneyText
            value={room.estimatedTotal}
            component="p"
            sx={{ display: 'block', m: 0, fontWeight: 800, fontSize: '1.5rem', lineHeight: 1.2, color: 'text.primary', fontVariantNumeric: 'tabular-nums' }}
          />
          <Typography variant="caption" color="text.secondary" component="p" sx={{ m: 0 }}>
            IVA no incluido
          </Typography>
        </Box>
        <Button
          variant="contained"
          fullWidth
          disabled={!room.canBeBooked}
          onClick={() => onSelect(room)}
          aria-label={room.canBeBooked ? `Ver y reservar habitación ${room.number}` : `Habitación ${room.number} no disponible`}
          sx={{ maxWidth: { md: 200 } }}
        >
          {room.canBeBooked ? 'Ver y reservar' : 'No disponible'}
        </Button>
      </Stack>
    </Card>
  )
}

export default RoomResultCard
