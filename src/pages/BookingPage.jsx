import { useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import useAsync from '../hooks/useAsync.js'
import { hotelApiService } from '../api/hotelApiInstance.js'
import PageContainer from '../components/layout/PageContainer.jsx'
import LoadingState from '../components/common/LoadingState.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import BookingStepper from '../components/booking/BookingStepper.jsx'
import SelectedRoomCard from '../components/booking/SelectedRoomCard.jsx'

/**
 * Página de reserva para una habitación: resumen, fechas, precio, datos del huésped y confirmación.
 */
function BookingPage() {
  const { roomId } = useParams()
  const [searchParams] = useSearchParams()
  const checkIn = searchParams.get('checkIn') ?? ''
  const checkOut = searchParams.get('checkOut') ?? ''

  const rooms = useAsync(() => hotelApiService.listRooms(), [])
  const room = useMemo(
    () => (rooms.data ?? []).find((item) => String(item.id) === String(roomId)) ?? null,
    [rooms.data, roomId],
  )

  if (rooms.loading && !rooms.data) {
    return (
      <PageContainer title="Reservar habitación">
        <LoadingState message="Cargando habitación..." />
      </PageContainer>
    )
  }

  if (rooms.error) {
    return (
      <PageContainer title="Reservar habitación">
        <ErrorAlert message={rooms.error.message} onRetry={() => rooms.execute().catch(() => {})} />
      </PageContainer>
    )
  }

  if (!room) {
    return (
      <PageContainer title="Reservar habitación">
        <EmptyState title="Habitación no encontrada" description="Revisa la habitación seleccionada e intenta de nuevo." />
      </PageContainer>
    )
  }

  return (
    <PageContainer title="Reservar habitación" subtitle="Completa los datos para confirmar tu estadía.">
      <Stack spacing={3}>
        <BookingStepper activeStep={1} />
        <SelectedRoomCard room={room} />
        <Alert severity="info">Las fechas de la reserva se calcularán en el siguiente paso.</Alert>
      </Stack>
    </PageContainer>
  )
}

export default BookingPage
