import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import RoomImageCatalog from '../../utils/RoomImageCatalog.js'

const SERVICES = [
  { type: 'SPA', title: 'Spa', price: '$50', unit: 'cargo único por sesión', text: 'Sesión de spa y relajación durante tu estancia.' },
  { type: 'BREAKFAST', title: 'Desayuno', price: '$15', unit: 'por cada noche de la estancia', text: 'Desayuno diario servido cada mañana.' },
  { type: 'TRANSFER', title: 'Traslado', price: '$30', unit: 'cargo único por trayecto', text: 'Transporte entre el hotel y tu punto de llegada.' },
]

/**
 * Servicios adicionales que se pueden agregar a una reserva.
 */
function ServicesShowcase() {
  return (
    <Box component="section" aria-labelledby="services-title">
      <Typography id="services-title" variant="h2" sx={{ mb: 0.75 }}>
        Agrega servicios a tu estancia
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Puedes sumarlos desde la gestión de tu reserva, antes o después del check-in.
      </Typography>
      <Grid container spacing={3}>
        {SERVICES.map((service) => (
          <Grid key={service.type} size={{ xs: 12, md: 4 }}>
            <Stack direction={{ xs: 'row', md: 'column' }} spacing={2}>
              <Box
                component="img"
                src={RoomImageCatalog.forService(service.type)}
                alt=""
                loading="lazy"
                sx={{
                  width: { xs: 112, md: '100%' },
                  height: { xs: 112, md: 'auto' },
                  aspectRatio: { md: '16 / 10' },
                  objectFit: 'cover',
                  borderRadius: '10px',
                  flexShrink: 0,
                }}
              />
              <Box>
                <Typography variant="h4" component="h3">
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {service.text}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <Box component="span" sx={{ fontWeight: 800, fontSize: '1.125rem' }}>
                    {service.price}
                  </Box>{' '}
                  {service.unit}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ServicesShowcase
