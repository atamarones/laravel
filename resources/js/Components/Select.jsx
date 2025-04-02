import React, { forwardRef } from 'react';

const Select = forwardRef(({
    className = '',
    variant = 'default',
    size = 'md',
    error,
    disabled = false,
    icon: Icon,
    helperText,
    fullWidth = false,
    options = [],
    placeholder = 'Seleccionar...',
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
        ${Icon ? 'pl-10' : ''}
        appearance-none
        ${className}
    `.trim();

    return (
        <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
            {Icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className={`h-5 w-5 text-gray-400 ${error ? 'text-error-500' : ''}`} />
                </div>
            )}
            
            <select
                ref={ref}
                disabled={disabled}
                className={classes}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                    className={`h-5 w-5 text-gray-400 ${error ? 'text-error-500' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>

            {helperText && (
                <p className={`mt-1 text-sm ${error ? 'text-error-500' : 'text-gray-500'}`}>
                    {helperText}
                </p>
            )}
        </div>
    );
});

Select.displayName = 'Select';

export default Select; 