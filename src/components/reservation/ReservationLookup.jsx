import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import hotelApiService from '../../api/hotelApiInstance.js'

const CODE_PATTERN = /^RES-\d+$/i

/**
 * Buscador de reservas por código (RES-n). Al encontrarla navega a su gestión.
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
    <Stack component="form" onSubmit={handleSubmit} noValidate spacing={2} sx={{ mb: 4 }}>
      {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          label="Código de reserva"
          placeholder="RES-1001"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          error={errorMessage !== null}
          fullWidth
          autoComplete="off"
        />
        <Button type="submit" variant="contained" disabled={searching} sx={{ minWidth: 160 }}>
          {searching ? 'Buscando...' : 'Buscar reserva'}
        </Button>
      </Stack>
    </Stack>
  )
}

export default ReservationLookup
