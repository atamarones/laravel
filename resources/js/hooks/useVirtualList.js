import { useCallback, useEffect, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { debounce } from 'lodash';

export const useVirtualList = ({
    data = [],
    itemHeight = 40,
    overscan = 3,
    loadMoreThreshold = 0.8,
    onLoadMore,
    loading = false,
    horizontal = false,
}) => {
    const parentRef = useRef(null);
    const [parentSize, setParentSize] = useState(0);
    const loadingRef = useRef(loading);
    const hasMoreRef = useRef(true);

    // Actualizar la referencia de loading
    useEffect(() => {
        loadingRef.current = loading;
    }, [loading]);

    // Observer para el tamaño del contenedor
    useEffect(() => {
        if (!parentRef.current) return;

        const resizeObserver = new ResizeObserver(
            debounce(entries => {
                for (const entry of entries) {
                    const size = horizontal
                        ? entry.contentRect.width
                        : entry.contentRect.height;
                    setParentSize(size);
                }
            }, 100)
        );

        resizeObserver.observe(parentRef.current);
        return () => resizeObserver.disconnect();
    }, [horizontal]);

    // Configuración del virtualizador
    const virtualizer = useVirtualizer({
        count: data.length,
        getScrollElement: () => parentRef.current,
        estimateSize: useCallback(() => itemHeight, [itemHeight]),
        overscan,
        horizontal,
    });

    // Memoización de elementos virtuales
    const virtualItems = virtualizer.getVirtualItems();

    // Manejo de scroll y carga infinita
    const handleScroll = useCallback(
        debounce(() => {
            if (!parentRef.current || !onLoadMore || loadingRef.current || !hasMoreRef.current) return;

            const { scrollTop, scrollHeight, clientHeight } = parentRef.current;
            const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

            if (scrollPercentage > loadMoreThreshold) {
                onLoadMore();
            }
        }, 100),
        [onLoadMore, loadMoreThreshold]
    );

    // Agregar evento de scroll
    useEffect(() => {
        const scrollElement = parentRef.current;
        if (!scrollElement) return;

        scrollElement.addEventListener('scroll', handleScroll);
        return () => scrollElement.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Método para scrollear a un ítem específico
    const scrollToItem = useCallback(
        (index, options = {}) => {
            virtualizer.scrollToIndex(index, options);
        },
        [virtualizer]
    );

    // Método para medir un ítem
    const measureItem = useCallback(
        (index) => {
            virtualizer.measureElement(index);
        },
        [virtualizer]
    );

    // Método para resetear la virtualización
    const reset = useCallback(() => {
        virtualizer.reset();
    }, [virtualizer]);

    return {
        parentRef,
        virtualItems,
        totalSize: virtualizer.getTotalSize(),
        scrollToItem,
        measureItem,
        reset,
        isScrolling: virtualizer.isScrolling,
    };
};

// Hook para optimizar el renderizado de items
export const useVirtualItemRenderer = (renderItem) => {
    return useCallback(
        (virtualRow) => {
            const props = {
                key: virtualRow.key,
                style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                },
            };

            return renderItem(virtualRow, props);
        },
        [renderItem]
    );
};

// Hook para memoización de items
export const useMemoizedVirtualItems = (items, deps = []) => {
    return useCallback(
        (virtualRow) => items[virtualRow.index],
        [items, ...deps]
    );
}; 