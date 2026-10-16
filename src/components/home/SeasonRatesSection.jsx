import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import SeasonStrip from '../common/SeasonStrip.jsx'
import { tokens } from '../../theme/theme.js'

const FACTS = [
  { value: 'x1.5', label: 'sobre la tarifa base en enero, junio, julio y diciembre' },
  { value: 'Por noche', label: 'cada noche se cobra según la temporada de su fecha' },
  { value: 'IVA 19%', label: 'se suma en la factura final al hacer el check-out' },
]

/**
 * Explicación de las tarifas por temporada con la franja de los doce meses.
 */
function SeasonRatesSection() {
  return (
    <Box component="section" aria-labelledby="season-title" sx={{ bgcolor: tokens.ground, borderRadius: '12px', p: { xs: 3, md: 5 } }}>
      <Grid container spacing={{ xs: 4, md: 6 }} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography id="season-title" variant="h2" sx={{ mb: 1.5 }}>
            Tarifas según la temporada
          </Typography>
          <Typography color="text.secondary">
            Antes de reservar ves el precio de cada noche. Si tu estancia cruza de un mes a otro, el total combina las dos
            tarifas.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={3}>
            <SeasonStrip />
            <Box component="dl" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, m: 0 }}>
              {FACTS.map((fact) => (
                <Box key={fact.value}>
                  <Typography component="dt" sx={{ fontWeight: 800, fontSize: '1.25rem', color: tokens.navy }}>
                    {fact.value}
                  </Typography>
                  <Typography component="dd" variant="body2" color="text.secondary" sx={{ m: 0 }}>
                    {fact.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SeasonRatesSection
