import { useState } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PageContainer from '../components/layout/PageContainer.jsx'
import GuestInfoCard from '../components/reservation/GuestInfoCard.jsx'
import ReservationSummary from '../components/reservation/ReservationSummary.jsx'
import ServicesPanel from '../components/reservation/ServicesPanel.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import LoadingState from '../components/common/LoadingState.jsx'
import hotelApiService from '../api/hotelApiInstance.js'
import useAsync from '../hooks/useAsync.js'

/**
 * Panel de gestión de una reserva: resumen, huésped, servicios, check-in/check-out y llave digital.
 * Tras el check-out navega a la factura de la reserva.
 */
function ReservationDetailPage() {
  const { reservationId } = useParams()
  const fetched = useAsync(() => hotelApiService.getReservation(reservationId), [reservationId])
  const [updated, setUpdated] = useState(null)

  const reservation = updated && updated.id === reservationId ? updated : fetched.data

  return (
    <PageContainer title={`Reserva ${reservationId}`}>
      <Stack spacing={3}>
        <Button component={RouterLink} to="/reservas" startIcon={<ArrowBackIcon />} sx={{ alignSelf: 'flex-start' }}>
          Volver a reservas
        </Button>
        {fetched.loading && !fetched.data && <LoadingState message="Cargando reserva..." />}
        {fetched.error && (
          <ErrorAlert message={fetched.error.message} onRetry={() => fetched.execute()} />
        )}
        {reservation && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Stack spacing={3}>
                <ReservationSummary reservation={reservation} />
                <GuestInfoCard guest={reservation.guest} />
                <ServicesPanel reservation={reservation} onUpdated={setUpdated} />
              </Stack>
            </Grid>
          </Grid>
        )}
        {reservation?.isFinished && (
          <Typography color="text.secondary">Esta estadía ya finalizó.</Typography>
        )}
      </Stack>
    </PageContainer>
  )
}

export default ReservationDetailPage
