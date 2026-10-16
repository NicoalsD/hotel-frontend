import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DateFormatter from '../../utils/DateFormatter.js'
import MoneyText from '../common/MoneyText.jsx'

/**
 * Tabla con el precio de cada noche de la estadía y su temporada.
 * @param {Object} props
 * @param {import('../../models/NightlyRate.js').default[]} props.rates Tarifas por noche.
 */
function NightlyRatesTable({ rates }) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small" aria-label="Desglose de tarifas por noche">
        <TableHead>
          <TableRow>
            <TableCell scope="col">Noche</TableCell>
            <TableCell scope="col">Temporada</TableCell>
            <TableCell scope="col" align="right">Precio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rates.map((rate) => (
            <TableRow key={rate.date}>
              <TableCell>{DateFormatter.format(rate.date)}</TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={rate.seasonLabel}
                  color={rate.isHighSeason ? 'warning' : 'success'}
                  aria-label={`Temporada: ${rate.seasonLabel}`}
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right">
                <MoneyText value={rate.price} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default NightlyRatesTable
