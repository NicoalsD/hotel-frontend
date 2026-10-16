import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

/**
 * Leyenda que explica los estados de disponibilidad de las tarjetas.
 */
function AvailabilityLegend() {
  return (
    <Stack direction="row" alignItems="center" flexWrap="wrap" useFlexGap spacing={1.5} aria-label="Leyenda de disponibilidad">
      <Chip size="small" label="Disponible" color="success" />
      <Typography variant="body2" color="text.secondary">
        Puedes reservarla con el botón Seleccionar.
      </Typography>
      <Chip size="small" label="No disponible" variant="outlined" />
      <Typography variant="body2" color="text.secondary">
        Ya tiene una reserva en las fechas elegidas.
      </Typography>
    </Stack>
  )
}

export default AvailabilityLegend
