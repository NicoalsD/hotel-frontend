import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import BrandMark from '../brand/BrandMark.jsx'
import DateFormatter from '../../utils/DateFormatter.js'

/**
 * Par etiqueta-valor para las secciones de la factura.
 */
function Field({ label, children }) {
  return (
    <Stack spacing={0.25}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 600 }}>{children}</Typography>
    </Stack>
  )
}

/**
 * Encabezado de la factura: marca y número con fecha de emisión, y los datos del huésped y de la estadía.
 * @param {Object} props
 * @param {import('../../models/Invoice.js').default} props.invoice Factura a mostrar.
 */
function InvoiceHeader({ invoice }) {
  const guest = invoice.guest

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'space-between', alignItems: { sm: 'flex-start' } }}>
        <BrandMark tone="dark" />
        <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
            {invoice.invoiceNumber}
          </Typography>
          <Typography color="text.secondary">Emitida el {DateFormatter.format(invoice.issuedAt)}</Typography>
        </Box>
      </Stack>
      <Divider />
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack spacing={2}>
            <Typography variant="h6" component="h3">
              Facturado a
            </Typography>
            <Field label="Huésped">{guest ? guest.fullName : 'No disponible'}</Field>
            <Field label="Documento">{guest ? guest.documentNumber : 'No disponible'}</Field>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack spacing={2}>
            <Typography variant="h6" component="h3">
              Estancia
            </Typography>
            <Field label="Reserva">{invoice.reservationId}</Field>
            <Field label="Habitación">
              {invoice.roomNumber} ({invoice.roomTypeLabel})
            </Field>
            <Field label="Fechas">
              {DateFormatter.format(invoice.checkIn)} - {DateFormatter.format(invoice.checkOut)} ({invoice.nights}{' '}
              {invoice.nights === 1 ? 'noche' : 'noches'})
            </Field>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default InvoiceHeader
