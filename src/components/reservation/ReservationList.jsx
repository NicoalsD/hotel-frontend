import { Link as RouterLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import EmptyState from '../common/EmptyState.jsx'
import StatusChip from '../common/StatusChip.jsx'
import DateFormatter from '../../utils/DateFormatter.js'
import RoomTypeCatalog from '../../utils/RoomTypeCatalog.js'

/**
 * Tabla con todas las reservas, de la más reciente a la más antigua.
 * @param {Object} props
 * @param {import('../../models/Reservation.js').default[]} props.reservations Reservas a mostrar.
 */
function ReservationList({ reservations }) {
  if (reservations.length === 0) {
    return <EmptyState title="No hay reservas registradas" description="Las reservas que se creen aparecerán aquí." />
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table aria-label="Lista de reservas">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Huésped</TableCell>
            <TableCell>Habitación</TableCell>
            <TableCell>Fechas</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id} hover>
              <TableCell>{reservation.id}</TableCell>
              <TableCell>{reservation.guest?.fullName}</TableCell>
              <TableCell>
                {reservation.room
                  ? `${reservation.room.number} (${RoomTypeCatalog.label(reservation.room.type)})`
                  : 'Sin asignar'}
              </TableCell>
              <TableCell>
                {DateFormatter.format(reservation.checkIn)} - {DateFormatter.format(reservation.checkOut)}
              </TableCell>
              <TableCell>
                <StatusChip status={reservation.status} />
              </TableCell>
              <TableCell align="right">
                <Button component={RouterLink} to={`/reservas/${reservation.id}`} size="small">
                  Gestionar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ReservationList
