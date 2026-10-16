/**
 * Llave digital emitida al realizar el check-in de una reserva.
 */
class DigitalKey {
  /**
   * @param {Object} fields Campos planos de la llave.
   * @param {string} fields.code Código UUID de la llave.
   * @param {string} fields.roomNumber Número de la habitación asociada.
   * @param {string} fields.issuedAt Fecha y hora de emisión (ISO LocalDateTime).
   * @param {boolean} fields.active Indica si la llave sigue vigente.
   */
  constructor({ code, roomNumber, issuedAt, active }) {
    this.code = code
    this.roomNumber = roomNumber
    this.issuedAt = issuedAt
    this.active = active
  }

  /**
   * Indica si la llave fue revocada (por ejemplo, tras el check-out).
   * @returns {boolean}
   */
  get isRevoked() {
    return !this.active
  }

  /**
   * Crea una llave digital desde el JSON de la API.
   * @param {Object|null} json Objeto digitalKey de la reserva.
   * @returns {DigitalKey|null} Null cuando la reserva no tiene llave.
   */
  static fromJson(json) {
    return json ? new DigitalKey(json) : null
  }
}

export default DigitalKey
