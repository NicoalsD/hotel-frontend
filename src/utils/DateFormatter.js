import dayjs from 'dayjs'
import 'dayjs/locale/es.js'

const DISPLAY_FORMAT = 'D MMM YYYY'
const ISO_FORMAT = 'YYYY-MM-DD'

/**
 * Utilidades de fechas en español. Las fechas de la API llegan como YYYY-MM-DD.
 */
class DateFormatter {
  /**
   * Formatea una fecha ISO para mostrarla al usuario, por ejemplo "16 oct 2026".
   * @param {string|null|undefined} isoDate Fecha en formato YYYY-MM-DD o ISO LocalDateTime.
   * @returns {string} Cadena vacía cuando no hay fecha.
   */
  static format(isoDate) {
    if (!isoDate) {
      return ''
    }
    return dayjs(isoDate).locale('es').format(DISPLAY_FORMAT)
  }

  /**
   * Cuenta las noches entre dos fechas (salida exclusiva).
   * @param {string} checkIn Fecha de entrada.
   * @param {string} checkOut Fecha de salida.
   * @returns {number} Noches, nunca negativas.
   */
  static nightsBetween(checkIn, checkOut) {
    if (!checkIn || !checkOut) {
      return 0
    }
    return Math.max(0, dayjs(checkOut).diff(dayjs(checkIn), 'day'))
  }

  /**
   * Fecha actual en formato YYYY-MM-DD.
   * @returns {string}
   */
  static today() {
    return dayjs().format(ISO_FORMAT)
  }
}

export default DateFormatter
