/**
 * Huésped que realiza una reserva.
 */
class Guest {
  /**
   * @param {Object} [fields]
   * @param {string} [fields.fullName] Nombre completo.
   * @param {string} [fields.documentNumber] Número de documento.
   * @param {string} [fields.email] Correo electrónico.
   * @param {string} [fields.phone] Teléfono de contacto.
   */
  constructor({ fullName = '', documentNumber = '', email = '', phone = '' } = {}) {
    this.fullName = fullName
    this.documentNumber = documentNumber
    this.email = email
    this.phone = phone
  }

  /**
   * Primer nombre del huésped.
   * @returns {string}
   */
  get firstName() {
    return this.fullName.trim().split(/\s+/)[0] ?? ''
  }

  /**
   * Crea un huésped desde el JSON de la API.
   * @param {Object|null} json Datos del huésped.
   * @returns {Guest|null} Null cuando no hay datos.
   */
  static fromJson(json) {
    return json ? new Guest(json) : null
  }

  /**
   * Convierte el huésped al formato que espera el backend.
   * @returns {{fullName: string, documentNumber: string, email: string, phone: string}}
   */
  toJson() {
    return {
      fullName: this.fullName,
      documentNumber: this.documentNumber,
      email: this.email,
      phone: this.phone,
    }
  }
}

export default Guest
