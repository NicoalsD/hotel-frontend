import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import MoneyText from '../common/MoneyText.jsx'
import RoomImageCatalog from '../../utils/RoomImageCatalog.js'
import { tokens } from '../../theme/theme.js'

const CHARGE_MODE_LABELS = {
  FLAT: 'Precio único',
  PER_NIGHT: 'Por noche',
}

/**
 * Miniatura cuadrada del servicio; si no hay fotografía muestra un recuadro neutro.
 * @param {Object} props
 * @param {string} props.type Tipo de servicio del catálogo.
 */
function ServiceThumbnail({ type }) {
  const thumbnailSx = { width: 64, height: 64, borderRadius: '8px', flexShrink: 0, objectFit: 'cover' }
  const src = RoomImageCatalog.forService(type)

  if (!src) {
    return <Box aria-hidden="true" sx={{ ...thumbnailSx, bgcolor: tokens.ground }} />
  }
  return <Box component="img" src={src} alt="" loading="lazy" sx={thumbnailSx} />
}

/**
 * Lista del catálogo de servicios en filas horizontales, cada una con un botón para agregarla a la reserva.
 * @param {Object} props
 * @param {import('../../models/ServiceCatalogItem.js').default[]} props.items Servicios del catálogo.
 * @param {Function} props.onAdd Acción al pulsar "Agregar"; recibe el tipo de servicio.
 * @param {boolean} [props.disabled=false] Deshabilita los botones (por ejemplo, reserva finalizada).
 * @param {string|null} [props.pendingType=null] Tipo de servicio que se está agregando.
 */
function ServiceCatalogList({ items, onAdd, disabled = false, pendingType = null }) {
  if (items.length === 0) {
    return <Typography color="text.secondary">No hay servicios disponibles en el catálogo.</Typography>
  }

  return (
    <List disablePadding aria-label="Catálogo de servicios">
      {items.map((item) => (
        <ListItem key={item.type} disableGutters divider sx={{ py: 2, gap: 2, alignItems: 'center', flexWrap: 'nowrap' }}>
          <ServiceThumbnail type={item.type} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography component="p" sx={{ fontWeight: 700 }}>
              {item.label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              <MoneyText value={item.unitPrice} sx={{ fontWeight: 800, color: 'text.primary' }} />{' '}
              {CHARGE_MODE_LABELS[item.chargeMode] ?? item.chargeMode}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onAdd(item.type)}
            disabled={disabled || pendingType !== null}
            aria-label={`Agregar ${item.label}`}
            sx={{ flexShrink: 0 }}
          >
            {pendingType === item.type ? (
              <>
                <CircularProgress size={14} color="inherit" sx={{ mr: 1 }} />
                Agregando...
              </>
            ) : (
              'Agregar'
            )}
          </Button>
        </ListItem>
      ))}
    </List>
  )
}

export default ServiceCatalogList
