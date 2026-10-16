import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import MoneyText from '../common/MoneyText.jsx'
import StatusChip from '../common/StatusChip.jsx'
import DateFormatter from '../../utils/DateFormatter.js'
import RoomTypeCatalog from '../../utils/RoomTypeCatalog.js'

/**
 * Fila etiqueta-valor del resumen.
 */
function SummaryRow({ label, children }) {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      <Typography color="text.secondary">{label}</Typography>
      <Typography component="div" sx={{ textAlign: 'right' }}>
        {children}
      </Typography>
    </Stack>
  )
}

/**
 * Resumen de la reserva: estado, fechas, habitación y totales.
 * @param {Object} props
 * @param {import('../../models/Reservation.js').default} props.reservation Reserva a mostrar.
 */
function ReservationSummary({ reservation }) {
  const { room } = reservation
  const roomLabel = room ? `Habitación ${room.number} (${RoomTypeCatalog.label(room.type)})` : 'Sin asignar'

  return (
    <Card variant="outlined" component="section" aria-labelledby="resumen-reserva">
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography id="resumen-reserva" variant="h6" component="h2">
              Resumen de la reserva {reservation.id}
            </Typography>
            <StatusChip status={reservation.status} size="medium" />
          </Stack>
          <Divider />
          <SummaryRow label="Entrada">{DateFormatter.format(reservation.checkIn)}</SummaryRow>
          <SummaryRow label="Salida">{DateFormatter.format(reservation.checkOut)}</SummaryRow>
          <SummaryRow label="Noches">{reservation.nights}</SummaryRow>
          <SummaryRow label="Habitación">{roomLabel}</SummaryRow>
          <Divider />
          <SummaryRow label="Subtotal habitación">
            <MoneyText value={reservation.roomTotal} />
          </SummaryRow>
          <SummaryRow label="Subtotal servicios">
            <MoneyText value={reservation.servicesTotal} />
          </SummaryRow>
          <SummaryRow label="Total estimado">
            <MoneyText value={reservation.estimatedTotal} sx={{ fontWeight: 700 }} />
          </SummaryRow>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ReservationSummary
