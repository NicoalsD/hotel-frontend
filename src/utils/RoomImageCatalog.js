const ROOM_IMAGES = {
  SINGLE: ['/images/single-1', '/images/single-2'],
  DOUBLE: ['/images/double-1', '/images/double-2'],
  SUITE: ['/images/suite-1', '/images/suite-2'],
}

const SERVICE_IMAGES = {
  SPA: '/images/spa',
  BREAKFAST: '/images/breakfast',
  TRANSFER: '/images/transfer',
}

/**
 * Fotografías de habitaciones y servicios (Unsplash, ver docs/IMAGENES.md).
 * Cada imagen existe en dos tamaños: completa (1600 px) y pequeña (640 px).
 */
class RoomImageCatalog {
  /**
   * Imagen de una habitación, alternando entre las fotos de su tipo según el id.
   * @param {string} type Tipo de habitación: SINGLE, DOUBLE o SUITE.
   * @param {number} [roomId] Identificador de la habitación.
   * @param {boolean} [small] Si se quiere la versión pequeña.
   * @returns {string}
   */
  static forRoom(type, roomId = 0, small = true) {
    const images = ROOM_IMAGES[type] ?? ROOM_IMAGES.DOUBLE
    const base = images[Math.abs(Number(roomId) || 0) % images.length]
    return RoomImageCatalog.#withSize(base, small)
  }

  /**
   * Imagen representativa de un servicio adicional.
   * @param {string} serviceType SPA, BREAKFAST o TRANSFER.
   * @param {boolean} [small]
   * @returns {string|null}
   */
  static forService(serviceType, small = true) {
    const base = SERVICE_IMAGES[serviceType]
    return base ? RoomImageCatalog.#withSize(base, small) : null
  }

  /**
   * Fotografía principal del hotel para la portada.
   * @returns {string}
   */
  static hero() {
    return '/images/hero.webp'
  }

  static #withSize(base, small) {
    return `${base}${small ? '-sm' : ''}.webp`
  }
}

export default RoomImageCatalog
