import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import CheckCircle from '@mui/icons-material/CheckCircle'
import Stack from '@mui/material/Stack'

/**
 * Diálogo que confirma la reserva creada y muestra su código.
 * @param {Object} props
 * @param {boolean} props.open Indica si el diálogo está visible.
 * @param {string} props.reservationId Código de la reserva (RES-n).
 * @param {Function} props.onContinue Acción para ir al detalle de la reserva.
 */
function ReservationSuccessDialog({ open, reservationId, onContinue }) {
  return (
    <Dialog open={open} onClose={onContinue} aria-labelledby="reservation-success-title" aria-describedby="reservation-success-description" maxWidth="xs" fullWidth>
      <DialogTitle id="reservation-success-title">
        <Stack direction="row" spacing={1} alignItems="center">
          <CheckCircle color="success" aria-hidden="true" />
          <span>Reserva confirmada</span>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="reservation-success-description">Tu reserva fue creada con éxito. Guarda este código para consultarla:</DialogContentText>
        <Typography variant="h4" component="p" align="center" sx={{ my: 3, fontWeight: 700, letterSpacing: 2 }}>
          <span aria-label={`Código de reserva ${reservationId}`}>{reservationId}</span>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onContinue} fullWidth>
          Ver reserva
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ReservationSuccessDialog
