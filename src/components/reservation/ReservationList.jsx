import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import EmptyState from '../common/EmptyState.jsx'
import StatusChip from '../common/StatusChip.jsx'
import DateFormatter from '../../utils/DateFormatter.js'
import RoomTypeCatalog from '../../utils/RoomTypeCatalog.js'
import StatusPresenter from '../../utils/StatusPresenter.js'

const STATUS_FILTERS = ['ALL', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT']

/**
 * Tabla con todas las reservas, de la más reciente a la más antigua, con filtro por estado.
 * @param {Object} props
 * @param {import('../../models/Reservation.js').default[]} props.reservations Reservas a mostrar.
 */
function ReservationList({ reservations }) {
  const [statusFilter, setStatusFilter] = useState('ALL')

  if (reservations.length === 0) {
    return <EmptyState title="No hay reservas registradas" description="Las reservas que se creen aparecerán aquí." />
  }

  const visibleReservations =
    statusFilter === 'ALL' ? reservations : reservations.filter((reservation) => reservation.status === statusFilter)

  return (
    <Stack spacing={2}>
      <ToggleButtonGroup
        aria-label="Filtrar reservas por estado"
        value={statusFilter}
        exclusive
        size="small"
        onChange={(_event, value) => {
          if (value !== null) {
            setStatusFilter(value)
          }
        }}
        sx={{ flexWrap: 'wrap', alignSelf: 'flex-start' }}
      >
        {STATUS_FILTERS.map((status) => (
          <ToggleButton key={status} value={status}>
            {status === 'ALL' ? 'Todas' : StatusPresenter.present(status).label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Typography variant="body2" color="text.secondary" aria-live="polite">
        Mostrando {visibleReservations.length} de {reservations.length} reservas
      </Typography>
      {visibleReservations.length === 0 ? (
        <EmptyState
          title="No hay reservas con este estado"
          description="Pruebe con otro filtro para ver más reservas."
        />
      ) : (
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
              {visibleReservations.map((reservation) => (
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
      )}
    </Stack>
  )
}

export default ReservationList
