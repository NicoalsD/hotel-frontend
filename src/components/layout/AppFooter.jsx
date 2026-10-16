import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

/**
 * Pie de página con el nombre del hotel y el año actual.
 */
function AppFooter() {
  const year = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{ py: 3, mt: 'auto', borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {year} Hotel Reservas. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  )
}

export default AppFooter
