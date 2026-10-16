import { useState } from 'react'
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import GlobalStyles from '@mui/material/GlobalStyles'
import Stack from '@mui/material/Stack'
import { alpha } from '@mui/material/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PrintIcon from '@mui/icons-material/Print'
import PageContainer from '../components/layout/PageContainer.jsx'
import InvoiceView from '../components/invoice/InvoiceView.jsx'
import ActionSnackbar from '../components/common/ActionSnackbar.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import LoadingState from '../components/common/LoadingState.jsx'
import hotelApiService from '../api/hotelApiInstance.js'
import useAsync from '../hooks/useAsync.js'
import { tokens } from '../theme/theme.js'

// Al imprimir solo queda la hoja de la factura: sin márgenes de página ni notificaciones.
const printStyles = {
  '@media print': {
    main: { paddingTop: '0 !important', paddingBottom: '0 !important' },
    '.MuiSnackbar-root': { display: 'none !important' },
  },
}

const bandButtonSx = {
  color: tokens.white,
  borderColor: tokens.white,
  '&:hover': { borderColor: tokens.white, bgcolor: alpha(tokens.white, 0.12) },
}

/**
 * Página de la factura generada por el servidor para una reserva finalizada.
 */
function InvoicePage() {
  const { reservationId } = useParams()
  const location = useLocation()
  const invoice = useAsync(() => hotelApiService.getInvoice(reservationId), [reservationId])
  const [feedback, setFeedback] = useState(location.state?.feedback ?? null)

  const actions = (
    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
      <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => window.print()} sx={bandButtonSx}>
        Imprimir
      </Button>
      <Button
        component={RouterLink}
        to={`/reservas/${reservationId}`}
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={bandButtonSx}
      >
        Volver a la reserva
      </Button>
    </Stack>
  )

  return (
    <PageContainer
      title={invoice.data ? `Factura ${invoice.data.invoiceNumber}` : 'Factura'}
      subtitle={`Reserva ${reservationId}`}
      actions={actions}
    >
      <GlobalStyles styles={printStyles} />
      <Stack spacing={3}>
        {invoice.loading && !invoice.data && <LoadingState message="Cargando factura..." />}
        {invoice.error && <ErrorAlert message={invoice.error.message} onRetry={() => invoice.execute()} />}
        {invoice.data && <InvoiceView invoice={invoice.data} />}
      </Stack>
      <ActionSnackbar message={feedback} onClose={() => setFeedback(null)} />
    </PageContainer>
  )
}

export default InvoicePage
