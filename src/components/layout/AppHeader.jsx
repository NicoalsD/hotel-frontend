import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import BrandMark from '../brand/BrandMark.jsx'
import { tokens } from '../../theme/theme.js'

const NAV_ITEMS = [
  { label: 'Buscar habitaciones', to: '/buscar' },
  { label: 'Mis reservas', to: '/reservas' },
]

/**
 * Encabezado azul marino con la marca y la navegación principal.
 */
function AppHeader() {
  const { pathname } = useLocation()

  return (
    <Box component="header" className="no-print" sx={{ bgcolor: tokens.navy, color: tokens.white }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minHeight: 64, flexWrap: 'wrap', py: 1 }}>
          <BrandMark />
          <Box component="nav" aria-label="Navegación principal" sx={{ display: 'flex', gap: 0.5, ml: 'auto' }}>
            {NAV_ITEMS.map((item) => {
              const active = pathname.startsWith(item.to)
              return (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  sx={{
                    color: tokens.white,
                    fontWeight: 600,
                    px: { xs: 1.25, sm: 2 },
                    bgcolor: active ? 'rgba(255, 255, 255, 0.14)' : 'transparent',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.10)' },
                  }}
                >
                  {item.label}
                </Button>
              )
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default AppHeader
