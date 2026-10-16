import TuneIcon from '@mui/icons-material/Tune'
import Button from '@mui/material/Button'

/**
 * Botón que muestra u oculta los filtros en pantallas pequeñas.
 * @param {Object} props
 * @param {boolean} props.open Si los filtros están visibles.
 * @param {() => void} props.onToggle Alterna la visibilidad.
 */
function FiltersToggleButton({ open, onToggle }) {
  return (
    <Button
      variant="outlined"
      fullWidth
      startIcon={<TuneIcon />}
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="search-sidebar"
      sx={{ display: { md: 'none' }, bgcolor: 'background.paper' }}
    >
      {open ? 'Ocultar filtros' : 'Filtrar y ordenar'}
    </Button>
  )
}

export default FiltersToggleButton
