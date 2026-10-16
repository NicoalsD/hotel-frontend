import NightlyRate from './NightlyRate.js'

/**
 * Cotización de precio para un tipo de habitación y un rango de fechas.
 */
class PriceQuote {
  /**
   * @param {Object} fields Campos planos de la cotización.
   * @param {string} fields.roomType Tipo de habitación.
   * @param {string} fields.typeLabel Nombre del tipo en español.
   * @param {string} fields.checkIn Fecha de entrada (YYYY-MM-DD).
   * @param {string} fields.checkOut Fecha de salida (YYYY-MM-DD).
   * @param {number} fields.nights Número de noches.
   * @param {number} fields.basePrice Precio base por noche.
   * @param {number} fields.highSeasonNights Noches en temporada alta.
   * @param {number} fields.lowSeasonNights Noches en temporada baja.
   * @param {number} fields.total Total de la estadía.
   * @param {NightlyRate[]} [fields.nightlyRates=[]] Desglose por noche.
   */
  constructor({
    roomType,
    typeLabel,
    checkIn,
    checkOut,
    nights,
    basePrice,
    highSeasonNights,
    lowSeasonNights,
    total,
    nightlyRates = [],
  }) {
    this.roomType = roomType
    this.typeLabel = typeLabel
    this.checkIn = checkIn
    this.checkOut = checkOut
    this.nights = nights
    this.basePrice = basePrice
    this.highSeasonNights = highSeasonNights
    this.lowSeasonNights = lowSeasonNights
    this.total = total
    this.nightlyRates = nightlyRates
  }

  /**
   * Indica si la estadía incluye noches de temporada alta.
   * @returns {boolean}
   */
  get hasHighSeason() {
    return this.highSeasonNights > 0
  }

  /**
   * Indica si la estadía incluye noches de temporada baja.
   * @returns {boolean}
   */
  get hasLowSeason() {
    return this.lowSeasonNights > 0
  }

  /**
   * Precio promedio por noche con dos decimales.
   * @returns {number}
   */
  get averageNightlyPrice() {
    return this.nights > 0 ? Number((this.total / this.nights).toFixed(2)) : 0
  }

  /**
   * Crea una cotización desde el JSON de la API.
   * @param {Object|null} json Respuesta de /tarifa.
   * @returns {PriceQuote|null} Null cuando no hay datos.
   */
  static fromJson(json) {
    if (!json) {
      return null
    }
    return new PriceQuote({
      ...json,
      nightlyRates: (json.nightlyRates ?? []).map((rate) => NightlyRate.fromJson(rate)),
    })
  }
}

export default PriceQuote
