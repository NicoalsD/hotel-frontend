import PriceQuote from '../models/PriceQuote.js'
import Invoice from '../models/Invoice.js'
import Reservation from '../models/Reservation.js'
import Room from '../models/Room.js'
import RoomAvailability from '../models/RoomAvailability.js'
import ServiceCatalogItem from '../models/ServiceCatalogItem.js'
import HttpClient from './HttpClient.js'

const BASE_PATH = '/api/hotel'

/**
 * Servicio de alto nivel para los endpoints del hotel. Devuelve instancias de modelos.
 */
class HotelApiService {
  /**
   * @param {HttpClient} httpClient Cliente HTTP a utilizar.
   */
  constructor(httpClient) {
    this.httpClient = httpClient
  }

  /**
   * Consulta la disponibilidad de habitaciones en un rango de fechas.
   * @param {string} checkIn Fecha de entrada (YYYY-MM-DD).
   * @param {string} checkOut Fecha de salida (YYYY-MM-DD).
   * @param {string} [roomType] Tipo de habitación; si se omite se consultan todos.
   * @returns {Promise<RoomAvailability[]>}
   */
  async searchAvailability(checkIn, checkOut, roomType) {
    const json = await this.httpClient.get(`${BASE_PATH}/disponibilidad`, {
      checkIn,
      checkOut,
      roomType,
    })
    return json.map((item) => RoomAvailability.fromJson(item))
  }

  /**
   * Obtiene la cotización de precio para un tipo de habitación y fechas.
   * @param {string} roomType Tipo de habitación.
   * @param {string} checkIn Fecha de entrada (YYYY-MM-DD).
   * @param {string} checkOut Fecha de salida (YYYY-MM-DD).
   * @returns {Promise<PriceQuote>}
   */
  async getPriceQuote(roomType, checkIn, checkOut) {
    const json = await this.httpClient.get(`${BASE_PATH}/tarifa`, { roomType, checkIn, checkOut })
    return PriceQuote.fromJson(json)
  }

  /**
   * Lista todas las habitaciones con su estado actual.
   * @returns {Promise<Room[]>}
   */
  async listRooms() {
    const json = await this.httpClient.get(`${BASE_PATH}/habitaciones`)
    return json.map((item) => Room.fromJson(item))
  }
}

  /**
   * Crea una reserva para una habitación y un huésped.
   * @param {{roomId: number, checkIn: string, checkOut: string, guest: import('../models/Guest.js').default|Object}} request
   * @returns {Promise<Reservation>}
   */
  async createReservation(request) {
    const guest = request.guest?.toJson ? request.guest.toJson() : request.guest
    const json = await this.httpClient.post(`${BASE_PATH}/reservar`, {
      roomId: request.roomId,
      checkIn: request.checkIn,
      checkOut: request.checkOut,
      guest,
    })
    return Reservation.fromJson(json)
  }

  /**
   * Obtiene una reserva por su código.
   * @param {string} reservationId Código de reserva (RES-n).
   * @returns {Promise<Reservation>}
   */
  async getReservation(reservationId) {
    const json = await this.httpClient.get(`${BASE_PATH}/reserva/${encodeURIComponent(reservationId)}`)
    return Reservation.fromJson(json)
  }

  /**
   * Lista todas las reservas, de la más reciente a la más antigua.
   * @returns {Promise<Reservation[]>}
   */
  async listReservations() {
    const json = await this.httpClient.get(`${BASE_PATH}/reservas`)
    return json.map((item) => Reservation.fromJson(item))
  }
}

  /**
   * Agrega un servicio adicional a una reserva activa.
   * @param {string} reservationId Código de reserva.
   * @param {string} serviceType Tipo de servicio: SPA, BREAKFAST o TRANSFER.
   * @returns {Promise<Reservation>} Reserva actualizada.
   */
  async addService(reservationId, serviceType) {
    const json = await this.httpClient.post(
      `${BASE_PATH}/servicios/${encodeURIComponent(reservationId)}`,
      { serviceType },
    )
    return Reservation.fromJson(json)
  }

  /**
   * Obtiene el catálogo de servicios adicionales.
   * @returns {Promise<ServiceCatalogItem[]>}
   */
  async getServiceCatalog() {
    const json = await this.httpClient.get(`${BASE_PATH}/servicios/catalogo`)
    return json.map((item) => ServiceCatalogItem.fromJson(item))
  }

  /**
   * Realiza el check-in de una reserva confirmada y emite la llave digital.
   * @param {string} reservationId Código de reserva.
   * @returns {Promise<Reservation>}
   */
  async checkIn(reservationId) {
    const json = await this.httpClient.put(`${BASE_PATH}/checkin/${encodeURIComponent(reservationId)}`)
    return Reservation.fromJson(json)
  }

  /**
   * Realiza el check-out de una reserva y devuelve la factura generada.
   * @param {string} reservationId Código de reserva.
   * @returns {Promise<Invoice>}
   */
  async checkOut(reservationId) {
    const json = await this.httpClient.put(`${BASE_PATH}/checkout/${encodeURIComponent(reservationId)}`)
    return Invoice.fromJson(json)
  }

  /**
   * Obtiene la factura de una reserva ya finalizada.
   * @param {string} reservationId Código de reserva.
   * @returns {Promise<Invoice>}
   */
  async getInvoice(reservationId) {
    const json = await this.httpClient.get(`${BASE_PATH}/factura/${encodeURIComponent(reservationId)}`)
    return Invoice.fromJson(json)
  }
}

export default HotelApiService
