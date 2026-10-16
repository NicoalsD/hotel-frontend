import { Link as RouterLink, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PageContainer from '../components/layout/PageContainer.jsx'
import GuestInfoCard from '../components/reservation/GuestInfoCard.jsx'
import ReservationSummary from '../components/reservation/ReservationSummary.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import LoadingState from '../components/common/LoadingState.jsx'
import hotelApiService from '../api/hotelApiInstance.js'
import useAsync from '../hooks/useAsync.js'

/**
 * Panel de gestión de una reserva: resumen y datos del huésped.
 */
function ReservationDetailPage() {
  const { reservationId } = useParams()
  const fetched = useAsync(() => hotelApiService.getReservation(reservationId), [reservationId])
  const reservation = fetched.data

  return (
    <PageContainer title={`Reserva ${reservationId}`}>
      <Stack spacing={3}>
        <Button component={RouterLink} to="/reservas" startIcon={<ArrowBackIcon />} sx={{ alignSelf: 'flex-start' }}>
          Volver a reservas
        </Button>
        {fetched.loading && !fetched.data && <LoadingState message="Cargando reserva..." />}
        {fetched.error && <ErrorAlert message={fetched.error.message} onRetry={() => fetched.execute()} />}
        {reservation && (
          <>
            <ReservationSummary reservation={reservation} />
            <GuestInfoCard guest={reservation.guest} />
          </>
        )}
      </Stack>
    </PageContainer>
  )
}

export default ReservationDetailPage
