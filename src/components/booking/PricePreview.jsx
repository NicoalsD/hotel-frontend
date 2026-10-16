import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ErrorAlert from '../common/ErrorAlert.jsx'
import LoadingState from '../common/LoadingState.jsx'
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
    return <LoadingState message="Calculando precio..." />
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
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mb: 2 }}>
        <Chip size="small" label={`${quote.nights} ${quote.nights === 1 ? 'noche' : 'noches'}`} />
        {quote.hasHighSeason && (
          <Chip size="small" color="warning" variant="outlined" label={`${quote.highSeasonNights} noches de temporada alta`} />
        )}
        {quote.hasLowSeason && (
          <Chip size="small" color="success" variant="outlined" label={`${quote.lowSeasonNights} noches de temporada baja`} />
        )}
      </Stack>
      <NightlyRatesTable rates={quote.nightlyRates} />
      <Divider sx={{ my: 2 }} />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" component="p">
          Total estimado
        </Typography>
        <MoneyText value={quote.total} variant="h6" />
      </Stack>
    </Paper>
  )
}

export default PricePreview
