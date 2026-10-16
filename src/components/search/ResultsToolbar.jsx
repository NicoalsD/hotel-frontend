import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

/**
 * Encabezado de la lista de resultados con el conteo de habitaciones disponibles.
 * @param {Object} props
 * @param {number} props.availableCount Habitaciones disponibles en las fechas.
 * @param {number} props.totalCount Habitaciones consultadas.
 * @param {number} props.visibleCount Habitaciones que se muestran tras los filtros.
 */
function ResultsToolbar({ availableCount, totalCount, visibleCount }) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={0.5} sx={{ justifyContent: 'space-between', alignItems: { sm: 'baseline' } }}>
      <Typography variant="h5" component="h2" role="status" aria-live="polite">
        {availableCount} de {totalCount} habitaciones disponibles
      </Typography>
      {visibleCount !== totalCount && (
        <Typography variant="body2" color="text.secondary">
          Mostrando {visibleCount} {visibleCount === 1 ? 'habitación' : 'habitaciones'} con tus filtros
        </Typography>
      )}
    </Stack>
  )
}

export default ResultsToolbar
