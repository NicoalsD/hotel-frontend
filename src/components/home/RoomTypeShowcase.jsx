import PersonOutline from '@mui/icons-material/PersonOutlined'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'
import MoneyText from '../common/MoneyText.jsx'
import RoomImageCatalog from '../../utils/RoomImageCatalog.js'
import RoomTypeCatalog from '../../utils/RoomTypeCatalog.js'

/**
 * Tarjetas con fotografía de los tres tipos de habitación del hotel.
 */
function RoomTypeShowcase() {
  return (
    <Box component="section" aria-labelledby="room-types-title">
      <Typography id="room-types-title" variant="h2" sx={{ mb: 0.75 }}>
        Elige tu habitación
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        16 habitaciones en tres categorías. El precio final depende de la temporada de cada noche.
      </Typography>
      <Grid container spacing={3}>
        {RoomTypeCatalog.all().map((roomType) => (
          <Grid key={roomType.type} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ height: '100%', overflow: 'hidden', transition: 'box-shadow 200ms ease-out', '&:hover': { boxShadow: '0 8px 24px rgba(11,39,71,0.14)' } }}>
              <CardActionArea
                component={RouterLink}
                to={`/buscar?roomType=${roomType.type}`}
                aria-label={`Ver disponibilidad de habitaciones ${roomType.label}`}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
              >
                <Box
                  component="img"
                  src={RoomImageCatalog.forRoom(roomType.type, 0)}
                  alt={`Habitación ${roomType.label.toLowerCase()} del hotel`}
                  loading="lazy"
                  sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block' }}
                />
                <Stack spacing={1} sx={{ p: 2.5, flexGrow: 1 }}>
                  <Typography variant="h3" component="h3">
                    {roomType.label}
                  </Typography>
                  <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center', color: 'text.secondary' }}>
                    <PersonOutline fontSize="small" aria-hidden="true" />
                    <Typography variant="body2">
                      Hasta {roomType.capacity} {roomType.capacity === 1 ? 'persona' : 'personas'}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                    {roomType.description}
                  </Typography>
                  <Typography variant="body2" sx={{ pt: 1 }}>
                    Desde{' '}
                    <MoneyText value={roomType.basePrice} sx={{ fontWeight: 800, fontSize: '1.25rem', color: 'text.primary' }} />{' '}
                    por noche
                  </Typography>
                </Stack>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default RoomTypeShowcase
