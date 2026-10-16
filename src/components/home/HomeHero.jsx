import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import SearchForm from '../search/SearchForm.jsx'
import RoomImageCatalog from '../../utils/RoomImageCatalog.js'
import DateFormatter from '../../utils/DateFormatter.js'
import { tokens } from '../../theme/theme.js'

/**
 * Portada con la fotografía del hotel y el buscador montado sobre su borde inferior.
 */
function HomeHero() {
  const navigate = useNavigate()
  const checkIn = dayjs(DateFormatter.today()).add(1, 'day').format('YYYY-MM-DD')
  const checkOut = dayjs(checkIn).add(2, 'day').format('YYYY-MM-DD')

  const handleSearch = (values) => {
    const params = new URLSearchParams({ checkIn: values.checkIn, checkOut: values.checkOut })
    if (values.roomType) {
      params.set('roomType', values.roomType)
    }
    navigate(`/buscar?${params.toString()}`)
  }

  return (
    <Box component="section" aria-labelledby="home-hero-title" sx={{ position: 'relative', mb: { xs: 4, md: 6 } }}>
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: 420, md: 500 },
          backgroundImage: `url(${RoomImageCatalog.hero()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 60%',
          display: 'flex',
          alignItems: 'center',
          '&::before': { content: '""', position: 'absolute', inset: 0, bgcolor: 'rgba(7, 27, 51, 0.58)' },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', color: tokens.white, pt: 6, pb: { xs: 16, md: 12 } }}>
          <Typography id="home-hero-title" variant="h1" sx={{ maxWidth: 720, textWrap: 'balance' }}>
            Reserva tu habitación en Hotel Reservas UCC
          </Typography>
          <Typography sx={{ mt: 2, maxWidth: 560, fontSize: { xs: '1.05rem', md: '1.2rem' }, color: 'rgba(255,255,255,0.88)' }}>
            Consulta la disponibilidad por fechas, compara la tarifa de cada temporada y gestiona tu estancia desde un
            solo lugar.
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ position: 'relative', mt: { xs: -12, md: -5 } }}>
        <SearchForm initialValues={{ checkIn, checkOut, roomType: '' }} onSubmit={handleSearch} submitLabel="Buscar" />
      </Container>
    </Box>
  )
}

export default HomeHero
