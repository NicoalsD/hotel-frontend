import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { tokens } from '../../theme/theme.js'

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
const HIGH_SEASON_MONTHS = new Set([0, 5, 6, 11])

/**
 * Franja de los doce meses que muestra la temporada de cada uno.
 * Los meses de temporada alta (enero, junio, julio y diciembre) se marcan en ámbar;
 * los meses de la estancia seleccionada se subrayan.
 * @param {Object} props
 * @param {number[]} [props.highlightMonths] Meses (0-11) de la estancia a resaltar.
 * @param {boolean} [props.compact] Versión reducida sin leyenda.
 */
function SeasonStrip({ highlightMonths = [], compact = false }) {
  const highlighted = new Set(highlightMonths)

  return (
    <Stack spacing={1.25}>
      <Box
        role="list"
        aria-label="Temporadas del año"
        sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: '3px' }}
      >
        {MONTHS.map((month, index) => {
          const high = HIGH_SEASON_MONTHS.has(index)
          const inStay = highlighted.has(index)
          return (
            <Box
              key={month}
              role="listitem"
              aria-label={`${month}: temporada ${high ? 'alta' : 'baja'}${inStay ? ', incluido en tu estancia' : ''}`}
              sx={{
                py: compact ? 0.75 : 1.25,
                textAlign: 'center',
                borderRadius: '4px',
                bgcolor: high ? tokens.amber : tokens.ground,
                color: tokens.ink,
                outline: inStay ? `2px solid ${tokens.navy}` : 'none',
                outlineOffset: '-2px',
              }}
            >
              <Typography component="span" sx={{ fontSize: compact ? '0.6875rem' : '0.8125rem', fontWeight: high || inStay ? 800 : 600 }}>
                {month}
              </Typography>
            </Box>
          )
        })}
      </Box>
      {!compact && (
        <Stack direction="row" spacing={2.5} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
          <Legend color={tokens.amber} label="Temporada alta: tarifa base x1.5" />
          <Legend color={tokens.ground} label="Temporada baja: tarifa base" bordered />
        </Stack>
      )}
    </Stack>
  )
}

function Legend({ color, label, bordered = false }) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <Box sx={{ width: 14, height: 14, borderRadius: '3px', bgcolor: color, border: bordered ? `1px solid ${tokens.line}` : 'none' }} />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Stack>
  )
}

export default SeasonStrip
