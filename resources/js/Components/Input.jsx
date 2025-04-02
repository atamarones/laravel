import React, { forwardRef } from 'react';

const Input = forwardRef(({
    type = 'text',
    className = '',
    variant = 'default',
    size = 'md',
    error,
    disabled = false,
    icon: Icon,
    iconPosition = 'left',
    helperText,
    fullWidth = false,
    ...props
}, ref) => {
    const baseStyles = 'block w-full transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variants = {
        default: `
            border-gray-300 focus:border-primary-500 focus:ring-primary-500
            ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}
        `,
        filled: `
            bg-gray-100 border-transparent
            ${error ? 'bg-error-50' : ''}
            focus:bg-white focus:border-primary-500
        `,
        flushed: `
            border-t-0 border-l-0 border-r-0 border-b-2 rounded-none px-0
            ${error ? 'border-error-500' : 'border-gray-300'}
            focus:border-primary-500
        `,
    };

    const sizes = {
        xs: 'px-2.5 py-1.5 text-xs',
        sm: 'px-3 py-2 text-sm leading-4',
        md: 'px-4 py-2 text-sm',
        lg: 'px-4 py-2 text-base',
        xl: 'px-6 py-3 text-base',
    };

    const classes = `
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}
        ${Icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : ''}
        ${className}
    `.trim();

    return (
        <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
            {Icon && iconPosition === 'left' && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className={`h-5 w-5 text-gray-400 ${error ? 'text-error-500' : ''}`} />
                </div>
            )}
            
            <input
                ref={ref}
                type={type}
                disabled={disabled}
                className={classes}
                {...props}
            />

            {Icon && iconPosition === 'right' && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Icon className={`h-5 w-5 text-gray-400 ${error ? 'text-error-500' : ''}`} />
                </div>
            )}

            {helperText && (
                <p className={`mt-1 text-sm ${error ? 'text-error-500' : 'text-gray-500'}`}>
                    {helperText}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input; 