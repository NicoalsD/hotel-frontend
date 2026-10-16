/**
 * Habitación del hotel con su tipo, precio base y estado actual.
 */
class Room {
  /**
   * @param {Object} fields Campos planos de la habitación.
   * @param {number} fields.id Identificador.
   * @param {string} fields.number Número de habitación.
   * @param {string} fields.type Tipo: SINGLE, DOUBLE o SUITE.
   * @param {string} fields.typeLabel Nombre del tipo en español.
   * @param {number} fields.floor Piso.
   * @param {number} fields.capacity Capacidad de personas.
   * @param {number} fields.basePrice Precio base por noche.
   * @param {string} fields.description Descripción en español.
   * @param {string} fields.status Estado: AVAILABLE u OCCUPIED.
   * @param {string} fields.statusLabel Estado en español.
   */
  constructor({
    id,
    number,
    type,
    typeLabel,
    floor,
    capacity,
    basePrice,
    description,
    status,
    statusLabel,
  }) {
    this.id = id
    this.number = number
    this.type = type
    this.typeLabel = typeLabel
    this.floor = floor
    this.capacity = capacity
    this.basePrice = basePrice
    this.description = description
    this.status = status
    this.statusLabel = statusLabel
  }

  /**
   * Indica si la habitación está disponible actualmente.
   * @returns {boolean}
   */
  get isAvailable() {
    return this.status === 'AVAILABLE'
  }

  /**
   * Indica si la habitación está ocupada.
   * @returns {boolean}
   */
  get isOccupied() {
    return this.status === 'OCCUPIED'
  }

  /**
   * Crea una habitación desde el JSON de la API.
   * @param {Object|null} json RoomDTO.
   * @returns {Room|null} Null cuando no hay datos.
   */
  static fromJson(json) {
    return json ? new Room(json) : null
  }
}

export default Room
