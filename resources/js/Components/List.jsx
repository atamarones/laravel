import React from 'react';

const List = ({
    items = [],
    className = '',
    variant = 'default',
    size = 'md',
    divided = true,
    hoverable = true,
    selectable = false,
    selectedItem,
    onItemClick,
    renderItem,
    loading = false,
    emptyMessage = 'No hay elementos para mostrar',
}) => {
    const variants = {
        default: {
            base: 'bg-white',
            item: 'text-gray-900',
            hover: 'hover:bg-gray-50',
            selected: 'bg-primary-50',
            border: 'border-gray-200',
        },
        primary: {
            base: 'bg-primary-50',
            item: 'text-primary-900',
            hover: 'hover:bg-primary-100',
            selected: 'bg-primary-200',
            border: 'border-primary-200',
        },
        secondary: {
            base: 'bg-secondary-50',
            item: 'text-secondary-900',
            hover: 'hover:bg-secondary-100',
            selected: 'bg-secondary-200',
            border: 'border-secondary-200',
        },
    };

    const sizes = {
        sm: 'py-2 px-4',
        md: 'py-3 px-6',
        lg: 'py-4 px-8',
    };

    const baseStyles = `
        rounded-lg
        overflow-hidden
        ${divided ? 'divide-y' : ''}
        ${divided ? variants[variant].border : ''}
    `;

    const renderLoadingState = () => (
        <div className="flex items-center justify-center py-8">
            <svg
                className="animate-spin h-8 w-8 text-primary-600"
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
            <span className="ml-3 text-sm text-gray-500">Cargando...</span>
        </div>
    );

    const renderEmptyState = () => (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <svg
                className="h-12 w-12 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
            </svg>
            <p className="mt-2 text-sm">{emptyMessage}</p>
        </div>
    );

    return (
        <div className={`${baseStyles} ${variants[variant].base} ${className}`}>
            {loading ? (
                renderLoadingState()
            ) : items.length === 0 ? (
                renderEmptyState()
            ) : (
                <ul className="divide-y divide-gray-200">
                    {items.map((item, index) => {
                        const isSelected = selectedItem && selectedItem === item.id;
                        const itemClasses = `
                            ${sizes[size]}
                            ${variants[variant].item}
                            ${hoverable ? variants[variant].hover : ''}
                            ${selectable ? 'cursor-pointer' : ''}
                            ${isSelected ? variants[variant].selected : ''}
                            transition-colors duration-150 ease-in-out
                        `;

                        return (
                            <li
                                key={item.id || index}
                                className={itemClasses}
                                onClick={() => selectable && onItemClick && onItemClick(item)}
                            >
                                {renderItem ? renderItem(item) : item.label || item.name || item.title}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default List; 