import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import DateFormatter from '../../utils/DateFormatter.js'

/**
 * Tarjeta de la llave digital de la habitación.
 * Sin llave indica que aún no hay check-in; una llave revocada indica que la estadía terminó.
 * @param {Object} props
 * @param {import('../../models/DigitalKey.js').default|null} props.digitalKey Llave digital de la reserva.
 */
function DigitalKeyCard({ digitalKey }) {
  return (
    <Card variant="outlined" component="section" aria-labelledby="llave-digital">
      <CardContent>
        <Stack spacing={1.5}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
            <Typography id="llave-digital" variant="h6" component="h2">
              Llave digital
            </Typography>
            {digitalKey && (
              <Chip
                size="small"
                label={digitalKey.isRevoked ? 'Revocada' : 'Activa'}
                color={digitalKey.isRevoked ? 'default' : 'success'}
              />
            )}
          </Stack>
          {digitalKey ? (
            <>
              <Typography variant="body2" color="text.secondary">
                Habitación {digitalKey.roomNumber}
                {digitalKey.issuedAt && ` · Emitida el ${DateFormatter.format(digitalKey.issuedAt)}`}
              </Typography>
              <Typography
                component="p"
                sx={{ fontFamily: 'monospace', wordBreak: 'break-all', textDecoration: digitalKey.isRevoked ? 'line-through' : 'none' }}
              >
                {digitalKey.code}
              </Typography>
            </>
          ) : (
            <Alert severity="info">La llave digital se emite al realizar el check-in.</Alert>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default DigitalKeyCard
