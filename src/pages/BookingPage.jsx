import { useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import useAsync from '../hooks/useAsync.js'
import { hotelApiService } from '../api/hotelApiInstance.js'
import PageContainer from '../components/layout/PageContainer.jsx'
import LoadingState from '../components/common/LoadingState.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import StayDatesSection from '../components/booking/StayDatesSection.jsx'
import StayDateValidator from '../utils/StayDateValidator.js'
import PriceSummaryCard from '../components/booking/PriceSummaryCard.jsx'
import GuestForm from '../components/booking/GuestForm.jsx'
import Guest from '../models/Guest.js'
import GuestValidator from '../utils/GuestValidator.js'
import ReservationSuccessDialog from '../components/booking/ReservationSuccessDialog.jsx'

/**
 * Página de reserva para una habitación: resumen, fechas, precio, datos del huésped y confirmación.
 */
function BookingPage() {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [guest, setGuest] = useState({ fullName: '', documentNumber: '', email: '', phone: '' })
  const [guestErrors, setGuestErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [createdReservation, setCreatedReservation] = useState(null)
  const checkIn = searchParams.get('checkIn') ?? ''
  const checkOut = searchParams.get('checkOut') ?? ''
  const dateErrors = StayDateValidator.validate(checkIn, checkOut)

  const rooms = useAsync(() => hotelApiService.listRooms(), [])
  const room = useMemo(
    () => (rooms.data ?? []).find((item) => String(item.id) === String(roomId)) ?? null,
    [rooms.data, roomId],
  )

  const roomType = room?.type ?? ''
  const datesValid = StayDateValidator.isValid(checkIn, checkOut)
  const quote = useAsync(
    () => (roomType && datesValid ? hotelApiService.getPriceQuote(roomType, checkIn, checkOut) : null),
    [roomType, checkIn, checkOut],
  )

  /**
   * Actualiza un campo del huésped y limpia su error.
   * @param {string} name Campo del formulario.
   * @param {string} value Nuevo valor.
   */
  const handleGuestChange = (name, value) => {
    setGuest((previous) => ({ ...previous, [name]: value }))
    setGuestErrors((previous) => ({ ...previous, [name]: undefined }))
  }

  /**
   * Valida los datos del huésped antes de enviar la reserva.
   * @param {import('react').FormEvent} event Evento de envío.
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    const errors = GuestValidator.validate(guest)
    setGuestErrors(errors)
    setSubmitError(null)
    if (Object.keys(errors).length > 0) {
      return
    }
    if (!datesValid) {
      setSubmitError('Revisa las fechas de la estadía antes de confirmar la reserva.')
      return
    }

    setSubmitting(true)
    try {
      const reservation = await hotelApiService.createReservation({
        roomId: room.id,
        checkIn,
        checkOut,
        guest: new Guest(guest),
      })
      setCreatedReservation(reservation)
    } catch (error) {
      setSubmitError(error?.message || 'No fue posible crear la reserva. Intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  /**
   * Actualiza una fecha en la URL sin perder el resto de parámetros.
   * @param {'checkIn'|'checkOut'} field Campo de fecha.
   * @param {string} value Nuevo valor YYYY-MM-DD.
   */
  const handleDateChange = (field, value) => {
    const next = new URLSearchParams(searchParams)
    next.set(field, value)
    setSearchParams(next, { replace: true })
    setSubmitError(null)
  }

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
    <PageContainer title="Confirma tu reserva" subtitle={`Habitación ${room.number} · ${room.typeLabel}`}>
      <Grid container spacing={{ xs: 3, md: 4 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={3}>
            <StayDatesSection checkIn={checkIn} checkOut={checkOut} errors={dateErrors} onDateChange={handleDateChange} />
            {submitError && <ErrorAlert message={submitError} />}
            <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 } }}>
              <GuestForm
                values={guest}
                errors={guestErrors}
                onChange={handleGuestChange}
                onSubmit={handleSubmit}
                disabled={submitting}
              />
            </Paper>
          </Stack>
        </Grid>
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{ order: { xs: -1, md: 0 }, alignSelf: 'flex-start', position: { md: 'sticky' }, top: { md: 24 } }}
        >
          <PriceSummaryCard
            room={room}
            checkIn={checkIn}
            checkOut={checkOut}
            quote={quote.data}
            datesValid={datesValid}
            loading={quote.loading}
            error={quote.error}
            onRetry={() => quote.execute().catch(() => {})}
          />
        </Grid>
      </Grid>
      <ReservationSuccessDialog
        open={Boolean(createdReservation)}
        reservationId={createdReservation?.id ?? ''}
        onContinue={() => createdReservation && navigate(`/reservas/${createdReservation.id}`)}
      />
    </PageContainer>
  )
}

export default BookingPage
