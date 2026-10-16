/**
 * Tarifa aplicada a una noche concreta de la estadía.
 */
class NightlyRate {
  /**
   * @param {Object} fields Campos planos de la tarifa nocturna.
   * @param {string} fields.date Fecha de la noche (YYYY-MM-DD).
   * @param {string} fields.season Temporada: HIGH o LOW.
   * @param {string} fields.seasonLabel Nombre de la temporada en español.
   * @param {number} fields.price Precio de la noche.
   */
  constructor({ date, season, seasonLabel, price }) {
    this.date = date
    this.season = season
    this.seasonLabel = seasonLabel
    this.price = price
  }

  /**
   * Indica si la noche corresponde a temporada alta.
   * @returns {boolean}
   */
  get isHighSeason() {
    return this.season === 'HIGH'
  }

  /**
   * Crea una tarifa nocturna desde el JSON de la API.
   * @param {Object|null} json Elemento de nightlyRates.
   * @returns {NightlyRate|null} Null cuando no hay datos.
   */
  static fromJson(json) {
    return json ? new NightlyRate(json) : null
  }
}

export default NightlyRate
