import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextArea(
    { name = '', id = '', className = '', required = false, isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            name={name}
            id={id}
            ref={input}
            className={
                `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ` +
                className
            }
            required={required}
        />
    );
}); 