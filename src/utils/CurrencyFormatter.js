const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

/**
 * Formatea montos en dólares estadounidenses con dos decimales.
 * Usa la configuración en-US para que el resultado sea "$360.00", el formato de referencia del proyecto.
 */
class CurrencyFormatter {
  /**
   * @param {number|string|null|undefined} value Monto a formatear.
   * @returns {string} Por ejemplo "$360.00".
   */
  static format(value) {
    return formatter.format(Number(value ?? 0))
  }
}

export default CurrencyFormatter
