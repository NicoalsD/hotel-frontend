/**
 * Resultado de disponibilidad de una habitación para un rango de fechas.
 */
class RoomAvailability {
  /**
   * @param {Object} fields Campos planos del resultado de disponibilidad.
   * @param {number} fields.roomId Identificador de la habitación.
   * @param {string} fields.number Número de habitación.
   * @param {string} fields.type Tipo de habitación.
   * @param {string} fields.typeLabel Nombre del tipo en español.
   * @param {number} fields.floor Piso.
   * @param {number} fields.capacity Capacidad de personas.
   * @param {number} fields.basePrice Precio base por noche.
   * @param {string} fields.description Descripción en español.
   * @param {boolean} fields.available Indica si está libre en las fechas.
   * @param {number} fields.nights Número de noches consultadas.
   * @param {number} fields.estimatedTotal Total estimado de la estadía.
   */
  constructor({
    roomId,
    number,
    type,
    typeLabel,
    floor,
    capacity,
    basePrice,
    description,
    available,
    nights,
    estimatedTotal,
  }) {
    this.roomId = roomId
    this.number = number
    this.type = type
    this.typeLabel = typeLabel
    this.floor = floor
    this.capacity = capacity
    this.basePrice = basePrice
    this.description = description
    this.available = available
    this.nights = nights
    this.estimatedTotal = estimatedTotal
  }

  /**
   * Texto de disponibilidad para mostrar al usuario.
   * @returns {string}
   */
  get availabilityLabel() {
    return this.available ? 'Disponible' : 'No disponible'
  }

  /**
   * Indica si la habitación puede reservarse en las fechas consultadas.
   * @returns {boolean}
   */
  get canBeBooked() {
    return this.available
  }

  /**
   * Crea un resultado de disponibilidad desde el JSON de la API.
   * @param {Object|null} json Elemento de la respuesta de disponibilidad.
   * @returns {RoomAvailability|null} Null cuando no hay datos.
   */
  static fromJson(json) {
    return json ? new RoomAvailability(json) : null
  }
}

export default RoomAvailability
