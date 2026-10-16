import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
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
import MoneyText from '../common/MoneyText.jsx'
import StatusChip from '../common/StatusChip.jsx'
import DateFormatter from '../../utils/DateFormatter.js'
import RoomTypeCatalog from '../../utils/RoomTypeCatalog.js'
import StatusPresenter from '../../utils/StatusPresenter.js'
import { tokens } from '../../theme/theme.js'

const STATUS_FILTERS = ['ALL', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT']
const DESKTOP_ONLY = { display: { xs: 'none', md: 'table-cell' } }

/**
 * Texto de fechas de una reserva, por ejemplo "16 oct 2026 - 18 oct 2026".
 * @param {import('../../models/Reservation.js').default} reservation Reserva.
 * @returns {string}
 */
function stayDates(reservation) {
  return `${DateFormatter.format(reservation.checkIn)} - ${DateFormatter.format(reservation.checkOut)}`
}

/**
 * Tabla con todas las reservas, de la más reciente a la más antigua, con filtro por estado.
 * El código de cada reserva enlaza a su gestión; en pantallas pequeñas las fechas se muestran bajo el huésped.
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
    <Stack spacing={2.5}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ alignItems: { sm: 'center' }, justifyContent: 'space-between' }}>
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
          sx={{ flexWrap: 'wrap' }}
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
      </Stack>
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
                <TableCell sx={DESKTOP_ONLY}>Habitación</TableCell>
                <TableCell sx={DESKTOP_ONLY}>Fechas</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleReservations.map((reservation) => (
                <TableRow key={reservation.id} hover>
                  <TableCell>
                    <Link component={RouterLink} to={`/reservas/${reservation.id}`} sx={{ fontWeight: 800, color: tokens.navy }}>
                      {reservation.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {reservation.guest?.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'block', md: 'none' } }}>
                      {stayDates(reservation)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={DESKTOP_ONLY}>
                    {reservation.room
                      ? `${reservation.room.number} (${RoomTypeCatalog.label(reservation.room.type)})`
                      : 'Sin asignar'}
                  </TableCell>
                  <TableCell sx={DESKTOP_ONLY}>{stayDates(reservation)}</TableCell>
                  <TableCell>
                    <StatusChip status={reservation.status} />
                  </TableCell>
                  <TableCell align="right">
                    <MoneyText value={reservation.estimatedTotal} sx={{ fontWeight: 800, color: 'text.primary' }} />
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
