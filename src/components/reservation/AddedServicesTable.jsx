import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import MoneyText from '../common/MoneyText.jsx'
import DateFormatter from '../../utils/DateFormatter.js'

/**
 * Tabla con los servicios ya agregados a la reserva.
 * @param {Object} props
 * @param {import('../../models/AdditionalService.js').default[]} props.services Servicios agregados.
 */
function AddedServicesTable({ services }) {
  if (services.length === 0) {
    return <Typography color="text.secondary">Aún no se han agregado servicios a esta reserva.</Typography>
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small" aria-label="Servicios agregados">
        <TableHead>
          <TableRow>
            <TableCell>Servicio</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell align="right">Precio unitario</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.label}</TableCell>
              <TableCell>{DateFormatter.format(service.addedAt)}</TableCell>
              <TableCell align="right">
                <MoneyText value={service.unitPrice} />
              </TableCell>
              <TableCell align="right">{service.quantity}</TableCell>
              <TableCell align="right">
                <MoneyText value={service.total} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AddedServicesTable
