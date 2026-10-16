import PageContainer from '../components/layout/PageContainer.jsx'
import ReservationList from '../components/reservation/ReservationList.jsx'
import ReservationLookup from '../components/reservation/ReservationLookup.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import LoadingState from '../components/common/LoadingState.jsx'
import hotelApiService from '../api/hotelApiInstance.js'
import useAsync from '../hooks/useAsync.js'

/**
 * Página de reservas: buscador por código y listado de todas las reservas.
 */
function ReservationsPage() {
  const reservations = useAsync(() => hotelApiService.listReservations(), [])

  return (
    <PageContainer title="Reservas" subtitle="Busque una reserva por su código o revise el listado completo.">
      <ReservationLookup />
      {reservations.loading && !reservations.data && <LoadingState message="Cargando reservas..." />}
      {reservations.error && (
        <ErrorAlert message="No se pudieron cargar las reservas." onRetry={() => reservations.execute()} />
      )}
      {reservations.data && <ReservationList reservations={reservations.data} />}
    </PageContainer>
  )
}

export default ReservationsPage
