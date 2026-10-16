import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import StaySeasonSection from './StaySeasonSection.jsx'

/**
 * Sección "Tu estancia": campos de entrada y salida con sus errores y la franja de temporadas.
 * La validación la realiza el padre; este componente solo muestra los mensajes.
 * @param {Object} props
 * @param {string} props.checkIn Fecha de entrada (YYYY-MM-DD) o vacía.
 * @param {string} props.checkOut Fecha de salida (YYYY-MM-DD) o vacía.
 * @param {{checkIn?: string, checkOut?: string}} props.errors Errores de validación de fechas.
 * @param {(field: 'checkIn'|'checkOut', value: string) => void} props.onDateChange Cambio de una fecha.
 */
function StayDatesSection({ checkIn, checkOut, errors, onDateChange }) {
  return (
    <Paper variant="outlined" component="section" aria-labelledby="stay-dates-title" sx={{ p: { xs: 2.5, md: 3 } }}>
      <Stack spacing={2.5}>
        <Typography id="stay-dates-title" variant="h3" component="h2">
          Tu estancia
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="date"
              label="Entrada"
              value={checkIn}
              onChange={(event) => onDateChange('checkIn', event.target.value)}
              error={Boolean(errors.checkIn)}
              helperText={errors.checkIn ?? 'Día de llegada al hotel'}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="date"
              label="Salida"
              value={checkOut}
              onChange={(event) => onDateChange('checkOut', event.target.value)}
              error={Boolean(errors.checkOut)}
              helperText={errors.checkOut ?? 'Día en que dejas la habitación'}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
        </Grid>
        <StaySeasonSection checkIn={checkIn} checkOut={checkOut} />
      </Stack>
    </Paper>
  )
}

export default StayDatesSection
