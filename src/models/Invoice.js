import Guest from './Guest.js'
import InvoiceLine from './InvoiceLine.js'

/**
 * Factura generada por el servidor al hacer check-out.
 */
class Invoice {
  /**
   * @param {Object} fields Campos de la factura.
   * @param {string} fields.invoiceNumber Número de factura (FAC-n).
   * @param {string} fields.reservationId Código de la reserva.
   * @param {string} fields.issuedAt Fecha de emisión (ISO LocalDateTime).
   * @param {Guest|null} fields.guest Huésped.
   * @param {string} fields.roomNumber Número de habitación.
   * @param {string} fields.roomType Tipo de habitación.
   * @param {string} fields.roomTypeLabel Tipo de habitación en español.
   * @param {string} fields.checkIn Fecha de entrada (YYYY-MM-DD).
   * @param {string} fields.checkOut Fecha de salida (YYYY-MM-DD).
   * @param {number} fields.nights Número de noches.
   * @param {InvoiceLine[]} [fields.lines=[]] Líneas de la factura.
   * @param {number} fields.roomSubtotal Subtotal de habitación.
   * @param {number} fields.servicesSubtotal Subtotal de servicios.
   * @param {number} fields.subtotal Subtotal general.
   * @param {number} fields.taxRate Tasa de impuesto (0.19 para IVA 19%).
   * @param {number} fields.taxAmount Valor del impuesto.
   * @param {number} fields.total Total a pagar.
   * @param {string|null} [fields.digitalKeyCode=null] Código de la llave digital.
   */
  constructor({
    invoiceNumber,
    reservationId,
    issuedAt,
    guest,
    roomNumber,
    roomType,
    roomTypeLabel,
    checkIn,
    checkOut,
    nights,
    lines = [],
    roomSubtotal,
    servicesSubtotal,
    subtotal,
    taxRate,
    taxAmount,
    total,
    digitalKeyCode = null,
  }) {
    this.invoiceNumber = invoiceNumber
    this.reservationId = reservationId
    this.issuedAt = issuedAt
    this.guest = guest
    this.roomNumber = roomNumber
    this.roomType = roomType
    this.roomTypeLabel = roomTypeLabel
    this.checkIn = checkIn
    this.checkOut = checkOut
    this.nights = nights
    this.lines = lines
    this.roomSubtotal = roomSubtotal
    this.servicesSubtotal = servicesSubtotal
    this.subtotal = subtotal
    this.taxRate = taxRate
    this.taxAmount = taxAmount
    this.total = total
    this.digitalKeyCode = digitalKeyCode
  }

  /**
   * Líneas de habitación de la factura.
   * @returns {InvoiceLine[]}
   */
  get roomLines() {
    return this.lines.filter((line) => line.isRoom)
  }

  /**
   * Líneas de servicios adicionales de la factura.
   * @returns {InvoiceLine[]}
   */
  get serviceLines() {
    return this.lines.filter((line) => line.isService)
  }

  /**
   * Porcentaje de impuesto entero (19 para IVA 19%).
   * @returns {number}
   */
  get taxPercentage() {
    return Math.round(this.taxRate * 100)
  }

  /**
   * Crea una factura desde el JSON de la API, construyendo huésped y líneas.
   * @param {Object|null} json InvoiceDTO.
   * @returns {Invoice|null} Null cuando no hay datos.
   */
  static fromJson(json) {
    if (!json) {
      return null
    }
    return new Invoice({
      ...json,
      guest: Guest.fromJson(json.guest),
      lines: (json.lines ?? []).map((line) => InvoiceLine.fromJson(line)),
    })
  }
}

export default Invoice
