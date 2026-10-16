import Typography from '@mui/material/Typography'
import CurrencyFormatter from '../../utils/CurrencyFormatter.js'

/**
 * Texto con un monto formateado en dólares. Acepta las mismas props que Typography.
 * @param {Object} props
 * @param {number} props.value Monto a mostrar.
 */
function MoneyText({ value, ...typographyProps }) {
  return (
    <Typography component="span" {...typographyProps}>
      {CurrencyFormatter.format(value)}
    </Typography>
  )
}

export default MoneyText
