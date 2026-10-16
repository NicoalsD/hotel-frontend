const PRESENTATION = {
  CONFIRMED: { label: 'Confirmada', color: 'info' },
  CHECKED_IN: { label: 'Check-in realizado', color: 'success' },
  CHECKED_OUT: { label: 'Finalizada', color: 'default' },
}

/**
 * Traduce el estado de una reserva a etiqueta y color para los Chip de MUI.
 */
class StatusPresenter {
  /**
   * @param {string} status Estado de la reserva (CONFIRMED, CHECKED_IN, CHECKED_OUT).
   * @returns {{label: string, color: 'info'|'success'|'default'}} Presentación del estado.
   */
  static present(status) {
    const entry = PRESENTATION[status]
    if (entry) {
      return { ...entry }
    }
    return { label: status ?? 'Desconocido', color: 'default' }
  }
}

export default StatusPresenter
