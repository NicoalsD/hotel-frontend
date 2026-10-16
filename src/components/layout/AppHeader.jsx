import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Inicio', to: '/' },
  { label: 'Buscar', to: '/buscar' },
  { label: 'Reservas', to: '/reservas' },
]

/**
 * Encabezado de la aplicación con la marca y la navegación principal.
 */
function AppHeader() {
  const { pathname } = useLocation()

  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2, flexWrap: 'wrap', py: 1 }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 700, mr: 'auto' }}
          >
            Hotel Reservas
          </Typography>
          <Box component="nav" aria-label="Navegación principal" sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {NAV_ITEMS.map((item) => {
              const active = item.to === '/' ? pathname === '/' : pathname.startsWith(item.to)
              return (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  color="inherit"
                  aria-current={active ? 'page' : undefined}
                  sx={{
                    borderRadius: 0,
                    borderBottom: '2px solid',
                    borderColor: active ? 'secondary.main' : 'transparent',
                  }}
                >
                  {item.label}
                </Button>
              )
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default AppHeader
