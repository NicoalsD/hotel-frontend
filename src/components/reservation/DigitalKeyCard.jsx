import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DateFormatter from '../../utils/DateFormatter.js'
import { tokens } from '../../theme/theme.js'

/**
 * Tarjeta de la llave digital de la habitación.
 * Sin llave indica que aún no hay check-in; una llave revocada indica que la estadía terminó.
 * @param {Object} props
 * @param {import('../../models/DigitalKey.js').default|null} props.digitalKey Llave digital de la reserva.
 */
function DigitalKeyCard({ digitalKey }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(digitalKey.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Card component="section" aria-labelledby="llave-digital" sx={{ bgcolor: tokens.navy, color: tokens.white, borderColor: tokens.navy }}>
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
            <Typography id="llave-digital" variant="h4" component="h2" sx={{ color: tokens.white }}>
              Llave digital
            </Typography>
            {digitalKey && (
              <Chip
                size="small"
                label={digitalKey.isRevoked ? 'Revocada' : 'Activa'}
                sx={{
                  fontWeight: 700,
                  bgcolor: digitalKey.isRevoked ? tokens.ground : tokens.successSoft,
                  color: digitalKey.isRevoked ? tokens.inkMuted : tokens.success,
                }}
              />
            )}
          </Stack>
          {digitalKey ? (
            <>
              <Typography variant="body2" sx={{ color: alpha(tokens.white, 0.82) }}>
                Habitación {digitalKey.roomNumber}
                {digitalKey.issuedAt && ` · Emitida el ${DateFormatter.format(digitalKey.issuedAt)}`}
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ bgcolor: tokens.ground, color: tokens.ink, borderRadius: '8px', p: 1.5 }}
              >
                <Typography
                  component="p"
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    wordBreak: 'break-all',
                    flex: 1,
                    textDecoration: digitalKey.isRevoked ? 'line-through' : 'none',
                  }}
                >
                  {digitalKey.code}
                </Typography>
                <Tooltip title={copied ? 'Código copiado' : 'Copiar código'}>
                  <IconButton aria-label="Copiar código de llave" onClick={handleCopy} size="small" sx={{ color: tokens.navy }}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </>
          ) : (
            <Typography variant="body2" sx={{ color: alpha(tokens.white, 0.82) }}>
              La llave digital se emite al realizar el check-in.
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default DigitalKeyCard
