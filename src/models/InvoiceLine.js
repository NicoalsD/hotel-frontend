/**
 * Línea de una factura: una estadía por temporada o un servicio adicional.
 */
class InvoiceLine {
  /**
   * @param {Object} fields Campos planos de la línea.
   * @param {string} fields.description Descripción en español.
   * @param {string} fields.category Categoría: ROOM o SERVICE.
   * @param {number} fields.quantity Cantidad facturada.
   * @param {number} fields.unitPrice Precio unitario.
   * @param {number} fields.amount Importe de la línea.
   */
  constructor({ description, category, quantity, unitPrice, amount }) {
    this.description = description
    this.category = category
    this.quantity = quantity
    this.unitPrice = unitPrice
    this.amount = amount
  }

  /**
   * Indica si la línea corresponde a la habitación.
   * @returns {boolean}
   */
  get isRoom() {
    return this.category === 'ROOM'
  }

  /**
   * Indica si la línea corresponde a un servicio adicional.
   * @returns {boolean}
   */
  get isService() {
    return this.category === 'SERVICE'
  }

  /**
   * Crea una línea de factura desde el JSON de la API.
   * @param {Object|null} json Elemento de lines de la factura.
   * @returns {InvoiceLine|null} Null cuando no hay datos.
   */
  static fromJson(json) {
    return json ? new InvoiceLine(json) : null
  }
}

export default InvoiceLine
