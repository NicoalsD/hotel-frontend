import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import RoomTypeCatalog from '../../utils/RoomTypeCatalog.js'

export const SORT_OPTIONS = [
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'number', label: 'Número de habitación' },
]

/**
 * Panel de filtros de resultados: tipo de habitación (en la URL), disponibilidad y orden (en cliente).
 * @param {Object} props
 * @param {string} props.roomType Tipo seleccionado (SINGLE, DOUBLE, SUITE) o cadena vacía para todos.
 * @param {(type: string) => void} props.onRoomTypeChange Se invoca con el nuevo tipo.
 * @param {boolean} props.availableOnly Muestra solo habitaciones disponibles.
 * @param {(value: boolean) => void} props.onAvailableOnlyChange Se invoca al cambiar el interruptor.
 * @param {string} props.sortBy Criterio de orden: price-asc, price-desc o number.
 * @param {(value: string) => void} props.onSortChange Se invoca con el nuevo criterio.
 */
function SearchFilters({ roomType, onRoomTypeChange, availableOnly, onAvailableOnlyChange, sortBy, onSortChange }) {
  return (
    <Paper variant="outlined" component="section" aria-labelledby="search-filters-title" sx={{ p: 2.5 }}>
      <Stack spacing={2.5}>
        <Typography id="search-filters-title" variant="h5" component="h2">
          Filtrar por
        </Typography>

        <FormControl>
          <Typography variant="subtitle2" component="span" id="room-type-filter-label" sx={{ mb: 0.5 }}>
            Tipo de habitación
          </Typography>
          <RadioGroup
            aria-labelledby="room-type-filter-label"
            name="roomType"
            value={roomType}
            onChange={(event) => onRoomTypeChange(event.target.value)}
          >
            <FormControlLabel value="" control={<Radio size="small" />} label="Todos" />
            {RoomTypeCatalog.all().map((entry) => (
              <FormControlLabel key={entry.type} value={entry.type} control={<Radio size="small" />} label={entry.label} />
            ))}
          </RadioGroup>
        </FormControl>

        <Box>
          <FormControlLabel
            control={<Switch checked={availableOnly} onChange={(event) => onAvailableOnlyChange(event.target.checked)} />}
            label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Solo habitaciones disponibles</Typography>}
          />
        </Box>

        <TextField
          select
          fullWidth
          size="small"
          label="Ordenar por"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    </Paper>
  )
}

export default SearchFilters
