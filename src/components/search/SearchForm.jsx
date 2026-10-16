import { useState } from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import RoomTypeFilter from './RoomTypeFilter.jsx'

/**
 * Formulario de búsqueda: fecha de entrada, fecha de salida y tipo de habitación.
 * @param {Object} props
 * @param {{checkIn: string, checkOut: string, roomType: string}} props.initialValues Valores iniciales.
 * @param {(values: {checkIn: string, checkOut: string, roomType: string}) => void} props.onSubmit Se invoca con valores válidos.
 */
function SearchForm({ initialValues, onSubmit }) {
  const [values, setValues] = useState(initialValues)

  const handleChange = (field) => (event) => {
    setValues((previous) => ({ ...previous, [field]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(values)
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
