import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import MoneyText from '../common/MoneyText.jsx'

/**
 * Fila etiqueta-importe de la tarjeta de totales.
 */
function TotalLine({ label, value }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={2}>
      <Typography color="text.secondary">{label}</Typography>
      <MoneyText value={value} sx={{ fontWeight: 600 }} />
    </Stack>
  )
}

/**
 * Tarjeta con el desglose del total estimado de la reserva.
 * @param {Object} props
 * @param {import('../../models/Reservation.js').default} props.reservation Reserva en gestión.
 */
function ReservationTotalsCard({ reservation }) {
  return (
    <Card component="section" aria-labelledby="totales-reserva">
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack spacing={2}>
          <Typography id="totales-reserva" variant="h4" component="h2">
            Total de la reserva
          </Typography>
          <Stack spacing={1.25}>
            <TotalLine label="Subtotal habitación" value={reservation.roomTotal} />
            <TotalLine label="Subtotal servicios" value={reservation.servicesTotal} />
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={2}>
            <Typography sx={{ fontWeight: 800 }}>Total estimado</Typography>
            <MoneyText value={reservation.estimatedTotal} sx={{ fontWeight: 800, fontSize: '1.5rem', color: 'text.primary' }} />
          </Stack>
          <Box>
            <Typography variant="body2" color="text.secondary">
              El IVA (19%) se suma en la factura final.
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ReservationTotalsCard
