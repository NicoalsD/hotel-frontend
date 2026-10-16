import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

/**
 * Diálogo de confirmación para acciones irreversibles como el check-in o el check-out.
 * @param {Object} props
 * @param {boolean} props.open Indica si el diálogo está abierto.
 * @param {string} props.title Título del diálogo.
 * @param {string} props.message Texto explicativo de la acción.
 * @param {string} props.confirmLabel Texto del botón de confirmación.
 * @param {Function} props.onConfirm Acción al confirmar.
 * @param {Function} props.onClose Acción al cancelar o cerrar.
 * @param {boolean} [props.loading=false] Deshabilita los botones mientras se procesa.
 */
function ConfirmActionDialog({ open, title, message, confirmLabel, onConfirm, onClose, loading = false }) {
  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} aria-labelledby="confirmar-accion-titulo">
      <DialogTitle id="confirmar-accion-titulo" sx={{ fontWeight: 800, pb: 1 }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} disabled={loading} color="inherit" sx={{ color: 'text.secondary' }}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={onConfirm} disabled={loading}>
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmActionDialog
