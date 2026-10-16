import { useState } from 'react'
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PageContainer from '../components/layout/PageContainer.jsx'
import InvoiceView from '../components/invoice/InvoiceView.jsx'
import ActionSnackbar from '../components/common/ActionSnackbar.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import LoadingState from '../components/common/LoadingState.jsx'
import hotelApiService from '../api/hotelApiInstance.js'
import useAsync from '../hooks/useAsync.js'

/**
 * Página de la factura generada por el servidor para una reserva finalizada.
 */
function InvoicePage() {
  const { reservationId } = useParams()
  const location = useLocation()
  const invoice = useAsync(() => hotelApiService.getInvoice(reservationId), [reservationId])
  const [feedback, setFeedback] = useState(location.state?.feedback ?? null)

  return (
    <PageContainer title="Factura" subtitle={`Reserva ${reservationId}`}>
      <Stack spacing={3}>
        <Button
          component={RouterLink}
          to={`/reservas/${reservationId}`}
          startIcon={<ArrowBackIcon />}
          className="no-print"
          sx={{ alignSelf: 'flex-start' }}
        >
          Volver a la reserva
        </Button>
        {invoice.loading && !invoice.data && <LoadingState message="Cargando factura..." />}
        {invoice.error && <ErrorAlert message={invoice.error.message} onRetry={() => invoice.execute()} />}
        {invoice.data && <InvoiceView invoice={invoice.data} />}
      </Stack>
      <ActionSnackbar message={feedback} onClose={() => setFeedback(null)} />
    </PageContainer>
  )
}

export default InvoicePage
