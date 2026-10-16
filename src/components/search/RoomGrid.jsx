import Grid from '@mui/material/Grid'
import RoomCard from './RoomCard.jsx'

/**
 * Cuadrícula con todas las habitaciones consultadas.
 * @param {Object} props
 * @param {Array<import('../../models/RoomAvailability.js').default>} props.rooms Habitaciones a mostrar.
 * @param {(room: import('../../models/RoomAvailability.js').default) => void} props.onSelect Selección de una habitación.
 */
function RoomGrid({ rooms, onSelect }) {
  return (
    <Grid container spacing={3} component="ul" aria-label="Habitaciones" sx={{ listStyle: 'none', p: 0, m: 0 }}>
      {rooms.map((room) => (
        <Grid key={room.roomId} size={{ xs: 12, sm: 6, md: 4 }} component="li">
          <RoomCard room={room} onSelect={onSelect} />
        </Grid>
      ))}
    </Grid>
  )
}

export default RoomGrid
