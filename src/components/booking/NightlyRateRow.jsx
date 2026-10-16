import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import 'dayjs/locale/es.js'
import MoneyText from '../common/MoneyText.jsx'
import { tokens } from '../../theme/theme.js'

/**
 * Fecha corta de una noche en español, por ejemplo "lun 28 nov".
 * @param {string} isoDate Fecha YYYY-MM-DD.
 * @returns {string}
 */
function formatNight(isoDate) {
  return dayjs(isoDate).locale('es').format('ddd D MMM').replace(/\./g, '')
}

/**
 * Fila del desglose de precio de una noche: fecha, temporada y precio alineado a la derecha.
 * Debe renderizarse dentro de una lista (`ul`).
 * @param {Object} props
 * @param {import('../../models/NightlyRate.js').default} props.rate Tarifa de la noche.
 */
function NightlyRateRow({ rate }) {
  const high = rate.isHighSeason
  const seasonName = high ? 'Alta' : 'Baja'

  return (
    <Stack component="li" direction="row" spacing={1.5} sx={{ alignItems: 'center', py: 1 }}>
      <Typography variant="body2" sx={{ flexGrow: 1, minWidth: 0 }}>
        {formatNight(rate.date)}
      </Typography>
      <Chip
        size="small"
        label={seasonName}
        aria-label={`Temporada ${seasonName.toLowerCase()}`}
        sx={{
          fontWeight: 800,
          bgcolor: high ? tokens.amber : tokens.ground,
          color: tokens.ink,
          border: `1px solid ${high ? tokens.amber : tokens.line}`,
        }}
      />
      <MoneyText value={rate.price} sx={{ minWidth: 72, textAlign: 'right', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }} />
    </Stack>
  )
}

export default NightlyRateRow
