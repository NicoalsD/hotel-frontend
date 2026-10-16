import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import RoomTypeCatalog from '../../utils/RoomTypeCatalog.js'

/**
 * Selector del tipo de habitación. El valor vacío significa todos los tipos.
 * @param {Object} props
 * @param {string} props.value Tipo seleccionado (SINGLE, DOUBLE, SUITE) o cadena vacía.
 * @param {(type: string) => void} props.onChange Se invoca con el nuevo tipo.
 */
function RoomTypeFilter({ value, onChange }) {
  return (
    <TextField
      select
      fullWidth
      label="Tipo de habitación"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <MenuItem value="">Todos los tipos</MenuItem>
      {RoomTypeCatalog.all().map((entry) => (
        <MenuItem key={entry.type} value={entry.type}>
          {entry.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default RoomTypeFilter
