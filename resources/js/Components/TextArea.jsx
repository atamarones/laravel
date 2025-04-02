import React, { forwardRef } from 'react';

const TextArea = forwardRef(({
    className = '',
    variant = 'default',
    error,
    disabled = false,
    helperText,
    fullWidth = false,
    rows = 4,
    maxLength,
    showCount = false,
    value = '',
    onChange,
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

    const classes = `
        ${baseStyles}
        ${variants[variant]}
        px-4 py-2 text-sm
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}
        ${className}
    `.trim();

    const characterCount = value?.length || 0;

    return (
        <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
            <textarea
                ref={ref}
                disabled={disabled}
                className={classes}
                rows={rows}
                maxLength={maxLength}
                value={value}
                onChange={onChange}
                {...props}
            />

            {(helperText || (showCount && maxLength)) && (
                <div className="mt-1 flex justify-between">
                    {helperText && (
                        <p className={`text-sm ${error ? 'text-error-500' : 'text-gray-500'}`}>
                            {helperText}
                        </p>
                    )}
                    {showCount && maxLength && (
                        <p className={`text-sm ${characterCount > maxLength * 0.9 ? 'text-warning-500' : 'text-gray-500'}`}>
                            {characterCount}/{maxLength}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
});

TextArea.displayName = 'TextArea';

export default TextArea; 