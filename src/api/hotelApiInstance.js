import AppConfig from '../config/AppConfig.js'
import HotelApiService from './HotelApiService.js'
import HttpClient from './HttpClient.js'

/**
 * Instancia compartida del servicio de la API del hotel.
 */
export const hotelApiService = new HotelApiService(new HttpClient(AppConfig.apiBaseUrl))

export default hotelApiService
