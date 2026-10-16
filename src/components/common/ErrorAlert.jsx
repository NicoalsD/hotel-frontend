import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'

/**
 * Mensaje de error con acción opcional para reintentar.
 * @param {Object} props
 * @param {string} [props.message] Texto del error para el usuario.
 * @param {Function} [props.onRetry] Acción de reintento; si se omite no se muestra el botón.
 */
function ErrorAlert({ message = 'Ocurrió un error inesperado.', onRetry }) {
  return (
    <Alert
      severity="error"
      action={
        onRetry ? (
          <Button color="inherit" size="small" onClick={onRetry}>
            Reintentar
          </Button>
        ) : null
      }
    >
      {message}
    </Alert>
  )
}

export default ErrorAlert
