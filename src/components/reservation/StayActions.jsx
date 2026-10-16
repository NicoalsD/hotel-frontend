import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
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
    <Card variant="outlined" component="section" aria-labelledby="acciones-estadia">
      <CardContent>
        <Stack spacing={2}>
          <Typography id="acciones-estadia" variant="h6" component="h2">
            Acciones de estadía
          </Typography>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {!reservation.canCheckIn && !reservation.canCheckOut && (
            <Typography color="text.secondary">No hay acciones disponibles para el estado actual.</Typography>
          )}
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          disabled={!reservation.canCheckIn || loading}
          onClick={() => setPendingAction('checkIn')}
        >
          Check-in
        </Button>
        <Button
          variant="outlined"
          color="warning"
          disabled={!reservation.canCheckOut || loading}
          onClick={() => setPendingAction('checkOut')}
        >
          Check-out
        </Button>
      </CardActions>
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
