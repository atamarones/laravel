import React from 'react';

const Card = ({
    children,
    className = '',
    variant = 'default',
    size = 'md',
    title,
    subtitle,
    icon: Icon,
    actions,
    footer,
    loading = false,
    hoverable = false,
    bordered = true,
    shadow = true,
}) => {
    const variants = {
        default: {
            base: 'bg-white',
            header: 'text-gray-900',
            subtitle: 'text-gray-500',
            content: 'text-gray-600',
            footer: 'bg-gray-50',
            border: 'border-gray-200',
            hover: 'hover:border-gray-300 hover:shadow-lg',
        },
        primary: {
            base: 'bg-primary-50',
            header: 'text-primary-900',
            subtitle: 'text-primary-600',
            content: 'text-primary-700',
            footer: 'bg-primary-100',
            border: 'border-primary-200',
            hover: 'hover:border-primary-300 hover:shadow-lg',
        },
        secondary: {
            base: 'bg-secondary-50',
            header: 'text-secondary-900',
            subtitle: 'text-secondary-600',
            content: 'text-secondary-700',
            footer: 'bg-secondary-100',
            border: 'border-secondary-200',
            hover: 'hover:border-secondary-300 hover:shadow-lg',
        },
    };

    const sizes = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const baseStyles = `
        rounded-lg
        ${bordered ? 'border' : ''}
        ${shadow ? 'shadow-sm' : ''}
        ${hoverable ? variants[variant].hover : ''}
        transition-all duration-200 ease-in-out
    `;

    return (
        <div
            className={`
                ${baseStyles}
                ${variants[variant].base}
                ${bordered ? variants[variant].border : ''}
                ${className}
            `}
        >
            {loading && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg z-50">
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
                </div>
            )}

            {(title || subtitle || actions) && (
                <div className={sizes[size]}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            {Icon && (
                                <div className="flex-shrink-0 mr-4">
                                    <Icon className={`h-6 w-6 ${variants[variant].header}`} />
                                </div>
                            )}
                            <div>
                                {title && (
                                    <h3 className={`text-lg font-medium ${variants[variant].header}`}>
                                        {title}
                                    </h3>
                                )}
                                {subtitle && (
                                    <p className={`mt-1 text-sm ${variants[variant].subtitle}`}>
                                        {subtitle}
                                    </p>
                                )}
                            </div>
                        </div>
                        {actions && <div className="flex-shrink-0 ml-4">{actions}</div>}
                    </div>
                </div>
            )}

            <div className={`${sizes[size]} ${variants[variant].content} ${title ? 'pt-0' : ''}`}>
                {children}
            </div>

            {footer && (
                <div
                    className={`
                        ${sizes[size]}
                        ${variants[variant].footer}
                        border-t
                        ${variants[variant].border}
                        rounded-b-lg
                    `}
                >
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card; 