import Chip from '@mui/material/Chip'
import Skeleton from '@mui/material/Skeleton'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ErrorAlert from '../common/ErrorAlert.jsx'
import MoneyText from '../common/MoneyText.jsx'
import NightlyRatesTable from './NightlyRatesTable.jsx'

/**
 * Vista previa de precio: noches, temporadas, desglose por noche y total.
 * @param {Object} props
 * @param {import('../../models/PriceQuote.js').default|null} props.quote Cotización actual.
 * @param {boolean} props.loading Indica si la cotización se está calculando.
 * @param {Error|null} props.error Error al cotizar.
 * @param {Function} [props.onRetry] Reintento de la cotización.
 */
function PricePreview({ quote, loading, error, onRetry }) {
  if (loading && !quote) {
    return (
      <Paper variant="outlined" sx={{ p: 3 }} role="status" aria-label="Calculando precio">
        <Skeleton variant="text" width="40%" height={32} />
        <Skeleton variant="rounded" height={120} sx={{ my: 2 }} />
        <Skeleton variant="text" width="30%" height={32} />
      </Paper>
    )
  }
  if (error) {
    return <ErrorAlert message={error.message} onRetry={onRetry} />
  }
  if (!quote) {
    return null
  }

  return (
    <Paper variant="outlined" sx={{ p: 3 }} aria-busy={loading}>
      <Typography variant="h6" component="h2" gutterBottom>
        Resumen de precio
      </Typography>
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mb: 2 }} role="group" aria-label="Resumen de noches y temporadas">
        <Chip size="small" label={`${quote.nights} ${quote.nights === 1 ? 'noche' : 'noches'}`} />
        {quote.hasHighSeason && (
          <Tooltip title="Temporada alta: las noches de alta demanda tienen una tarifa mayor." arrow>
            <Chip
              size="small"
              color="warning"
              variant="outlined"
              tabIndex={0}
              label={`${quote.highSeasonNights} noches de temporada alta`}
            />
          </Tooltip>
        )}
        {quote.hasLowSeason && (
          <Tooltip title="Temporada baja: las noches de menor demanda tienen una tarifa reducida." arrow>
            <Chip
              size="small"
              color="success"
              variant="outlined"
              tabIndex={0}
              label={`${quote.lowSeasonNights} noches de temporada baja`}
            />
          </Tooltip>
        )}
      </Stack>
      <NightlyRatesTable rates={quote.nightlyRates} />
      <Divider sx={{ my: 2 }} />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" component="p">
          Total estimado
        </Typography>
        <MoneyText value={quote.total} variant="h6" aria-label={`Total estimado: ${quote.total}`} />
      </Stack>
    </Paper>
  )
}

export default PricePreview
