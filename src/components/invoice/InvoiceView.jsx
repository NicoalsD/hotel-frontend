import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import InvoiceFooter from './InvoiceFooter.jsx'
import InvoiceHeader from './InvoiceHeader.jsx'
import InvoiceLinesTable from './InvoiceLinesTable.jsx'
import InvoiceTotals from './InvoiceTotals.jsx'

/**
 * Factura completa generada por el servidor, presentada como una hoja de papel con marco.
 * @param {Object} props
 * @param {import('../../models/Invoice.js').default} props.invoice Factura a mostrar.
 */
function InvoiceView({ invoice }) {
  return (
    <Paper
      variant="outlined"
      component="article"
      aria-label={`Factura ${invoice.invoiceNumber}`}
      sx={{
        width: '100%',
        maxWidth: 860,
        alignSelf: 'center',
        p: { xs: 3, md: 5 },
        '@media print': { border: 'none', boxShadow: 'none', p: 0 },
      }}
    >
      <Stack spacing={3}>
        <InvoiceHeader invoice={invoice} />
        <InvoiceLinesTable lines={invoice.lines} />
        <InvoiceTotals invoice={invoice} />
        <Divider />
        <InvoiceFooter digitalKeyCode={invoice.digitalKeyCode} />
      </Stack>
    </Paper>
  )
}

export default InvoiceView
