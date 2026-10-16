import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer.jsx'
import RoomTypeCatalog from '../utils/RoomTypeCatalog.js'

/**
 * Página de inicio con una presentación del hotel, los tipos de habitación y la búsqueda.
 */
function HomePage() {
  const roomTypes = RoomTypeCatalog.all()

  return (
    <PageContainer>
      <Box
        component="section"
        aria-labelledby="hero-title"
        sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 3, p: { xs: 4, md: 8 }, mb: 6 }}
      >
        <Stack spacing={2} sx={{ maxWidth: 640 }}>
          <Typography variant="overline" sx={{ letterSpacing: 2, color: 'secondary.light' }}>
            Bienvenido
          </Typography>
          <Typography variant="h3" component="h1" id="hero-title">
            Tu estadía perfecta comienza aquí
          </Typography>
          <Typography variant="h6" component="p" sx={{ fontWeight: 400, opacity: 0.9 }}>
            Reserva habitaciones sencillas, dobles o suites en pocos pasos. Consulta disponibilidad y tarifas
            antes de confirmar.
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/buscar"
              startIcon={<SearchIcon />}
            >
              Buscar disponibilidad
            </Button>
          </Box>
        </Stack>
      </Box>

      <Stack component="section" aria-labelledby="room-types-title" spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h4" component="h2" id="room-types-title">
          Nuestras habitaciones
        </Typography>
        <Typography color="text.secondary">Elige el tipo que mejor se adapte a tu viaje.</Typography>
      </Stack>

      <Grid container spacing={3}>
        {roomTypes.map((roomType) => {
          const RoomIcon = roomType.icon
          return (
            <Grid key={roomType.type} size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack spacing={2}>
                    <RoomIcon color="primary" sx={{ fontSize: 48 }} aria-hidden="true" />
                    <Typography variant="h5" component="h3">
                      {roomType.label}
                    </Typography>
                    <Typography color="text.secondary">{roomType.description}</Typography>
                  </Stack>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    size="small"
                    component={RouterLink}
                    to={`/buscar?roomType=${roomType.type}`}
                    aria-label={`Ver disponibilidad de habitaciones ${roomType.label}`}
                  >
                    Ver disponibilidad
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </PageContainer>
  )
}

export default HomePage
