import { useCallback, useEffect, useRef } from 'react';
import { useCache } from '@/store';

export const usePrefetch = ({
    prefetchFn,
    prefetchKey,
    dependencies = [],
    conditions = [],
    timeout = 2000,
    cacheTime = 5 * 60 * 1000, // 5 minutos
    onSuccess,
    onError,
}) => {
    const { getCache, setCache } = useCache();
    const timeoutRef = useRef(null);
    const abortControllerRef = useRef(null);

    const shouldPrefetch = useCallback(() => {
        return conditions.every(condition => condition());
    }, [conditions]);

    const executePrefetch = useCallback(async () => {
        // Si ya existe en caché y no ha expirado, no prefetch
        const cached = getCache(prefetchKey);
        if (cached) return;

        // Crear nuevo AbortController
        abortControllerRef.current = new AbortController();

        try {
            const result = await prefetchFn(abortControllerRef.current.signal);
            setCache(prefetchKey, result, cacheTime);
            onSuccess?.(result);
        } catch (error) {
            if (error.name === 'AbortError') return;
            onError?.(error);
        }
    }, [prefetchFn, prefetchKey, cacheTime, getCache, setCache, onSuccess, onError]);

    const startPrefetch = useCallback(() => {
        if (!shouldPrefetch()) return;

        // Limpiar timeout anterior si existe
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Establecer nuevo timeout
        timeoutRef.current = setTimeout(() => {
            executePrefetch();
        }, timeout);
    }, [shouldPrefetch, executePrefetch, timeout]);

    const cancelPrefetch = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    }, []);

    // Limpiar al desmontar o cuando cambien las dependencias
    useEffect(() => {
        return () => {
            cancelPrefetch();
        };
    }, [...dependencies]);

    return {
        startPrefetch,
        cancelPrefetch,
    };
};

// Hook para prefetching de rutas
export const usePrefetchRoute = (route, options = {}) => {
    return usePrefetch({
        prefetchKey: `route:${route}`,
        prefetchFn: async (signal) => {
            const response = await fetch(route, { signal });
            return response.json();
        },
        ...options,
    });
};

// Hook para prefetching de imágenes
export const usePrefetchImage = (src, options = {}) => {
    return usePrefetch({
        prefetchKey: `image:${src}`,
        prefetchFn: async (signal) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                
                img.onload = () => resolve(src);
                img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
                
                // Manejar abort
                signal?.addEventListener('abort', () => {
                    img.src = '';
                    reject(new Error('Aborted'));
                });

                img.src = src;
            });
        },
        ...options,
    });
};

// Hook para prefetching de componentes
export const usePrefetchComponent = (importFn, options = {}) => {
    return usePrefetch({
        prefetchKey: `component:${importFn.toString()}`,
        prefetchFn: async () => {
            const module = await importFn();
            return module.default;
        },
        ...options,
    });
}; 