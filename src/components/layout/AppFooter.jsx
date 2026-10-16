import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'
import BrandMark from '../brand/BrandMark.jsx'
import { tokens } from '../../theme/theme.js'

const CURRENT_YEAR = new Date().getFullYear()

const COLUMNS = [
  {
    title: 'Reservar',
    links: [
      { label: 'Buscar habitaciones', to: '/buscar' },
      { label: 'Habitaciones sencillas', to: '/buscar?roomType=SINGLE' },
      { label: 'Habitaciones dobles', to: '/buscar?roomType=DOUBLE' },
      { label: 'Suites', to: '/buscar?roomType=SUITE' },
    ],
  },
  {
    title: 'Tu estancia',
    links: [
      { label: 'Mis reservas', to: '/reservas' },
      { label: 'Check-in y llave digital', to: '/reservas' },
      { label: 'Factura de la estancia', to: '/reservas' },
    ],
  },
]

/**
 * Pie de página con accesos rápidos y datos del proyecto.
 */
function AppFooter() {
  return (
    <Box component="footer" className="no-print" sx={{ mt: 'auto', bgcolor: tokens.navyDark, color: 'rgba(255,255,255,0.78)' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 6 } }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2} sx={{ maxWidth: 360 }}>
              <BrandMark />
              <Typography variant="body2">
                Sistema de reservas del hotel: disponibilidad por fechas, tarifas por temporada, servicios adicionales,
                llave digital y facturación.
              </Typography>
            </Stack>
          </Grid>
          {COLUMNS.map((column) => (
            <Grid key={column.title} size={{ xs: 6, md: 3 }}>
              <Typography component="h2" variant="subtitle2" sx={{ color: tokens.white, mb: 1.5 }}>
                {column.title}
              </Typography>
              <Stack component="ul" spacing={1} sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link component={RouterLink} to={link.to} sx={{ color: 'inherit', fontWeight: 500, fontSize: '0.875rem' }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Typography variant="caption" component="p" sx={{ mt: 5, pt: 3, borderTop: '1px solid rgba(255,255,255,0.14)' }}>
          © {CURRENT_YEAR} Hotel Reservas UCC. Proyecto académico. Fotografías de Unsplash.
        </Typography>
      </Container>
    </Box>
  )
}

export default AppFooter
