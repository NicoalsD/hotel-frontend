import AdditionalService from './AdditionalService.js'
import DigitalKey from './DigitalKey.js'
import Guest from './Guest.js'
import Room from './Room.js'

const CONFIRMED = 'CONFIRMED'
const CHECKED_IN = 'CHECKED_IN'
const CHECKED_OUT = 'CHECKED_OUT'

/**
 * Reserva del hotel con su huésped, habitación, servicios y llave digital.
 */
class Reservation {
  /**
   * @param {Object} fields Campos de la reserva.
   * @param {string} fields.id Código de reserva (RES-n).
   * @param {string} fields.status Estado: CONFIRMED, CHECKED_IN o CHECKED_OUT.
   * @param {string} fields.statusLabel Estado en español.
   * @param {Guest|null} fields.guest Huésped titular.
   * @param {Room|null} fields.room Habitación asignada.
   * @param {string} fields.checkIn Fecha de entrada (YYYY-MM-DD).
   * @param {string} fields.checkOut Fecha de salida (YYYY-MM-DD).
   * @param {number} fields.nights Número de noches.
   * @param {number} fields.roomTotal Total de la habitación.
   * @param {AdditionalService[]} [fields.services=[]] Servicios agregados.
   * @param {number} fields.servicesTotal Total de servicios.
   * @param {number} fields.estimatedTotal Total estimado (habitación más servicios).
   * @param {DigitalKey|null} [fields.digitalKey=null] Llave digital, si existe.
   * @param {string|null} [fields.invoiceNumber=null] Número de factura, si existe.
   * @param {string} fields.createdAt Fecha de creación (ISO LocalDateTime).
   * @param {string|null} [fields.checkedInAt=null] Fecha del check-in.
   * @param {string|null} [fields.checkedOutAt=null] Fecha del check-out.
   */
  constructor({
    id,
    status,
    statusLabel,
    guest,
    room,
    checkIn,
    checkOut,
    nights,
    roomTotal,
    services = [],
    servicesTotal,
    estimatedTotal,
    digitalKey = null,
    invoiceNumber = null,
    createdAt,
    checkedInAt = null,
    checkedOutAt = null,
  }) {
    this.id = id
    this.status = status
    this.statusLabel = statusLabel
    this.guest = guest
    this.room = room
    this.checkIn = checkIn
    this.checkOut = checkOut
    this.nights = nights
    this.roomTotal = roomTotal
    this.services = services
    this.servicesTotal = servicesTotal
    this.estimatedTotal = estimatedTotal
    this.digitalKey = digitalKey
    this.invoiceNumber = invoiceNumber
    this.createdAt = createdAt
    this.checkedInAt = checkedInAt
    this.checkedOutAt = checkedOutAt
  }

  /**
   * Indica si la reserva puede hacer check-in.
   * @returns {boolean}
   */
  get canCheckIn() {
    return this.status === CONFIRMED
  }

  /**
   * Indica si la reserva puede hacer check-out.
   * @returns {boolean}
   */
  get canCheckOut() {
    return this.status === CHECKED_IN
  }

  /**
   * Indica si todavía se pueden agregar servicios a la reserva.
   * @returns {boolean}
   */
  get canAddServices() {
    return this.status === CONFIRMED || this.status === CHECKED_IN
  }

  /**
   * Indica si la estadía ya terminó.
   * @returns {boolean}
   */
  get isFinished() {
    return this.status === CHECKED_OUT
  }

  /**
   * Crea una reserva desde el JSON de la API, construyendo sus entidades anidadas.
   * @param {Object|null} json ReservationDTO.
   * @returns {Reservation|null} Null cuando no hay datos.
   */
  static fromJson(json) {
    if (!json) {
      return null
    }
    return new Reservation({
      ...json,
      guest: Guest.fromJson(json.guest),
      room: Room.fromJson(json.room),
      services: (json.services ?? []).map((service) => AdditionalService.fromJson(service)),
      digitalKey: DigitalKey.fromJson(json.digitalKey),
    })
  }
}

export default Reservation
