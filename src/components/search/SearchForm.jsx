import { useState } from 'react'
import dayjs from 'dayjs'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import RoomTypeFilter from './RoomTypeFilter.jsx'
import DateFormatter from '../../utils/DateFormatter.js'
import { tokens } from '../../theme/theme.js'

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
 * @param {string} [props.submitLabel] Texto del botón de búsqueda.
 */
function SearchForm({ initialValues, onSubmit, submitLabel = 'Buscar' }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = (field) => (event) => {
    setValues((previous) => ({ ...previous, [field]: event.target.value }))
    setErrors((previous) => ({ ...previous, [field]: undefined }))
  }

  const handleCheckInChange = (event) => {
    const checkIn = event.target.value
    setValues((previous) => {
      const shouldMoveCheckOut =
        checkIn && previous.checkOut && DateFormatter.nightsBetween(checkIn, previous.checkOut) <= 0
      return {
        ...previous,
        checkIn,
        checkOut: shouldMoveCheckOut ? dayjs(checkIn).add(1, 'day').format('YYYY-MM-DD') : previous.checkOut,
      }
    })
    setErrors((previous) => ({ ...previous, checkIn: undefined, checkOut: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validateDates(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      onSubmit(values)
    }
  }

  const fieldSx = {
    flex: { md: 1 },
    '& .MuiFilledInput-root': {
      bgcolor: tokens.white,
      borderRadius: '6px',
      minHeight: 56,
      '&:hover, &.Mui-focused': { bgcolor: tokens.white },
    },
    '& .MuiFormHelperText-root': { color: tokens.ink, fontWeight: 600, mx: 0.5 },
    '& .MuiInputLabel-root.Mui-error': { color: tokens.danger },
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Buscar disponibilidad"
      sx={{
        bgcolor: tokens.amber,
        p: '4px',
        borderRadius: '10px',
        boxShadow: tokens.shadowRaised,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { md: 'flex-start' },
        gap: '4px',
      }}
    >
      <TextField
        required
        variant="filled"
        type="date"
        label="Fecha de entrada"
        value={values.checkIn}
        onChange={handleCheckInChange}
        error={Boolean(errors.checkIn)}
        helperText={errors.checkIn}
        slotProps={{ inputLabel: { shrink: true }, input: { disableUnderline: true }, htmlInput: { min: DateFormatter.today() } }}
        sx={fieldSx}
      />
      <TextField
        required
        variant="filled"
        type="date"
        label="Fecha de salida"
        value={values.checkOut}
        onChange={handleChange('checkOut')}
        error={Boolean(errors.checkOut)}
        helperText={errors.checkOut}
        slotProps={{ inputLabel: { shrink: true }, input: { disableUnderline: true }, htmlInput: { min: values.checkIn || DateFormatter.today() } }}
        sx={fieldSx}
      />
      <Box sx={fieldSx}>
        <RoomTypeFilter
          variant="filled"
          value={values.roomType}
          onChange={(roomType) => setValues((previous) => ({ ...previous, roomType }))}
        />
      </Box>
      <Button
        type="submit"
        variant="contained"
        size="large"
        startIcon={<SearchIcon />}
        sx={{ minHeight: 56, px: 4, flexShrink: 0 }}
      >
        {submitLabel}
      </Button>
    </Box>
  )
}

export default SearchForm
