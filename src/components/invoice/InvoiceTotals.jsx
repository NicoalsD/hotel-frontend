import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import MoneyText from '../common/MoneyText.jsx'

/**
 * Fila de totales con etiqueta a la izquierda y monto a la derecha.
 */
function TotalRow({ label, children, strong = false }) {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      <Typography fontWeight={strong ? 700 : 400}>{label}</Typography>
      <Typography fontWeight={strong ? 700 : 400}>{children}</Typography>
    </Stack>
  )
}

/**
 * Totales de la factura: subtotales, IVA y total a pagar.
 * @param {Object} props
 * @param {import('../../models/Invoice.js').default} props.invoice Factura con los importes calculados por el servidor.
 */
function InvoiceTotals({ invoice }) {
  return (
    <Stack spacing={1} sx={{ maxWidth: 360, ml: 'auto', width: '100%' }} aria-label="Totales de la factura">
      <TotalRow label="Subtotal habitación">
        <MoneyText value={invoice.roomSubtotal} component="span" />
      </TotalRow>
      <TotalRow label="Subtotal servicios">
        <MoneyText value={invoice.servicesSubtotal} component="span" />
      </TotalRow>
      <TotalRow label="Subtotal">
        <MoneyText value={invoice.subtotal} component="span" />
      </TotalRow>
      <TotalRow label={`IVA ${invoice.taxPercentage}%`}>
        <MoneyText value={invoice.taxAmount} component="span" />
      </TotalRow>
      <Divider />
      <TotalRow label="Total" strong>
        <MoneyText value={invoice.total} component="span" />
      </TotalRow>
    </Stack>
  )
}

export default InvoiceTotals
