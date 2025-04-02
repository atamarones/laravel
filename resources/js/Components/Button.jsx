import React from 'react';
import { Link } from '@inertiajs/react';

export default function Button({
    children,
    type = 'button',
    className = '',
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    href,
    onClick,
    icon: Icon,
    iconPosition = 'left',
    fullWidth = false,
    ...props
}) {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variants = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
        secondary: 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 focus:ring-secondary-500',
        success: 'bg-success-500 text-white hover:bg-success-600 focus:ring-success-500',
        danger: 'bg-error-500 text-white hover:bg-error-600 focus:ring-error-500',
        warning: 'bg-warning-500 text-white hover:bg-warning-600 focus:ring-warning-500',
        info: 'bg-info-500 text-white hover:bg-info-600 focus:ring-info-500',
        outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-primary-500',
        text: 'text-primary-600 hover:text-primary-700 hover:bg-primary-50 focus:ring-primary-500',
    };

    const sizes = {
        xs: 'px-2.5 py-1.5 text-xs rounded',
        sm: 'px-3 py-2 text-sm leading-4 rounded-md',
        md: 'px-4 py-2 text-sm rounded-md',
        lg: 'px-4 py-2 text-base rounded-md',
        xl: 'px-6 py-3 text-base rounded-md',
    };

    const classes = `
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
    `.trim();

    const content = (
        <>
            {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {Icon && iconPosition === 'left' && !loading && (
                <Icon className={`-ml-1 mr-2 h-4 w-4 ${size === 'xl' ? 'h-5 w-5' : ''}`} />
            )}
            {children}
            {Icon && iconPosition === 'right' && !loading && (
                <Icon className={`ml-2 -mr-1 h-4 w-4 ${size === 'xl' ? 'h-5 w-5' : ''}`} />
            )}
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                className={classes}
                {...props}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {content}
        </button>
    );
} 