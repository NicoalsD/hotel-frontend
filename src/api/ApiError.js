const DEFAULT_MESSAGE = 'No fue posible conectar con el servidor'

/**
 * Error producido al consumir la API del hotel.
 * Conserva el estado HTTP y la ruta; el mensaje es el texto en español enviado por el backend.
 */
class ApiError extends Error {
  /**
   * @param {string} [message] Mensaje en español para el usuario.
   * @param {number} [status=0] Código HTTP (0 cuando no hubo respuesta).
   * @param {string} [path=''] Ruta solicitada.
   */
  constructor(message = DEFAULT_MESSAGE, status = 0, path = '') {
    super(message || DEFAULT_MESSAGE)
    this.name = 'ApiError'
    this.status = status
    this.path = path
  }

  /**
   * Construye un ApiError a partir de una respuesta HTTP con error.
   * Tolera cuerpos vacíos o que no sean JSON (por ejemplo, una página de error del proxy).
   * @param {Response} response Respuesta fallida.
   * @param {string} path Ruta solicitada.
   * @returns {Promise<ApiError>}
   */
  static async fromResponse(response, path) {
    let message = ''
    try {
      const body = await response.json()
      message = body?.message ?? ''
    } catch {
      message = ''
    }
    return new ApiError(message || DEFAULT_MESSAGE, response.status, path)
  }
}

export default ApiError
