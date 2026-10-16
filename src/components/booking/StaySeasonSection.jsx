import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import DateFormatter from '../../utils/DateFormatter.js'
import SeasonStrip from '../common/SeasonStrip.jsx'

/**
 * Meses (0-11) en los que cae al menos una noche de la estadía. La salida no cuenta como noche.
 * @param {string} checkIn Fecha de entrada.
 * @param {string} checkOut Fecha de salida.
 * @returns {number[]}
 */
function stayMonths(checkIn, checkOut) {
  const nights = DateFormatter.nightsBetween(checkIn, checkOut)
  const months = new Set()
  let cursor = dayjs(checkIn)
  for (let index = 0; index < nights; index += 1) {
    months.add(cursor.month())
    cursor = cursor.add(1, 'day')
  }
  return [...months]
}

/**
 * Franja compacta de temporadas con los meses de la estadía resaltados y su explicación.
 * @param {Object} props
 * @param {string} props.checkIn Fecha de entrada (YYYY-MM-DD) o vacía.
 * @param {string} props.checkOut Fecha de salida (YYYY-MM-DD) o vacía.
 */
function StaySeasonSection({ checkIn, checkOut }) {
  const highlightMonths = useMemo(() => stayMonths(checkIn, checkOut), [checkIn, checkOut])

  return (
    <Box>
      <SeasonStrip compact highlightMonths={highlightMonths} />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
        Las noches en meses marcados en ámbar se cobran con tarifa de temporada alta.
      </Typography>
    </Box>
  )
}

export default StaySeasonSection
