/**
 * Servicio adicional contratado dentro de una reserva.
 */
class AdditionalService {
  /**
   * @param {Object} fields Campos planos del servicio.
   * @param {string} fields.id Identificador del servicio (SRV-n).
   * @param {string} fields.type Tipo: SPA, BREAKFAST o TRANSFER.
   * @param {string} fields.label Nombre en español.
   * @param {string} fields.chargeMode Modo de cobro: FLAT o PER_NIGHT.
   * @param {number} fields.unitPrice Precio unitario.
   * @param {number} fields.quantity Cantidad facturada.
   * @param {number} fields.total Total del servicio.
   * @param {string} fields.addedAt Fecha y hora en que se agregó (ISO LocalDateTime).
   */
  constructor({ id, type, label, chargeMode, unitPrice, quantity, total, addedAt }) {
    this.id = id
    this.type = type
    this.label = label
    this.chargeMode = chargeMode
    this.unitPrice = unitPrice
    this.quantity = quantity
    this.total = total
    this.addedAt = addedAt
  }

  /**
   * Indica si el servicio se cobra por noche.
   * @returns {boolean}
   */
  get isPerNight() {
    return this.chargeMode === 'PER_NIGHT'
  }

  /**
   * Crea un servicio adicional desde el JSON de la API.
   * @param {Object|null} json Elemento de services de la reserva.
   * @returns {AdditionalService|null} Null cuando no hay datos.
   */
  static fromJson(json) {
    return json ? new AdditionalService(json) : null
  }
}

export default AdditionalService
