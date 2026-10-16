import { useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import useAsync from '../hooks/useAsync.js'
import { hotelApiService } from '../api/hotelApiInstance.js'
import PageContainer from '../components/layout/PageContainer.jsx'
import LoadingState from '../components/common/LoadingState.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import BookingStepper from '../components/booking/BookingStepper.jsx'
import SelectedRoomCard from '../components/booking/SelectedRoomCard.jsx'
import StayDateValidator from '../utils/StayDateValidator.js'
import PricePreview from '../components/booking/PricePreview.jsx'

/**
 * Página de reserva para una habitación: resumen, fechas, precio, datos del huésped y confirmación.
 */
function BookingPage() {
  const { roomId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
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
   * Actualiza una fecha en la URL sin perder el resto de parámetros.
   * @param {'checkIn'|'checkOut'} field Campo de fecha.
   * @param {string} value Nuevo valor YYYY-MM-DD.
   */
  const handleDateChange = (field, value) => {
    const next = new URLSearchParams(searchParams)
    next.set(field, value)
    setSearchParams(next, { replace: true })
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
    <PageContainer title="Reservar habitación" subtitle="Completa los datos para confirmar tu estadía.">
      <Stack spacing={3}>
        <BookingStepper activeStep={1} />
        <SelectedRoomCard room={room} />
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Fechas de la estadía
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Entrada"
                value={checkIn}
                onChange={(event) => handleDateChange('checkIn', event.target.value)}
                error={Boolean(dateErrors.checkIn)}
                helperText={dateErrors.checkIn ?? ' '}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Salida"
                value={checkOut}
                onChange={(event) => handleDateChange('checkOut', event.target.value)}
                error={Boolean(dateErrors.checkOut)}
                helperText={dateErrors.checkOut ?? ' '}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
          </Grid>
        </Paper>
        {datesValid ? (
          <PricePreview
            quote={quote.data}
            loading={quote.loading}
            error={quote.error}
            onRetry={() => quote.execute().catch(() => {})}
          />
        ) : (
          <Alert severity="info">Selecciona fechas válidas para ver el precio de la estadía.</Alert>
        )}
      </Stack>
    </PageContainer>
  )
}

export default BookingPage
