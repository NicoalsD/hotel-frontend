import DateFormatter from './DateFormatter.js'

/**
 * Valida el rango de fechas de una estadía (fechas en formato YYYY-MM-DD).
 */
class StayDateValidator {
  /**
   * @param {string} checkIn Fecha de entrada.
   * @param {string} checkOut Fecha de salida.
   * @returns {{checkIn?: string, checkOut?: string}} Errores por campo en español; vacío si el rango es válido.
   */
  static validate(checkIn, checkOut) {
    const errors = {}
    if (!checkIn) {
      errors.checkIn = 'Selecciona la fecha de entrada'
    } else if (checkIn < DateFormatter.today()) {
      errors.checkIn = 'La fecha de entrada no puede ser anterior a hoy'
    }
    if (!checkOut) {
      errors.checkOut = 'Selecciona la fecha de salida'
    } else if (checkIn && checkOut <= checkIn) {
      errors.checkOut = 'La fecha de salida debe ser posterior a la entrada'
    }
    return errors
  }

  /**
   * Indica si el rango de fechas es válido para cotizar y reservar.
   * @param {string} checkIn Fecha de entrada.
   * @param {string} checkOut Fecha de salida.
   * @returns {boolean}
   */
  static isValid(checkIn, checkOut) {
    return Object.keys(StayDateValidator.validate(checkIn, checkOut)).length === 0
  }
}

export default StayDateValidator
