import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, autoComplete = 'off', ...props }, ref) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            autoComplete={autoComplete}
            className={
                `mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
                    isFocused && 'border-primary-500 ring-primary-500'
                } ${className}`
            }
            ref={ref || input}
        />
    );
});
