import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import ConfirmActionDialog from './ConfirmActionDialog.jsx'
import hotelApiService from '../../api/hotelApiInstance.js'

/**
 * Explica por qué no se puede hacer check-in según el estado de la reserva.
 * @param {string} status Estado de la reserva.
 * @returns {string} Motivo en español.
 */
function checkInBlockedReason(status) {
  if (status === 'CHECKED_OUT') {
    return 'La estadía ya finalizó, no admite check-in.'
  }
  return 'La reserva ya tiene el check-in realizado.'
}

/**
 * Explica por qué no se puede hacer check-out según el estado de la reserva.
 * @param {string} status Estado de la reserva.
 * @returns {string} Motivo en español.
 */
function checkOutBlockedReason(status) {
  if (status === 'CHECKED_OUT') {
    return 'La estadía ya finalizó.'
  }
  return 'Primero debe realizarse el check-in de la reserva.'
}

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

  const checkInReason = reservation.canCheckIn ? null : checkInBlockedReason(reservation.status)
  const checkOutReason = reservation.canCheckOut ? null : checkOutBlockedReason(reservation.status)

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
            <Typography color="text.secondary">No hay acciones disponibles para el estado actual.</Typography>
          )}
          <Stack spacing={1.5}>
            <Tooltip title={checkInReason ?? ''} disableHoverListener={checkInReason === null}>
              <Box component="span" sx={{ display: 'block' }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={!reservation.canCheckIn || loading}
                  startIcon={loading && isCheckIn ? <CircularProgress size={16} color="inherit" /> : null}
                  onClick={() => setPendingAction('checkIn')}
                >
                  Check-in
                </Button>
              </Box>
            </Tooltip>
            <Tooltip title={checkOutReason ?? ''} disableHoverListener={checkOutReason === null}>
              <Box component="span" sx={{ display: 'block' }}>
                <Button
                  variant="outlined"
                  color="warning"
                  size="large"
                  fullWidth
                  disabled={!reservation.canCheckOut || loading}
                  startIcon={loading && !isCheckIn ? <CircularProgress size={16} color="inherit" /> : null}
                  onClick={() => setPendingAction('checkOut')}
                >
                  Check-out
                </Button>
              </Box>
            </Tooltip>
          </Stack>
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
