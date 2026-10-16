import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import PrintIcon from '@mui/icons-material/Print'
import InvoiceHeader from './InvoiceHeader.jsx'
import InvoiceLinesTable from './InvoiceLinesTable.jsx'
import InvoiceTotals from './InvoiceTotals.jsx'

/**
 * Factura completa generada por el servidor, con botón para imprimir.
 * Los botones se marcan con la clase "no-print" para ocultarlos en la impresión.
 * @param {Object} props
 * @param {import('../../models/Invoice.js').default} props.invoice Factura a mostrar.
 */
function InvoiceView({ invoice }) {
  return (
    <Card
      variant="outlined"
      component="article"
      aria-label={`Factura ${invoice.invoiceNumber}`}
      sx={{ '@media print': { border: 'none', boxShadow: 'none' } }}
    >
      <CardContent sx={{ '@media print': { p: 0, '&:last-child': { pb: 0 } } }}>
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
          <Box>
            <Typography variant="caption" color="text.secondary" textTransform="uppercase">
              Código de llave digital
            </Typography>
            <Typography sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
              {invoice.digitalKeyCode ?? 'No disponible'}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default InvoiceView
