import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import DateFormatter from '../../utils/DateFormatter.js'

/**
 * Par etiqueta-valor para el encabezado de la factura.
 */
function Field({ label, children }) {
  return (
    <Stack spacing={0.25}>
      <Typography variant="caption" color="text.secondary" textTransform="uppercase">
        {label}
      </Typography>
      <Typography>{children}</Typography>
    </Stack>
  )
}

/**
 * Encabezado de la factura: número, emisión, huésped, habitación y fechas de estadía.
 * @param {Object} props
 * @param {import('../../models/Invoice.js').default} props.invoice Factura a mostrar.
 */
function InvoiceHeader({ invoice }) {
  const guest = invoice.guest

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1}>
        <Typography variant="h5" component="h2" fontWeight={700}>
          Factura {invoice.invoiceNumber}
        </Typography>
        <Typography color="text.secondary">Emitida el {DateFormatter.format(invoice.issuedAt)}</Typography>
      </Stack>
      <Divider />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Field label="Huésped">
            {guest ? `${guest.fullName} (${guest.documentNumber})` : 'No disponible'}
          </Field>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Field label="Reserva">{invoice.reservationId}</Field>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Field label="Habitación">
            {invoice.roomNumber} ({invoice.roomTypeLabel})
          </Field>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Field label="Estadía">
            {DateFormatter.format(invoice.checkIn)} - {DateFormatter.format(invoice.checkOut)} ({invoice.nights}{' '}
            {invoice.nights === 1 ? 'noche' : 'noches'})
          </Field>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default InvoiceHeader
