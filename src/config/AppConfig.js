/**
 * Configuración global de la aplicación, leída desde las variables de entorno de Vite.
 */
class AppConfig {
  /**
   * URL base del backend. Vacía en desarrollo (el proxy de Vite redirige /api)
   * o la URL del servidor desplegado en producción.
   * @returns {string}
   */
  static get apiBaseUrl() {
    return import.meta.env?.VITE_API_BASE_URL ?? ''
  }
}

export default AppConfig
