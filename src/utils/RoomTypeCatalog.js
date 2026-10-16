import Apartment from '@mui/icons-material/Apartment'
import KingBed from '@mui/icons-material/KingBed'
import SingleBed from '@mui/icons-material/SingleBed'

const CATALOG = {
  SINGLE: {
    type: 'SINGLE',
    label: 'Sencilla',
    iconName: 'SingleBed',
    icon: SingleBed,
    description: 'Habitación individual, ideal para viajeros de negocios.',
  },
  DOUBLE: {
    type: 'DOUBLE',
    label: 'Doble',
    iconName: 'KingBed',
    icon: KingBed,
    description: 'Habitación doble con cama matrimonial, perfecta para parejas.',
  },
  SUITE: {
    type: 'SUITE',
    label: 'Suite',
    iconName: 'Apartment',
    icon: Apartment,
    description: 'Suite amplia con sala independiente, para familias y grupos.',
  },
}

/**
 * Catálogo de tipos de habitación con nombre, icono y descripción para la interfaz.
 */
class RoomTypeCatalog {
  /**
   * Todos los tipos de habitación en orden de presentación.
   * @returns {Array<{type: string, label: string, iconName: string, icon: Function, description: string}>}
   */
  static all() {
    return Object.values(CATALOG).map((entry) => ({ ...entry }))
  }

  /**
   * Busca la entrada del catálogo para un tipo.
   * @param {string} type Tipo: SINGLE, DOUBLE o SUITE.
   * @returns {{type: string, label: string, iconName: string, icon: Function, description: string}|null}
   */
  static find(type) {
    const entry = CATALOG[type]
    return entry ? { ...entry } : null
  }

  /**
   * Nombre en español de un tipo; devuelve el mismo código si el tipo es desconocido.
   * @param {string} type Tipo de habitación.
   * @returns {string}
   */
  static label(type) {
    return CATALOG[type]?.label ?? type
  }
}

export default RoomTypeCatalog
