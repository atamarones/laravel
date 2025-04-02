import { useCallback, useEffect, useRef, useState } from 'react';
import { useCache } from '@/store';
import { debounce } from 'lodash';

export const useQueryMemo = ({
    queryFn,
    queryKey,
    enabled = true,
    staleTime = 5 * 60 * 1000, // 5 minutos
    cacheTime = 30 * 60 * 1000, // 30 minutos
    retryCount = 3,
    retryDelay = 1000,
    onSuccess,
    onError,
    dependencies = [],
}) => {
    const { getCache, setCache } = useCache();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isValidating, setIsValidating] = useState(false);

    const retryCountRef = useRef(0);
    const lastFetchTimeRef = useRef(0);
    const isMountedRef = useRef(true);

    // Función para verificar si los datos están obsoletos
    const isStale = useCallback(() => {
        const lastFetchTime = lastFetchTimeRef.current;
        return Date.now() - lastFetchTime > staleTime;
    }, [staleTime]);

    // Función para ejecutar la consulta
    const executeFetch = useCallback(async (isRefetch = false) => {
        try {
            setIsValidating(true);
            if (!isRefetch) setIsLoading(true);

            const result = await queryFn();
            
            if (isMountedRef.current) {
                setData(result);
                setError(null);
                lastFetchTimeRef.current = Date.now();
                setCache(queryKey, result, cacheTime);
                onSuccess?.(result);
            }
        } catch (err) {
            if (isMountedRef.current) {
                setError(err);
                onError?.(err);

                // Reintentar si es necesario
                if (retryCountRef.current < retryCount) {
                    retryCountRef.current += 1;
                    setTimeout(() => {
                        executeFetch(true);
                    }, retryDelay * retryCountRef.current);
                }
            }
        } finally {
            if (isMountedRef.current) {
                setIsLoading(false);
                setIsValidating(false);
                retryCountRef.current = 0;
            }
        }
    }, [queryFn, queryKey, cacheTime, retryCount, retryDelay, onSuccess, onError, setCache]);

    // Función para revalidar los datos
    const revalidate = useCallback(debounce(() => {
        if (isValidating) return;
        executeFetch(true);
    }, 100), [executeFetch]);

    // Efecto para cargar datos iniciales
    useEffect(() => {
        isMountedRef.current = true;

        if (!enabled) return;

        const cachedData = getCache(queryKey);
        if (cachedData) {
            setData(cachedData);
            if (isStale()) {
                revalidate();
            }
        } else {
            executeFetch();
        }

        return () => {
            isMountedRef.current = false;
        };
    }, [enabled, queryKey, ...dependencies]);

    // Función para mutación manual de datos
    const mutate = useCallback((newData) => {
        if (typeof newData === 'function') {
            setData(prev => {
                const updated = newData(prev);
                setCache(queryKey, updated, cacheTime);
                return updated;
            });
        } else {
            setData(newData);
            setCache(queryKey, newData, cacheTime);
        }
    }, [queryKey, cacheTime, setCache]);

    return {
        data,
        error,
        isLoading,
        isValidating,
        revalidate,
        mutate,
    };
}; 