import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { debounce } from 'lodash';

const VirtualTable = ({
    data = [],
    columns = [],
    rowHeight = 48,
    headerHeight = 56,
    className = '',
    containerClassName = '',
    loadingRows = 10,
    loading = false,
    emptyMessage = 'No hay datos disponibles',
    onRowClick,
    onSort,
    sortBy,
    sortDirection,
    selectable = false,
    selectedRows = [],
    onSelectRow,
    onSelectAll,
}) => {
    const parentRef = useRef(null);
    const [tableWidth, setTableWidth] = useState(0);
    
    // Observer para el ancho de la tabla
    useEffect(() => {
        if (!parentRef.current) return;
        
        const resizeObserver = new ResizeObserver(debounce(entries => {
            for (const entry of entries) {
                setTableWidth(entry.contentRect.width);
            }
        }, 100));

        resizeObserver.observe(parentRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    // Virtualización de filas
    const rowVirtualizer = useVirtualizer({
        count: loading ? loadingRows : data.length,
        getScrollElement: () => parentRef.current,
        estimateSize: useCallback(() => rowHeight, [rowHeight]),
        overscan: 5,
    });

    // Cálculo de columnas flexibles
    const flexColumns = columns.filter(col => col.flex);
    const totalFlex = flexColumns.reduce((sum, col) => sum + (col.flex || 1), 0);
    const fixedWidth = columns
        .filter(col => !col.flex)
        .reduce((sum, col) => sum + (col.width || 100), 0);
    const remainingWidth = Math.max(0, tableWidth - fixedWidth);

    // Renderizado de encabezado
    const renderHeader = () => (
        <div
            className="sticky top-0 z-10 bg-gray-50 shadow-sm"
            style={{ height: headerHeight }}
        >
            <div className="flex h-full items-center border-b border-gray-200 px-4">
                {selectable && (
                    <div className="flex w-8 justify-center">
                        <input
                            type="checkbox"
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            checked={selectedRows.length === data.length}
                            onChange={onSelectAll}
                        />
                    </div>
                )}
                {columns.map((column, index) => {
                    const width = column.flex
                        ? (column.flex / totalFlex) * remainingWidth
                        : column.width || 100;

                    return (
                        <div
                            key={column.key || index}
                            className={`
                                flex items-center px-3
                                ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                                ${column.className || ''}
                            `}
                            style={{ width }}
                            onClick={() => column.sortable && onSort?.(column.key)}
                        >
                            <span className="font-medium text-gray-900">
                                {column.header}
                            </span>
                            {column.sortable && sortBy === column.key && (
                                <span className="ml-2">
                                    {sortDirection === 'asc' ? '↑' : '↓'}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    // Renderizado de filas
    const renderRows = () => {
        const virtualRows = rowVirtualizer.getVirtualItems();

        return (
            <div
                className="relative"
                style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
            >
                {virtualRows.map(virtualRow => {
                    const row = data[virtualRow.index];
                    const isSelected = selectedRows.includes(row?.id);

                    return (
                        <div
                            key={virtualRow.index}
                            className={`
                                absolute left-0 top-0 flex w-full items-center border-b border-gray-200 px-4
                                ${loading ? 'animate-pulse bg-gray-50' : ''}
                                ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                                ${isSelected ? 'bg-primary-50' : ''}
                            `}
                            style={{
                                height: rowHeight,
                                transform: `translateY(${virtualRow.start}px)`,
                            }}
                            onClick={() => !loading && onRowClick?.(row)}
                        >
                            {selectable && (
                                <div className="flex w-8 justify-center">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                        checked={isSelected}
                                        onChange={() => onSelectRow?.(row)}
                                    />
                                </div>
                            )}
                            {columns.map((column, columnIndex) => {
                                const width = column.flex
                                    ? (column.flex / totalFlex) * remainingWidth
                                    : column.width || 100;

                                return (
                                    <div
                                        key={column.key || columnIndex}
                                        className={`px-3 ${column.className || ''}`}
                                        style={{ width }}
                                    >
                                        {loading ? (
                                            <div className="h-4 w-3/4 rounded bg-gray-200" />
                                        ) : (
                                            column.render?.(row) ?? row[column.key]
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    };

    // Estado vacío
    const renderEmpty = () => (
        <div className="flex h-[200px] items-center justify-center">
            <p className="text-gray-500">{emptyMessage}</p>
        </div>
    );

    return (
        <div className={`overflow-hidden rounded-lg border border-gray-200 ${className}`}>
            {renderHeader()}
            <div
                ref={parentRef}
                className={`h-full overflow-auto ${containerClassName}`}
                style={{ height: `calc(100% - ${headerHeight}px)` }}
            >
                {!loading && data.length === 0 ? renderEmpty() : renderRows()}
            </div>
        </div>
    );
};

export default VirtualTable; 