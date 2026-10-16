import ApiError from './ApiError.js'

/**
 * Cliente HTTP basado en fetch. Envía y recibe JSON y convierte cualquier fallo en ApiError.
 */
class HttpClient {
  /**
   * @param {string} [baseUrl=''] URL base; vacía para usar rutas relativas.
   */
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl
  }

  /**
   * Realiza una petición GET.
   * @param {string} path Ruta que inicia con /api.
   * @param {Object<string, *>} [params] Parámetros de consulta; se omiten los vacíos.
   * @returns {Promise<*>} Cuerpo JSON de la respuesta.
   */
  get(path, params) {
    return this.request('GET', path, { params })
  }

  /**
   * Realiza una petición POST con cuerpo JSON.
   * @param {string} path Ruta que inicia con /api.
   * @param {*} [body] Cuerpo a serializar.
   * @returns {Promise<*>}
   */
  post(path, body) {
    return this.request('POST', path, { body })
  }

  /**
   * Realiza una petición PUT con cuerpo JSON opcional.
   * @param {string} path Ruta que inicia con /api.
   * @param {*} [body] Cuerpo a serializar.
   * @returns {Promise<*>}
   */
  put(path, body) {
    return this.request('PUT', path, { body })
  }

  /**
   * Ejecuta la petición y devuelve el JSON; lanza ApiError ante cualquier fallo.
   * @param {string} method Método HTTP.
   * @param {string} path Ruta solicitada.
   * @param {{params?: Object<string, *>, body?: *}} [options]
   * @returns {Promise<*>}
   */
  async request(method, path, { params, body } = {}) {
    const url = this.buildUrl(path, params)
    const init = { method, headers: { Accept: 'application/json' } }
    if (body !== undefined) {
      init.headers['Content-Type'] = 'application/json'
      init.body = JSON.stringify(body)
    }

    let response
    try {
      response = await fetch(url, init)
    } catch {
      throw new ApiError(undefined, 0, path)
    }

    if (!response.ok) {
      throw await ApiError.fromResponse(response, path)
    }
    if (response.status === 204) {
      return null
    }

    const text = await response.text()
    if (!text) {
      return null
    }
    try {
      return JSON.parse(text)
    } catch {
      throw new ApiError('Respuesta inválida del servidor', response.status, path)
    }
  }

  /**
   * Construye la URL completa con los parámetros de consulta no vacíos.
   * @param {string} path Ruta solicitada.
   * @param {Object<string, *>} [params={}] Parámetros de consulta.
   * @returns {string}
   */
  buildUrl(path, params = {}) {
    const query = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.append(key, String(value))
      }
    })
    const queryString = query.toString()
    return `${this.baseUrl}${path}${queryString ? `?${queryString}` : ''}`
  }
}

export default HttpClient
