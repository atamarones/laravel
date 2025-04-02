import React, { useId } from 'react';
import { useFormContext } from './FormProvider';

const FormField = ({
    name,
    label,
    type = 'text',
    placeholder,
    helperText,
    required = false,
    disabled = false,
    className = '',
    inputClassName = '',
    labelClassName = '',
    errorClassName = '',
    helperClassName = '',
    startAdornment,
    endAdornment,
    hideError = false,
    ...props
}) => {
    const {
        errors,
        touchedFields,
        getFieldProps,
    } = useFormContext();

    const id = useId();
    const fieldId = `${id}-${name}`;
    const errorId = `${fieldId}-error`;
    const helperId = `${fieldId}-helper`;

    const hasError = touchedFields[name] && errors[name]?.length > 0;
    const errorMessage = hasError ? errors[name][0] : '';

    const baseInputClasses = `
        w-full rounded-md border px-4 py-2 text-sm transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-75
        ${hasError
            ? 'border-error-300 bg-error-50 text-error-900 placeholder-error-300 focus:border-error-500 focus:ring-error-500'
            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500'
        }
        ${inputClassName}
    `;

    return (
        <div className={`space-y-1 ${className}`}>
            {label && (
                <label
                    htmlFor={fieldId}
                    className={`
                        block text-sm font-medium
                        ${hasError ? 'text-error-700' : 'text-gray-700'}
                        ${labelClassName}
                    `}
                >
                    {label}
                    {required && <span className="ml-1 text-error-500">*</span>}
                </label>
            )}

            <div className="relative">
                {startAdornment && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        {startAdornment}
                    </div>
                )}

                <input
                    id={fieldId}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className={`
                        ${baseInputClasses}
                        ${startAdornment ? 'pl-10' : ''}
                        ${endAdornment ? 'pr-10' : ''}
                    `}
                    aria-required={required}
                    aria-invalid={hasError}
                    aria-describedby={`
                        ${errorMessage ? errorId : ''}
                        ${helperText ? helperId : ''}
                    `.trim()}
                    {...getFieldProps(name)}
                    {...props}
                />

                {endAdornment && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {endAdornment}
                    </div>
                )}
            </div>

            {!hideError && errorMessage && (
                <p
                    id={errorId}
                    role="alert"
                    className={`
                        text-sm text-error-600
                        ${errorClassName}
                    `}
                >
                    {errorMessage}
                </p>
            )}

            {helperText && (
                <p
                    id={helperId}
                    className={`
                        text-sm text-gray-500
                        ${helperClassName}
                    `}
                >
                    {helperText}
                </p>
            )}
        </div>
    );
};

export default FormField; 