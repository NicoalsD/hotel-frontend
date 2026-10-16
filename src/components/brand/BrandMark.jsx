import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'
import { tokens } from '../../theme/theme.js'

/**
 * Logotipo tipográfico de Hotel Reservas UCC.
 * @param {Object} props
 * @param {'light'|'dark'} [props.tone] Color del texto según el fondo.
 */
function BrandMark({ tone = 'light' }) {
  const color = tone === 'light' ? tokens.white : tokens.navy

  return (
    <Box
      component={RouterLink}
      to="/"
      aria-label="Hotel Reservas UCC, ir al inicio"
      sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, textDecoration: 'none', color }}
    >
      <Box
        aria-hidden="true"
        sx={{
          width: 34,
          height: 34,
          borderRadius: '6px',
          bgcolor: tokens.amber,
          color: tokens.navy,
          display: 'grid',
          placeItems: 'center',
          fontWeight: 800,
          fontSize: '1.05rem',
          letterSpacing: '-0.02em',
        }}
      >
        H
      </Box>
      <Typography component="span" sx={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.01em', lineHeight: 1 }}>
        Hotel Reservas{' '}
        <Box component="span" sx={{ color: tone === 'light' ? tokens.amber : tokens.action }}>
          UCC
        </Box>
      </Typography>
    </Box>
  )
}

export default BrandMark
