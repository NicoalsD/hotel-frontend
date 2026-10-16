import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tokens } from '../../theme/theme.js'

const CODE_PATTERN = /^RES-\d+$/

/**
 * Acceso directo a la gestión de una reserva por su código.
 */
function ManageBookingBand() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const normalized = code.trim().toUpperCase()
    if (!CODE_PATTERN.test(normalized)) {
      setError('Escribe el código tal como aparece en tu confirmación, por ejemplo RES-1001.')
      return
    }
    navigate(`/reservas/${normalized}`)
  }

  return (
    <Box
      component="section"
      aria-labelledby="manage-title"
      sx={{ bgcolor: tokens.navy, color: tokens.white, borderRadius: '12px', p: { xs: 3, md: 5 } }}
    >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 3, md: 6 }} sx={{ alignItems: { md: 'center' } }}>
        <Box sx={{ flex: 1 }}>
          <Typography id="manage-title" variant="h2" sx={{ color: tokens.white }}>
            ¿Ya tienes una reserva?
          </Typography>
          <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.82)', maxWidth: 520 }}>
            Con tu código haces el check-in, recibes la llave digital, agregas servicios y consultas la factura.
          </Typography>
        </Box>
        <Stack
          component="form"
          onSubmit={handleSubmit}
          noValidate
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{ flex: 1, alignItems: { sm: 'flex-start' } }}
        >
          <TextField
            label="Código de reserva"
            placeholder="RES-1001"
            value={code}
            onChange={(event) => {
              setCode(event.target.value)
              setError('')
            }}
            error={Boolean(error)}
            helperText={error}
            fullWidth
            sx={{
              '& .MuiInputLabel-root:not(.MuiInputLabel-shrink)': { color: tokens.inkMuted },
              '& .MuiFormHelperText-root': { color: tokens.amber, mx: 0 },
            }}
          />
          <Button type="submit" variant="contained" size="large" sx={{ minHeight: 56, flexShrink: 0, bgcolor: tokens.amber, color: tokens.navy, '&:hover': { bgcolor: '#e0a10f' } }}>
            Gestionar reserva
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default ManageBookingBand
