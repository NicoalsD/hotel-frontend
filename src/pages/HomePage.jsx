import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import AppFooter from '../components/layout/AppFooter.jsx'
import AppHeader from '../components/layout/AppHeader.jsx'
import HomeHero from '../components/home/HomeHero.jsx'
import ManageBookingBand from '../components/home/ManageBookingBand.jsx'
import RoomTypeShowcase from '../components/home/RoomTypeShowcase.jsx'
import SeasonRatesSection from '../components/home/SeasonRatesSection.jsx'
import ServicesShowcase from '../components/home/ServicesShowcase.jsx'

/**
 * Página de inicio: buscador sobre la fotografía del hotel, tipos de habitación,
 * tarifas por temporada, servicios adicionales y acceso a la gestión de reservas.
 */
function HomePage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppHeader />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <HomeHero />
        <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 10 } }}>
          <Stack spacing={{ xs: 7, md: 9 }}>
            <RoomTypeShowcase />
            <SeasonRatesSection />
            <ServicesShowcase />
            <ManageBookingBand />
          </Stack>
        </Container>
      </Box>
      <AppFooter />
    </Box>
  )
}

export default HomePage
