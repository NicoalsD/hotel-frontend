import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import DateFormatter from '../../utils/DateFormatter.js'
import RoomImageCatalog from '../../utils/RoomImageCatalog.js'
import ErrorAlert from '../common/ErrorAlert.jsx'
import MoneyText from '../common/MoneyText.jsx'
import NightlyRateRow from './NightlyRateRow.jsx'
import SummaryRow from './SummaryRow.jsx'
import { tokens } from '../../theme/theme.js'

/**
 * Resumen de la reserva: fotografía de la habitación, fechas y precio.
 * @param {Object} props
 * @param {import('../../models/Room.js').default} props.room Habitación seleccionada.
 * @param {string} props.checkIn Fecha de entrada (YYYY-MM-DD) o vacía.
 * @param {string} props.checkOut Fecha de salida (YYYY-MM-DD) o vacía.
 * @param {import('../../models/PriceQuote.js').default|null} props.quote Cotización actual.
 * @param {boolean} props.datesValid Indica si el rango de fechas permite cotizar.
 * @param {boolean} props.loading Indica si la cotización se está calculando.
 * @param {Error|null} props.error Error al cotizar.
 * @param {Function} [props.onRetry] Reintento de la cotización.
 */
function PriceSummaryCard({ room, checkIn, checkOut, quote, datesValid, loading, error, onRetry }) {
  return (
    <Card component="section" aria-labelledby="price-summary-title" sx={{ boxShadow: tokens.shadow, overflow: 'hidden' }}>
      <Box
        component="img"
        src={RoomImageCatalog.forRoom(room.type, room.id)}
        alt={`Fotografía de la habitación ${room.number}`}
        loading="lazy"
        sx={{ display: 'block', width: '100%', aspectRatio: '16 / 9', objectFit: 'cover' }}
      />
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack spacing={0.5}>
          <Typography variant="h3" component="h2" id="price-summary-title">
            Habitación {room.number}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {room.typeLabel} · Hasta {room.capacity} {room.capacity === 1 ? 'persona' : 'personas'}
          </Typography>
        </Stack>
        <Divider sx={{ my: 2.5 }} />
        <Stack spacing={1.25}>
          <SummaryRow label="Entrada" value={checkIn ? DateFormatter.format(checkIn) : 'Sin definir'} />
          <SummaryRow label="Salida" value={checkOut ? DateFormatter.format(checkOut) : 'Sin definir'} />
        </Stack>
        <Divider sx={{ my: 2.5 }} />
        {!datesValid && <Alert severity="info">Selecciona fechas válidas para ver el precio de la estadía.</Alert>}
        {datesValid && loading && !quote && (
          <Stack spacing={1.5} role="status" aria-label="Calculando precio">
            <Skeleton variant="text" width="50%" height={28} />
            <Skeleton variant="rounded" height={120} />
            <Skeleton variant="text" width="35%" height={36} />
          </Stack>
        )}
        {datesValid && error && <ErrorAlert message={error.message} onRetry={onRetry} />}
        {datesValid && quote && (
          <>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
              <Typography variant="subtitle2">Precio por noche</Typography>
              <Typography variant="body2" color="text.secondary">
                {quote.nights} {quote.nights === 1 ? 'noche' : 'noches'}
              </Typography>
            </Stack>
            <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
              {quote.nightlyRates.map((rate) => (
                <NightlyRateRow key={rate.date} rate={rate} />
              ))}
            </Box>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" component="p">
                Total
              </Typography>
              <MoneyText value={quote.total} sx={{ fontSize: '1.75rem', fontWeight: 800, color: tokens.ink, fontVariantNumeric: 'tabular-nums' }} />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              IVA 19% se suma en la factura final
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default PriceSummaryCard
