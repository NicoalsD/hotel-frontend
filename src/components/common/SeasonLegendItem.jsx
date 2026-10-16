import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { tokens } from '../../theme/theme.js'

/**
 * Elemento de la leyenda de temporadas: muestra de color y descripción.
 * @param {Object} props
 * @param {string} props.color Color de la muestra.
 * @param {string} props.label Texto de la leyenda.
 * @param {boolean} [props.bordered] Dibuja un borde cuando la muestra es clara.
 */
function SeasonLegendItem({ color, label, bordered = false }) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <Box
        aria-hidden="true"
        sx={{ width: 14, height: 14, borderRadius: '3px', bgcolor: color, border: bordered ? `1px solid ${tokens.line}` : 'none' }}
      />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Stack>
  )
}

export default SeasonLegendItem
