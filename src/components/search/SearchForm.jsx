import { useState } from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import RoomTypeFilter from './RoomTypeFilter.jsx'
import DateFormatter from '../../utils/DateFormatter.js'

/**
 * Valida las fechas de búsqueda y devuelve los mensajes de error en español.
 * @param {{checkIn: string, checkOut: string}} values Fechas a validar.
 * @returns {{checkIn?: string, checkOut?: string}} Vacío cuando las fechas son válidas.
 */
function validateDates({ checkIn, checkOut }) {
  const errors = {}
  if (!checkIn) {
    errors.checkIn = 'Indica la fecha de entrada.'
  } else if (checkIn < DateFormatter.today()) {
    errors.checkIn = 'La fecha de entrada no puede ser anterior a hoy.'
  }
  if (!checkOut) {
    errors.checkOut = 'Indica la fecha de salida.'
  } else if (checkIn && DateFormatter.nightsBetween(checkIn, checkOut) <= 0) {
    errors.checkOut = 'La fecha de salida debe ser posterior a la de entrada.'
  }
  return errors
}

/**
 * Formulario de búsqueda: fecha de entrada, fecha de salida y tipo de habitación.
 * @param {Object} props
 * @param {{checkIn: string, checkOut: string, roomType: string}} props.initialValues Valores iniciales.
 * @param {(values: {checkIn: string, checkOut: string, roomType: string}) => void} props.onSubmit Se invoca con valores válidos.
 */
function SearchForm({ initialValues, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = (field) => (event) => {
    setValues((previous) => ({ ...previous, [field]: event.target.value }))
    setErrors((previous) => ({ ...previous, [field]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validateDates(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      onSubmit(values)
    }
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} noValidate spacing={2} aria-label="Buscar disponibilidad">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            fullWidth
            required
            type="date"
            label="Fecha de entrada"
            value={values.checkIn}
            onChange={handleChange('checkIn')}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            fullWidth
            required
            type="date"
            label="Fecha de salida"
            value={values.checkOut}
            onChange={handleChange('checkOut')}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <RoomTypeFilter value={values.roomType} onChange={(roomType) => setValues((previous) => ({ ...previous, roomType }))} />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Button type="submit" fullWidth variant="contained" size="large" startIcon={<SearchIcon />} sx={{ height: '100%' }}>
            Buscar
          </Button>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default SearchForm
