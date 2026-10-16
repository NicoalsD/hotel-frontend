import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

/**
 * Fila etiqueta-valor del resumen (entrada, salida).
 * @param {Object} props
 * @param {string} props.label Etiqueta de la fila.
 * @param {string} props.value Valor a mostrar.
 */
function SummaryRow({ label, value }) {
  return (
    <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right' }}>
        {value}
      </Typography>
    </Stack>
  )
}

export default SummaryRow
