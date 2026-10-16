import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AddedServicesTable from './AddedServicesTable.jsx'
import ServiceCatalogList from './ServiceCatalogList.jsx'
import ErrorAlert from '../common/ErrorAlert.jsx'
import LoadingState from '../common/LoadingState.jsx'
import hotelApiService from '../../api/hotelApiInstance.js'
import useAsync from '../../hooks/useAsync.js'

/**
 * Panel para agregar servicios del catálogo a una reserva activa y ver los ya agregados.
 * @param {Object} props
 * @param {import('../../models/Reservation.js').default} props.reservation Reserva en gestión.
 * @param {Function} props.onUpdated Recibe la reserva actualizada tras agregar un servicio.
 */
function ServicesPanel({ reservation, onUpdated }) {
  const catalog = useAsync(() => hotelApiService.getServiceCatalog(), [])
  const [pendingType, setPendingType] = useState(null)
  const [actionError, setActionError] = useState(null)

  async function handleAdd(serviceType) {
    setPendingType(serviceType)
    setActionError(null)
    try {
      const updated = await hotelApiService.addService(reservation.id, serviceType)
      onUpdated(updated)
    } catch (error) {
      setActionError(error.message)
    } finally {
      setPendingType(null)
    }
  }

  return (
    <Card variant="outlined" component="section" aria-labelledby="servicios-reserva">
      <CardContent>
        <Stack spacing={2}>
          <Typography id="servicios-reserva" variant="h6" component="h2">
            Servicios adicionales
          </Typography>
          {actionError && <ErrorAlert message={actionError} />}
          {catalog.loading && !catalog.data && <LoadingState message="Cargando catálogo..." />}
          {catalog.error && <ErrorAlert message="No se pudo cargar el catálogo de servicios." onRetry={() => catalog.execute()} />}
          {catalog.data && (
            <ServiceCatalogList
              items={catalog.data}
              onAdd={handleAdd}
              disabled={!reservation.canAddServices}
              pendingType={pendingType}
            />
          )}
          {!reservation.canAddServices && (
            <Alert severity="info">Los servicios solo pueden agregarse a reservas activas.</Alert>
          )}
          <AddedServicesTable services={reservation.services} />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ServicesPanel
