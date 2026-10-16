import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { tokens } from '../../theme/theme.js'

/**
 * Pie de la factura: código de la llave digital y mensaje de agradecimiento.
 * @param {Object} props
 * @param {string|null} [props.digitalKeyCode] Código de la llave digital de la estadía.
 */
function InvoiceFooter({ digitalKeyCode }) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      sx={{ justifyContent: 'space-between', alignItems: { sm: 'flex-end' }, '@media print': { breakInside: 'avoid' } }}
    >
      <Box>
        <Typography variant="body2" color="text.secondary">
          Código de llave digital
        </Typography>
        <Typography sx={{ fontFamily: 'monospace', fontWeight: 700, wordBreak: 'break-all' }}>
          {digitalKeyCode ?? 'No disponible'}
        </Typography>
      </Box>
      <Typography sx={{ fontWeight: 800, color: tokens.navy }}>Gracias por tu estancia</Typography>
    </Stack>
  )
}

export default InvoiceFooter
