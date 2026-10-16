import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const FIELDS = [
  { name: 'fullName', label: 'Nombre completo', autoComplete: 'name', span: 6, hint: 'Escribe el nombre tal como aparece en tu documento' },
  { name: 'documentNumber', label: 'Número de documento', autoComplete: 'off', span: 6, hint: 'Cédula o pasaporte, sin puntos ni espacios' },
  { name: 'phone', label: 'Teléfono', autoComplete: 'tel', span: 6, hint: 'Incluye el indicativo del país, por ejemplo +57' },
  { name: 'email', label: 'Correo electrónico', autoComplete: 'email', span: 6, type: 'email', hint: 'Enviaremos la confirmación de la reserva a este correo' },
]

/**
 * Formulario controlado con los datos del huésped. La validación la realiza el padre.
 * @param {Object} props
 * @param {{fullName: string, documentNumber: string, email: string, phone: string}} props.values Valores actuales.
 * @param {Object<string, string>} props.errors Errores por campo.
 * @param {(name: string, value: string) => void} props.onChange Cambio de un campo.
 * @param {(event: import('react').FormEvent) => void} props.onSubmit Envío del formulario.
 * @param {boolean} [props.disabled=false] Deshabilita los campos y el botón.
 */
function GuestForm({ values, errors, onChange, onSubmit, disabled = false }) {
  return (
    <Box component="form" noValidate onSubmit={onSubmit} aria-label="Formulario de datos del huésped">
      <Stack spacing={3}>
        <Typography variant="h3" component="h2">
          Datos del huésped
        </Typography>
        <Grid container spacing={2}>
          {FIELDS.map((field) => (
            <Grid key={field.name} size={{ xs: 12, sm: field.span }}>
              <TextField
                fullWidth
                id={`guest-${field.name}`}
                name={field.name}
                label={field.label}
                type={field.type ?? 'text'}
                value={values[field.name] ?? ''}
                onChange={(event) => onChange(field.name, event.target.value)}
                error={Boolean(errors[field.name])}
                helperText={errors[field.name] ?? field.hint ?? ' '}
                autoComplete={field.autoComplete}
                disabled={disabled}
                required
              />
            </Grid>
          ))}
        </Grid>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={disabled}
          aria-label="Confirmar reserva con los datos del huésped"
          sx={{ width: { xs: '100%', md: 'auto' }, alignSelf: { md: 'flex-end' }, minWidth: { md: 240 } }}
        >
          Confirmar reserva
        </Button>
      </Stack>
    </Box>
  )
}

export default GuestForm
