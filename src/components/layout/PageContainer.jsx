import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AppFooter from './AppFooter.jsx'
import AppHeader from './AppHeader.jsx'
import { tokens } from '../../theme/theme.js'

/**
 * Estructura base de cada página: encabezado, banda de título opcional, contenido y pie de página.
 * La banda azul marino continúa el encabezado, como en los buscadores de hoteles; el contenido de
 * `band` (por ejemplo el buscador) queda montado sobre su borde inferior.
 * @param {Object} props
 * @param {string} [props.title] Título principal de la página (h1).
 * @param {string} [props.subtitle] Texto breve bajo el título.
 * @param {ReactNode} [props.band] Contenido que se superpone al borde de la banda (buscador).
 * @param {ReactNode} [props.actions] Acciones a la derecha del título.
 * @param {'lg'|'md'} [props.maxWidth] Ancho máximo del contenido.
 * @param {ReactNode} props.children Contenido de la página.
 */
function PageContainer({ title, subtitle, band, actions, maxWidth = 'lg', children }) {
  const hasBand = Boolean(title || band)

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: tokens.white }}>
      <AppHeader />
      {hasBand && (
        <Box className="no-print" sx={{ bgcolor: tokens.navy, color: tokens.white, pb: band ? 0 : 4 }}>
          <Container maxWidth={maxWidth}>
            {title && (
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ pt: { xs: 2, md: 3 }, pb: band ? 3 : 0, alignItems: { sm: 'flex-end' }, justifyContent: 'space-between' }}
              >
                <Box>
                  <Typography variant="h2" component="h1" sx={{ color: tokens.white }}>
                    {title}
                  </Typography>
                  {subtitle && (
                    <Typography sx={{ mt: 0.75, color: 'rgba(255,255,255,0.82)' }}>{subtitle}</Typography>
                  )}
                </Box>
                {actions && <Box sx={{ flexShrink: 0 }}>{actions}</Box>}
              </Stack>
            )}
            {band && <Box sx={{ position: 'relative', top: 28, mt: title ? 0 : 3 }}>{band}</Box>}
          </Container>
        </Box>
      )}
      <Container component="main" maxWidth={maxWidth} sx={{ flexGrow: 1, pt: band ? 8 : 4, pb: 8 }}>
        {children}
      </Container>
      <AppFooter />
    </Box>
  )
}

export default PageContainer
