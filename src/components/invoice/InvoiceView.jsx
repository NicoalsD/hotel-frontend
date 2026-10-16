import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import PrintIcon from '@mui/icons-material/Print'
import InvoiceHeader from './InvoiceHeader.jsx'
import InvoiceLinesTable from './InvoiceLinesTable.jsx'
import InvoiceTotals from './InvoiceTotals.jsx'

/**
 * Factura completa generada por el servidor, presentada como una hoja de papel con marco.
 * El botón de impresión se marca con la clase "no-print" para ocultarlo al imprimir.
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
        maxWidth: 860,
        mx: 'auto',
        p: { xs: 3, md: 5 },
        '@media print': { border: 'none', boxShadow: 'none', p: 0 },
      }}
    >
      <Stack spacing={3}>
        <Box className="no-print" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => window.print()}>
            Imprimir
          </Button>
        </Box>
        <InvoiceHeader invoice={invoice} />
        <InvoiceLinesTable lines={invoice.lines} />
        <InvoiceTotals invoice={invoice} />
        <Divider />
        <Box sx={{ '@media print': { breakInside: 'avoid' } }}>
          <Typography variant="caption" color="text.secondary" textTransform="uppercase">
            Código de llave digital
          </Typography>
          <Typography sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
            {invoice.digitalKeyCode ?? 'No disponible'}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  )
}

export default InvoiceView
