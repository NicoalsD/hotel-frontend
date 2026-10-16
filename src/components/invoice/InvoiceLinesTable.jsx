import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import MoneyText from '../common/MoneyText.jsx'

/**
 * Tabla de líneas de la factura: estadía por temporada y servicios adicionales.
 * @param {Object} props
 * @param {import('../../models/InvoiceLine.js').default[]} props.lines Líneas de la factura.
 */
function InvoiceLinesTable({ lines }) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small" aria-label="Detalle de la factura">
        <TableHead>
          <TableRow>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Precio unitario</TableCell>
            <TableCell align="right">Importe</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lines.map((line, index) => (
            <TableRow key={`${line.category}-${index}`}>
              <TableCell>{line.description}</TableCell>
              <TableCell align="right">{line.quantity}</TableCell>
              <TableCell align="right">
                <MoneyText value={line.unitPrice} />
              </TableCell>
              <TableCell align="right">
                <MoneyText value={line.amount} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default InvoiceLinesTable
