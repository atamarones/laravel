import { useCallback, useEffect, useRef, useState } from 'react';
import { useCache } from '@/store';

// Web Worker para operaciones pesadas
const createWorker = (fn) => {
    const blob = new Blob([`self.onmessage = ${fn.toString()}`], {
        type: 'text/javascript',
    });
    return new Worker(URL.createObjectURL(blob));
};

export const usePerformance = ({
    operation,
    dependencies = [],
    useWorker = false,
    batchSize = 1000,
    idleTimeout = 1000,
    cacheKey,
    cacheTime = 5 * 60 * 1000, // 5 minutos
}) => {
    const { getCache, setCache } = useCache();
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const workerRef = useRef(null);
    const operationRef = useRef(operation);

    // Actualizar la referencia de la operación
    useEffect(() => {
        operationRef.current = operation;
    }, [operation]);

    // Función para procesar en lotes
    const processBatch = useCallback(async (data, start = 0) => {
        const end = Math.min(start + batchSize, data.length);
        const batch = data.slice(start, end);
        const results = [];

        for (const item of batch) {
            const result = await operationRef.current(item);
            results.push(result);
        }

        const newProgress = Math.round((end / data.length) * 100);
        setProgress(newProgress);

        return {
            results,
            completed: end === data.length,
            nextStart: end,
        };
    }, [batchSize]);

    // Función para procesar durante tiempo inactivo
    const processInIdle = useCallback((data) => {
        return new Promise((resolve) => {
            const results = [];
            let index = 0;

            const processChunk = async (deadline) => {
                while (index < data.length && deadline.timeRemaining() > 0) {
                    const result = await operationRef.current(data[index]);
                    results.push(result);
                    index++;
                    setProgress(Math.round((index / data.length) * 100));
                }

                if (index < data.length) {
                    requestIdleCallback(processChunk, { timeout: idleTimeout });
                } else {
                    resolve(results);
                }
            };

            requestIdleCallback(processChunk, { timeout: idleTimeout });
        });
    }, [idleTimeout]);

    // Función para procesar con Web Worker
    const processWithWorker = useCallback((data) => {
        return new Promise((resolve, reject) => {
            if (!workerRef.current) {
                workerRef.current = createWorker(operationRef.current);
            }

            const worker = workerRef.current;

            worker.onmessage = (e) => {
                if (e.data.type === 'progress') {
                    setProgress(e.data.progress);
                } else if (e.data.type === 'complete') {
                    resolve(e.data.results);
                }
            };

            worker.onerror = (error) => {
                reject(error);
            };

            worker.postMessage({ data });
        });
    }, []);

    // Función principal de procesamiento
    const process = useCallback(async (data) => {
        if (!data?.length) return [];

        // Verificar caché si hay cacheKey
        if (cacheKey) {
            const cached = getCache(cacheKey);
            if (cached) return cached;
        }

        setIsProcessing(true);
        setProgress(0);

        try {
            let results;

            if (useWorker && window.Worker) {
                results = await processWithWorker(data);
            } else if (window.requestIdleCallback) {
                results = await processInIdle(data);
            } else {
                results = [];
                let start = 0;
                let completed = false;

                while (!completed) {
                    const batch = await processBatch(data, start);
                    results.push(...batch.results);
                    completed = batch.completed;
                    start = batch.nextStart;
                }
            }

            // Guardar en caché si hay cacheKey
            if (cacheKey) {
                setCache(cacheKey, results, cacheTime);
            }

            return results;
        } finally {
            setIsProcessing(false);
            setProgress(100);
        }
    }, [
        useWorker,
        processBatch,
        processInIdle,
        processWithWorker,
        cacheKey,
        cacheTime,
        getCache,
        setCache,
    ]);

    // Limpiar worker al desmontar
    useEffect(() => {
        return () => {
            if (workerRef.current) {
                workerRef.current.terminate();
                workerRef.current = null;
            }
        };
    }, [...dependencies]);

    return {
        process,
        isProcessing,
        progress,
    };
};

// Hook para optimizar renderizado de listas grandes
export const useVirtualizedList = ({
    items,
    itemHeight,
    containerHeight,
    overscan = 3,
}) => {
    const [visibleItems, setVisibleItems] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);

    const updateVisibleItems = useCallback(() => {
        const startIndex = Math.floor(scrollTop / itemHeight);
        const endIndex = Math.min(
            startIndex + Math.ceil(containerHeight / itemHeight) + overscan,
            items.length
        );
        
        setVisibleItems(
            items.slice(
                Math.max(0, startIndex - overscan),
                endIndex
            ).map((item, index) => ({
                ...item,
                style: {
                    position: 'absolute',
                    top: (startIndex - overscan + index) * itemHeight,
                    width: '100%',
                    height: itemHeight,
                },
            }))
        );
    }, [items, itemHeight, containerHeight, overscan, scrollTop]);

    useEffect(() => {
        updateVisibleItems();
    }, [updateVisibleItems]);

    const handleScroll = useCallback((e) => {
        setScrollTop(e.target.scrollTop);
    }, []);

    return {
        visibleItems,
        totalHeight: items.length * itemHeight,
        handleScroll,
    };
}; 