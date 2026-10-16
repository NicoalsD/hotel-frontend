import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import MoneyText from '../common/MoneyText.jsx'
import { tokens } from '../../theme/theme.js'

/**
 * Fila de totales con etiqueta a la izquierda y monto a la derecha.
 */
function TotalRow({ label, value, strong = false }) {
  return (
    <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
      <Typography sx={{ fontWeight: strong ? 800 : 400, color: strong ? tokens.navy : 'text.primary' }}>{label}</Typography>
      <MoneyText
        value={value}
        sx={{ fontWeight: strong ? 800 : 600, fontSize: strong ? '1.5rem' : undefined, color: strong ? tokens.navy : 'text.primary' }}
      />
    </Stack>
  )
}

/**
 * Totales de la factura alineados a la derecha: subtotales, IVA y total a pagar destacado.
 * @param {Object} props
 * @param {import('../../models/Invoice.js').default} props.invoice Factura con los importes calculados por el servidor.
 */
function InvoiceTotals({ invoice }) {
  return (
    <Box component="section" aria-label="Totales de la factura" sx={{ width: '100%', maxWidth: 380, ml: 'auto' }}>
      <Stack spacing={1.25}>
        <TotalRow label="Subtotal habitación" value={invoice.roomSubtotal} />
        <TotalRow label="Subtotal servicios" value={invoice.servicesSubtotal} />
        <TotalRow label="Subtotal" value={invoice.subtotal} />
        <TotalRow label={`IVA (${invoice.taxPercentage}%)`} value={invoice.taxAmount} />
        <Divider sx={{ my: 0.5 }} />
        <TotalRow label="Total" value={invoice.total} strong />
      </Stack>
    </Box>
  )
}

export default InvoiceTotals
