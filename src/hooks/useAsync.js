import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Ejecuta una operación asíncrona y expone su estado.
 * La operación se lanza al montar y cada vez que cambian las dependencias; execute permite lanzarla manualmente.
 * Las respuestas obsoletas (de una ejecución anterior o de un componente desmontado) se descartan.
 *
 * @param {(...args: any[]) => Promise<any>} asyncFunction Operación a ejecutar.
 * @param {Array<any>} [dependencies=[]] Dependencias que disparan una nueva ejecución automática.
 * @returns {{data: any, loading: boolean, error: any, execute: (...args: any[]) => Promise<any>}}
 */
function useAsync(asyncFunction, dependencies = []) {
  const [state, setState] = useState({ data: null, loading: false, error: null })
  const requestIdRef = useRef(0)
  const functionRef = useRef(asyncFunction)

  useEffect(() => {
    functionRef.current = asyncFunction
  })

  const execute = useCallback(async (...args) => {
    requestIdRef.current += 1
    const requestId = requestIdRef.current
    setState((previous) => ({ ...previous, loading: true, error: null }))
    try {
      const data = await functionRef.current(...args)
      if (requestId === requestIdRef.current) {
        setState({ data, loading: false, error: null })
      }
      return data
    } catch (error) {
      if (requestId === requestIdRef.current) {
        setState({ data: null, loading: false, error })
      }
      throw error
    }
  }, [])

  useEffect(() => {
    execute().catch(() => {})
    return () => {
      requestIdRef.current += 1
    }
    // Las dependencias las define quien llama al hook.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execute, ...dependencies])

  return { ...state, execute }
}

export default useAsync
