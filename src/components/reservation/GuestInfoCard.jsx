import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import BadgeIcon from '@mui/icons-material/Badge'

/**
 * Línea de dato con icono para la tarjeta del huésped.
 */
function InfoLine({ icon, children }) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <Stack aria-hidden="true" sx={{ color: 'text.secondary' }}>
        {icon}
      </Stack>
      <Typography>{children}</Typography>
    </Stack>
  )
}

/**
 * Tarjeta con los datos de contacto del huésped titular.
 * @param {Object} props
 * @param {import('../../models/Guest.js').default|null} props.guest Huésped de la reserva.
 */
function GuestInfoCard({ guest }) {
  return (
    <Card variant="outlined" component="section" aria-labelledby="datos-huesped">
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack spacing={1.5}>
          <Typography id="datos-huesped" variant="h4" component="h2">
            Datos del huésped
          </Typography>
          {guest ? (
            <>
              <Typography sx={{ fontWeight: 700 }}>
                {guest.fullName}
              </Typography>
              <InfoLine icon={<BadgeIcon fontSize="small" />}>Documento: {guest.documentNumber}</InfoLine>
              <InfoLine icon={<EmailIcon fontSize="small" />}>{guest.email}</InfoLine>
              <InfoLine icon={<PhoneIcon fontSize="small" />}>{guest.phone}</InfoLine>
            </>
          ) : (
            <Typography color="text.secondary">No hay datos del huésped.</Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default GuestInfoCard
