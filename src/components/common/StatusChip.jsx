import Chip from '@mui/material/Chip'
import StatusPresenter from '../../utils/StatusPresenter.js'

/**
 * Chip con el estado de una reserva, con etiqueta y color según StatusPresenter.
 * @param {Object} props
 * @param {string} props.status Estado de la reserva (CONFIRMED, CHECKED_IN, CHECKED_OUT).
 * @param {'small'|'medium'} [props.size='small'] Tamaño del chip.
 */
function StatusChip({ status, size = 'small' }) {
  const { label, color } = StatusPresenter.present(status)
  return <Chip label={label} color={color} size={size} />
}

export default StatusChip
