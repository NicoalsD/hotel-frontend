import { useState } from 'react'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PageContainer from '../components/layout/PageContainer.jsx'
import DigitalKeyCard from '../components/reservation/DigitalKeyCard.jsx'
import GuestInfoCard from '../components/reservation/GuestInfoCard.jsx'
import ReservationTotalsCard from '../components/reservation/ReservationTotalsCard.jsx'
import StayOverviewCard from '../components/reservation/StayOverviewCard.jsx'
import ServicesPanel from '../components/reservation/ServicesPanel.jsx'
import StayActions from '../components/reservation/StayActions.jsx'
import ActionSnackbar from '../components/common/ActionSnackbar.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import LoadingState from '../components/common/LoadingState.jsx'
import StatusChip from '../components/common/StatusChip.jsx'
import hotelApiService from '../api/hotelApiInstance.js'
import useAsync from '../hooks/useAsync.js'
import DateFormatter from '../utils/DateFormatter.js'
import RoomTypeCatalog from '../utils/RoomTypeCatalog.js'
import { tokens } from '../theme/theme.js'

/**
 * Panel de gestión de una reserva: resumen, huésped, servicios, check-in/check-out y llave digital.
 * Tras el check-out navega a la factura de la reserva.
 */
function ReservationDetailPage() {
  const { reservationId } = useParams()
  const navigate = useNavigate()
  const fetched = useAsync(() => hotelApiService.getReservation(reservationId), [reservationId])
  const [updated, setUpdated] = useState(null)
  const [feedback, setFeedback] = useState(null)

  function handleCheckedIn(reservationUpdated) {
    setUpdated(reservationUpdated)
    setFeedback('Check-in realizado')
  }

  function handleServiceAdded(reservationUpdated) {
    setUpdated(reservationUpdated)
    setFeedback('Servicio agregado')
  }

  const reservation = updated && updated.id === reservationId ? updated : fetched.data

  const subtitle = reservation
    ? [
        reservation.room && `Habitación ${reservation.room.number}`,
        reservation.room && RoomTypeCatalog.label(reservation.room.type),
        `${DateFormatter.format(reservation.checkIn)} - ${DateFormatter.format(reservation.checkOut)}`,
      ]
        .filter(Boolean)
        .join(' · ')
    : undefined

  const statusAction = reservation ? (
    <Box sx={{ display: 'inline-flex', bgcolor: tokens.white, p: 0.75, borderRadius: '8px' }}>
      <StatusChip status={reservation.status} size="medium" />
    </Box>
  ) : undefined

  return (
    <PageContainer title={`Reserva ${reservationId}`} subtitle={subtitle} actions={statusAction}>
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
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={3}>
                <StayOverviewCard reservation={reservation} />
                <GuestInfoCard guest={reservation.guest} />
                <ServicesPanel reservation={reservation} onUpdated={handleServiceAdded} />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={3} sx={{ position: { md: 'sticky' }, top: 24 }}>
                <StayActions
                  reservation={reservation}
                  onCheckedIn={handleCheckedIn}
                  onCheckedOut={() =>
                    navigate(`/reservas/${reservation.id}/factura`, {
                      state: { feedback: 'Check-out realizado' },
                    })
                  }
                />
                <DigitalKeyCard digitalKey={reservation.digitalKey} />
                <ReservationTotalsCard reservation={reservation} />
                {reservation.invoiceNumber && (
                  <Button
                    component={RouterLink}
                    to={`/reservas/${reservation.id}/factura`}
                    variant="outlined"
                    size="large"
                    startIcon={<ReceiptLongIcon />}
                    fullWidth
                  >
                    Ver factura
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        )}
        {reservation?.isFinished && (
          <Typography color="text.secondary">Esta estadía ya finalizó.</Typography>
        )}
      </Stack>
      <ActionSnackbar message={feedback} onClose={() => setFeedback(null)} />
    </PageContainer>
  )
}

export default ReservationDetailPage
