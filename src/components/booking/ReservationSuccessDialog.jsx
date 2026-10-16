import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CheckCircle from '@mui/icons-material/CheckCircle'
import { tokens } from '../../theme/theme.js'

/**
 * Diálogo que confirma la reserva creada y muestra su código.
 * @param {Object} props
 * @param {boolean} props.open Indica si el diálogo está visible.
 * @param {string} props.reservationId Código de la reserva (RES-n).
 * @param {Function} props.onContinue Acción para ir al detalle de la reserva.
 */
function ReservationSuccessDialog({ open, reservationId, onContinue }) {
  return (
    <Dialog
      open={open}
      onClose={onContinue}
      aria-labelledby="reservation-success-title"
      aria-describedby="reservation-success-description"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="reservation-success-title" sx={{ pb: 1 }}>
        <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
          <CheckCircle sx={{ color: tokens.success }} aria-hidden="true" />
          <span>Reserva confirmada</span>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="reservation-success-description">
          Tu reserva fue creada con éxito. Guarda este código para consultarla:
        </DialogContentText>
        <Box
          sx={{
            mt: 2.5,
            py: 2.5,
            px: 2,
            borderRadius: '10px',
            bgcolor: tokens.ground,
            border: `1px solid ${tokens.line}`,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h3"
            component="p"
            sx={{ fontWeight: 800, letterSpacing: '0.08em', fontVariantNumeric: 'tabular-nums' }}
          >
            <span aria-label={`Código de reserva ${reservationId}`}>{reservationId}</span>
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button variant="contained" onClick={onContinue} fullWidth>
          Gestionar reserva
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ReservationSuccessDialog
