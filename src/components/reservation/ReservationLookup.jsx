import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import hotelApiService from '../../api/hotelApiInstance.js'
import { tokens } from '../../theme/theme.js'

const CODE_PATTERN = /^RES-\d+$/i

/**
 * Buscador de reservas por código (RES-n) con el mismo marco ámbar del buscador de habitaciones.
 * Al encontrarla navega a su gestión.
 */
function ReservationLookup() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [searching, setSearching] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const normalized = code.trim().toUpperCase()
    if (!CODE_PATTERN.test(normalized)) {
      setErrorMessage('Ingrese un código válido con formato RES-n, por ejemplo RES-1001.')
      return
    }
    setSearching(true)
    setErrorMessage(null)
    try {
      await hotelApiService.getReservation(normalized)
      navigate(`/reservas/${normalized}`)
    } catch (error) {
      setErrorMessage(error.status === 404 ? `No se encontró la reserva ${normalized}.` : error.message)
    } finally {
      setSearching(false)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Buscar reserva por código"
      sx={{
        bgcolor: tokens.amber,
        p: '4px',
        borderRadius: '10px',
        boxShadow: tokens.shadowRaised,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { sm: 'flex-start' },
        gap: '4px',
      }}
    >
      <TextField
        variant="filled"
        label="Código de reserva"
        placeholder="RES-1001"
        value={code}
        onChange={(event) => {
          setCode(event.target.value)
          setErrorMessage(null)
        }}
        error={errorMessage !== null}
        helperText={errorMessage ?? undefined}
        fullWidth
        autoComplete="off"
        slotProps={{ input: { disableUnderline: true } }}
        sx={{
          flex: { sm: 1 },
          '& .MuiFilledInput-root': {
            bgcolor: tokens.white,
            borderRadius: '6px',
            minHeight: 56,
            '&:hover, &.Mui-focused': { bgcolor: tokens.white },
          },
          '& .MuiFormHelperText-root': { color: tokens.ink, fontWeight: 600, mx: 0.5 },
          '& .MuiInputLabel-root.Mui-error': { color: tokens.danger },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={searching}
        startIcon={<SearchIcon />}
        sx={{ minHeight: 56, px: 4, flexShrink: 0 }}
      >
        {searching ? 'Buscando...' : 'Buscar reserva'}
      </Button>
    </Box>
  )
}

export default ReservationLookup
