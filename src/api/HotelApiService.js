import PriceQuote from '../models/PriceQuote.js'
import RoomAvailability from '../models/RoomAvailability.js'
import Room from '../models/Room.js'
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

export default HotelApiService
