const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Valida los datos del huésped y devuelve mensajes de error en español.
 */
class GuestValidator {
  /**
   * @param {{fullName?: string, documentNumber?: string, email?: string, phone?: string}} guest Datos del formulario.
   * @returns {Object<string, string>} Errores por campo; objeto vacío cuando todo es válido.
   */
  static validate(guest = {}) {
    const errors = {}
    const fullName = (guest.fullName ?? '').trim()
    const documentNumber = (guest.documentNumber ?? '').trim()
    const email = (guest.email ?? '').trim()
    const phone = (guest.phone ?? '').trim()

    if (!fullName) {
      errors.fullName = 'El nombre completo es obligatorio'
    }
    if (!documentNumber) {
      errors.documentNumber = 'El número de documento es obligatorio'
    }
    if (!email) {
      errors.email = 'El correo electrónico es obligatorio'
    } else if (!EMAIL_PATTERN.test(email)) {
      errors.email = 'El correo electrónico no es válido'
    }
    if (!phone) {
      errors.phone = 'El teléfono es obligatorio'
    }
    return errors
  }

  /**
   * Indica si los datos del huésped son válidos.
   * @param {Object} guest Datos del formulario.
   * @returns {boolean}
   */
  static isValid(guest) {
    return Object.keys(GuestValidator.validate(guest)).length === 0
  }
}

export default GuestValidator
