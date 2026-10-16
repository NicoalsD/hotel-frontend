import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import SeasonStrip from '../common/SeasonStrip.jsx'
import DateFormatter from '../../utils/DateFormatter.js'

/**
 * Meses (0-11) en los que caen las noches de la estancia. La fecha de salida no cuenta como noche.
 * @param {string} checkIn Fecha de entrada (YYYY-MM-DD).
 * @param {string} checkOut Fecha de salida (YYYY-MM-DD).
 * @returns {number[]}
 */
function monthsOfStay(checkIn, checkOut) {
  const nights = DateFormatter.nightsBetween(checkIn, checkOut)
  const months = new Set()
  for (let offset = 0; offset < nights; offset += 1) {
    months.add(dayjs(checkIn).add(offset, 'day').month())
  }
  return [...months]
}

/**
 * Franja compacta de temporadas con los meses de la estancia resaltados.
 * @param {Object} props
 * @param {string} props.checkIn Fecha de entrada; vacía cuando no hay fechas.
 * @param {string} props.checkOut Fecha de salida; vacía cuando no hay fechas.
 */
function StaySeasonPanel({ checkIn, checkOut }) {
  const hasStay = DateFormatter.nightsBetween(checkIn, checkOut) > 0

  return (
    <Paper variant="outlined" component="section" aria-labelledby="stay-season-title" sx={{ p: 2.5 }}>
      <Stack spacing={1.5}>
        <Typography id="stay-season-title" variant="h5" component="h2">
          Temporadas del año
        </Typography>
        <SeasonStrip compact highlightMonths={hasStay ? monthsOfStay(checkIn, checkOut) : []} />
        <Typography variant="body2" color="text.secondary">
          {hasStay
            ? 'El recuadro marca los meses de tu estancia. Los meses en ámbar son temporada alta.'
            : 'Los meses en ámbar son temporada alta. Elige fechas para resaltar tu estancia.'}
        </Typography>
      </Stack>
    </Paper>
  )
}

export default StaySeasonPanel
