import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce, throttle, memoize } from 'lodash';

export const useEventManager = ({
    handler,
    type = 'debounce', // 'debounce' | 'throttle' | 'memoize'
    wait = 300,
    options = {},
    dependencies = [],
    maxCacheSize = 100,
    shouldMemoize = true,
}) => {
    const handlerRef = useRef(handler);
    const [lastCall, setLastCall] = useState(null);
    const cacheRef = useRef(new Map());

    // Actualizar la referencia del handler cuando cambie
    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    // Limpiar caché cuando se excede el tamaño máximo
    const cleanCache = useCallback(() => {
        if (cacheRef.current.size > maxCacheSize) {
            const entries = Array.from(cacheRef.current.entries());
            const sortedByTimestamp = entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
            const entriesToKeep = sortedByTimestamp.slice(0, maxCacheSize / 2);
            cacheRef.current = new Map(entriesToKeep);
        }
    }, [maxCacheSize]);

    // Función para generar una clave de caché basada en los argumentos
    const getCacheKey = useCallback((args) => {
        return JSON.stringify(args);
    }, []);

    // Función memoizada
    const memoizedHandler = useCallback(
        memoize(
            (...args) => {
                const result = handlerRef.current(...args);
                const timestamp = Date.now();
                
                if (shouldMemoize) {
                    const key = getCacheKey(args);
                    cacheRef.current.set(key, { result, timestamp });
                    cleanCache();
                }

                setLastCall({ args, timestamp });
                return result;
            },
            getCacheKey,
            {
                maxSize: maxCacheSize,
                ...options,
            }
        ),
        [getCacheKey, cleanCache, shouldMemoize, maxCacheSize]
    );

    // Función con debounce
    const debouncedHandler = useCallback(
        debounce(
            (...args) => {
                const result = handlerRef.current(...args);
                setLastCall({ args, timestamp: Date.now() });
                return result;
            },
            wait,
            options
        ),
        [wait]
    );

    // Función con throttle
    const throttledHandler = useCallback(
        throttle(
            (...args) => {
                const result = handlerRef.current(...args);
                setLastCall({ args, timestamp: Date.now() });
                return result;
            },
            wait,
            options
        ),
        [wait]
    );

    // Seleccionar el tipo de handler a usar
    const managedHandler = useCallback(
        (...args) => {
            switch (type) {
                case 'debounce':
                    return debouncedHandler(...args);
                case 'throttle':
                    return throttledHandler(...args);
                case 'memoize':
                    return memoizedHandler(...args);
                default:
                    return handlerRef.current(...args);
            }
        },
        [type, debouncedHandler, throttledHandler, memoizedHandler]
    );

    // Limpiar handlers al desmontar
    useEffect(() => {
        return () => {
            debouncedHandler.cancel();
            throttledHandler.cancel();
            cacheRef.current.clear();
        };
    }, [...dependencies]);

    // Método para limpiar la caché manualmente
    const clearCache = useCallback(() => {
        cacheRef.current.clear();
    }, []);

    // Método para obtener un valor de la caché
    const getCachedValue = useCallback((args) => {
        const key = getCacheKey(args);
        return cacheRef.current.get(key)?.result;
    }, [getCacheKey]);

    return {
        handler: managedHandler,
        lastCall,
        clearCache,
        getCachedValue,
        cacheSize: cacheRef.current.size,
    };
};

// Hook para eventos de scroll optimizados
export const useScrollHandler = (handler, options = {}) => {
    return useEventManager({
        handler,
        type: 'throttle',
        wait: 100,
        ...options,
    });
};

// Hook para eventos de resize optimizados
export const useResizeHandler = (handler, options = {}) => {
    return useEventManager({
        handler,
        type: 'debounce',
        wait: 200,
        ...options,
    });
};

// Hook para eventos de input optimizados
export const useInputHandler = (handler, options = {}) => {
    return useEventManager({
        handler,
        type: 'debounce',
        wait: 300,
        ...options,
    });
}; 