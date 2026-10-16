import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

/**
 * Notificación breve que confirma una acción completada (por ejemplo, un check-in).
 * @param {Object} props
 * @param {string|null} props.message Texto a mostrar; null oculta la notificación.
 * @param {Function} props.onClose Se invoca al cerrar la notificación.
 * @param {'success'|'info'|'warning'|'error'} [props.severity='success'] Severidad visual.
 */
function ActionSnackbar({ message, onClose, severity = 'success' }) {
  return (
    <Snackbar
      open={message !== null && message !== undefined}
      autoHideDuration={4000}
      onClose={(_event, reason) => {
        if (reason !== 'clickaway') {
          onClose()
        }
      }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default ActionSnackbar
