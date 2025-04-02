import React from 'react';

const Table = ({
    columns = [],
    data = [],
    className = '',
    variant = 'default',
    size = 'md',
    striped = false,
    hoverable = true,
    bordered = false,
    compact = false,
    loading = false,
    emptyMessage = 'No hay datos disponibles',
    onRowClick,
    selectedRow,
    sortColumn,
    sortDirection,
    onSort,
}) => {
    const baseStyles = 'min-w-full divide-y divide-gray-200';
    
    const variants = {
        default: 'bg-white',
        primary: 'bg-primary-50',
        secondary: 'bg-secondary-50',
    };

    const sizes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
    };

    const classes = `
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${bordered ? 'border border-gray-200' : ''}
        ${className}
    `.trim();

    const renderSortIcon = (column) => {
        if (!column.sortable) return null;
        
        const isActive = sortColumn === column.key;
        const icon = isActive && sortDirection === 'desc' ? '↓' : '↑';
        
        return (
            <span className={`ml-2 ${isActive ? 'text-primary-600' : 'text-gray-400'}`}>
                {icon}
            </span>
        );
    };

    const handleHeaderClick = (column) => {
        if (!column.sortable || !onSort) return;
        
        const newDirection = sortColumn === column.key && sortDirection === 'asc' ? 'desc' : 'asc';
        onSort(column.key, newDirection);
    };

    return (
        <div className="overflow-x-auto">
            <table className={classes}>
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                scope="col"
                                className={`
                                    ${compact ? 'px-3 py-2' : 'px-6 py-3'}
                                    text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                                    ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                                `}
                                onClick={() => handleHeaderClick(column)}
                            >
                                <div className="flex items-center">
                                    {column.label}
                                    {renderSortIcon(column)}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {loading ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className={`${compact ? 'px-3 py-2' : 'px-6 py-4'} text-center`}
                            >
                                <div className="flex justify-center items-center">
                                    <svg
                                        className="animate-spin h-5 w-5 text-primary-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    <span className="ml-2">Cargando...</span>
                                </div>
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className={`${compact ? 'px-3 py-2' : 'px-6 py-4'} text-center text-gray-500`}
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr
                                key={row.id || rowIndex}
                                className={`
                                    ${hoverable ? 'hover:bg-gray-50' : ''}
                                    ${striped && rowIndex % 2 === 0 ? 'bg-gray-50' : ''}
                                    ${onRowClick ? 'cursor-pointer' : ''}
                                    ${selectedRow === row.id ? 'bg-primary-50' : ''}
                                `}
                                onClick={() => onRowClick && onRowClick(row)}
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className={`${compact ? 'px-3 py-2' : 'px-6 py-4'} whitespace-nowrap`}
                                    >
                                        {column.render ? column.render(row) : row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table; 