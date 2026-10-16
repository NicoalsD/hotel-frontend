/**
 * Servicio disponible en el catálogo del hotel.
 */
class ServiceCatalogItem {
  /**
   * @param {Object} fields Campos planos del catálogo.
   * @param {string} fields.type Tipo de servicio: SPA, BREAKFAST o TRANSFER.
   * @param {string} fields.label Nombre en español.
   * @param {number} fields.unitPrice Precio unitario.
   * @param {string} fields.chargeMode Modo de cobro: FLAT o PER_NIGHT.
   * @param {string} fields.description Descripción en español.
   */
  constructor({ type, label, unitPrice, chargeMode, description }) {
    this.type = type
    this.label = label
    this.unitPrice = unitPrice
    this.chargeMode = chargeMode
    this.description = description
  }

  /**
   * Indica si el servicio se cobra por noche.
   * @returns {boolean}
   */
  get isPerNight() {
    return this.chargeMode === 'PER_NIGHT'
  }

  /**
   * Crea un elemento de catálogo desde el JSON de la API.
   * @param {Object|null} json Elemento de /servicios/catalogo.
   * @returns {ServiceCatalogItem|null} Null cuando no hay datos.
   */
  static fromJson(json) {
    return json ? new ServiceCatalogItem(json) : null
  }
}

export default ServiceCatalogItem
