import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import MoneyText from '../common/MoneyText.jsx'

const CHARGE_MODE_LABELS = {
  FLAT: 'Precio único',
  PER_NIGHT: 'Por noche',
}

/**
 * Lista del catálogo de servicios con un botón para agregar cada uno a la reserva.
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
        <ListItem
          key={item.type}
          disableGutters
          divider
          secondaryAction={
            <Button
              variant="outlined"
              size="small"
              onClick={() => onAdd(item.type)}
              disabled={disabled || pendingType !== null}
              aria-label={`Agregar ${item.label}`}
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
          }
          sx={{ pr: 14 }}
        >
          <ListItemText
            primary={item.label}
            secondary={
              <Stack component="span" spacing={0.25}>
                <span>{item.description}</span>
                <span>
                  <MoneyText value={item.unitPrice} /> · {CHARGE_MODE_LABELS[item.chargeMode] ?? item.chargeMode}
                </span>
              </Stack>
            }
          />
        </ListItem>
      ))}
    </List>
  )
}

export default ServiceCatalogList
