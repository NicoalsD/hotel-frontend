import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

/**
 * Indicador de carga centrado con mensaje accesible.
 * @param {Object} props
 * @param {string} [props.message='Cargando...'] Texto que acompaña al indicador.
 */
function LoadingState({ message = 'Cargando...' }) {
  return (
    <Stack role="status" aria-live="polite" spacing={2} sx={{ alignItems: 'center', py: 6 }}>
      <CircularProgress aria-label={message} />
      <Typography color="text.secondary">{message}</Typography>
    </Stack>
  )
}

export default LoadingState
