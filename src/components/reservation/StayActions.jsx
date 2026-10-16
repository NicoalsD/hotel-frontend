import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ConfirmActionDialog from './ConfirmActionDialog.jsx'
import hotelApiService from '../../api/hotelApiInstance.js'

/**
 * Acciones de check-in y check-out de la reserva, cada una con confirmación previa.
 * @param {Object} props
 * @param {import('../../models/Reservation.js').default} props.reservation Reserva en gestión.
 * @param {Function} props.onCheckedIn Recibe la reserva actualizada tras el check-in.
 * @param {Function} props.onCheckedOut Recibe la factura generada tras el check-out.
 */
function StayActions({ reservation, onCheckedIn, onCheckedOut }) {
  const [pendingAction, setPendingAction] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const isCheckIn = pendingAction === 'checkIn'
  const dialogProps = isCheckIn
    ? {
        title: 'Confirmar check-in',
        message: `Se registrará la entrada de ${reservation.guest?.fullName ?? 'el huésped'} y se emitirá la llave digital.`,
        confirmLabel: 'Realizar check-in',
      }
    : {
        title: 'Confirmar check-out',
        message: 'Se cerrará la estadía, se generará la factura y se revocará la llave digital.',
        confirmLabel: 'Realizar check-out',
      }


  async function handleConfirm() {
    setLoading(true)
    setErrorMessage(null)
    try {
      if (isCheckIn) {
        const updated = await hotelApiService.checkIn(reservation.id)
        setPendingAction(null)
        onCheckedIn(updated)
      } else {
        const invoice = await hotelApiService.checkOut(reservation.id)
        setPendingAction(null)
        onCheckedOut(invoice)
      }
    } catch (error) {
      setPendingAction(null)
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card variant="outlined" component="section" aria-labelledby="proximo-paso">
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack spacing={2}>
          <Typography id="proximo-paso" variant="h4" component="h2">
            Próximo paso
          </Typography>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {reservation.canCheckIn && (
            <Typography color="text.secondary">Realiza el check-in para recibir tu llave digital.</Typography>
          )}
          {reservation.canCheckOut && (
            <Typography color="text.secondary">Al hacer check-out se cierra la estadía y se genera la factura.</Typography>
          )}
          {!reservation.canCheckIn && !reservation.canCheckOut && (
            <Typography color="text.secondary">La estancia terminó. Consulta la factura en el resumen de la reserva.</Typography>
          )}
          {reservation.canCheckIn && (
            <Button
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              startIcon={loading && isCheckIn ? <CircularProgress size={16} color="inherit" /> : null}
              onClick={() => setPendingAction('checkIn')}
            >
              Hacer check-in
            </Button>
          )}
          {reservation.canCheckOut && (
            <Button
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              startIcon={loading && !isCheckIn ? <CircularProgress size={16} color="inherit" /> : null}
              onClick={() => setPendingAction('checkOut')}
            >
              Hacer check-out y generar factura
            </Button>
          )}
        </Stack>
      </CardContent>
      <ConfirmActionDialog
        open={pendingAction !== null}
        {...dialogProps}
        onConfirm={handleConfirm}
        onClose={() => setPendingAction(null)}
        loading={loading}
      />
    </Card>
  )
}

export default StayActions
