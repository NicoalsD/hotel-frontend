import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

const CURRENT_YEAR = new Date().getFullYear()

/**
 * Pie de página con el nombre del hotel y el año actual.
 */
function AppFooter() {
  return (
    <Box
      component="footer"
      sx={{ py: 3, mt: 'auto', borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {CURRENT_YEAR} Hotel Reservas. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  )
}

export default AppFooter
