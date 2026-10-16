import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AppFooter from './AppFooter.jsx'
import AppHeader from './AppHeader.jsx'

/**
 * Estructura base de cada página: encabezado, contenido principal y pie de página.
 * @param {Object} props
 * @param {string} [props.title] Título principal de la página (h1).
 * @param {string} [props.subtitle] Texto breve bajo el título.
 * @param {ReactNode} props.children Contenido de la página.
 */
function PageContainer({ title, subtitle, children }) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppHeader />
      <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        {title && (
          <Stack spacing={1} sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1">
              {title}
            </Typography>
            {subtitle && <Typography color="text.secondary">{subtitle}</Typography>}
          </Stack>
        )}
        {children}
      </Container>
      <AppFooter />
    </Box>
  )
}

export default PageContainer
