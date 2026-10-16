import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

/**
 * Estado vacío con título, descripción, icono y acciones opcionales.
 * @param {Object} props
 * @param {string} props.title Título principal.
 * @param {string} [props.description] Texto explicativo.
 * @param {ReactNode} [props.icon] Icono decorativo.
 * @param {string} [props.titleComponent='h2'] Etiqueta HTML del título.
 * @param {ReactNode} [props.children] Acciones, por ejemplo un botón.
 */
function EmptyState({ title, description, icon, titleComponent = 'h2', children }) {
  return (
    <Stack alignItems="center" spacing={2} sx={{ py: 6, textAlign: 'center' }}>
      {icon && (
        <Box aria-hidden="true" sx={{ color: 'text.disabled', '& svg': { fontSize: 64 } }}>
          {icon}
        </Box>
      )}
      <Typography variant="h5" component={titleComponent}>
        {title}
      </Typography>
      {description && <Typography color="text.secondary">{description}</Typography>}
      {children}
    </Stack>
  )
}

export default EmptyState
