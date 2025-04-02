import React from 'react';

export default function Container({ children, className = '', size = 'default', as: Component = 'div' }) {
    const sizes = {
        sm: 'max-w-4xl',
        default: 'max-w-7xl',
        lg: 'max-w-8xl',
        full: 'max-w-full'
    };

    return (
        <Component
            className={`
                w-full mx-auto px-4 
                sm:px-6 
                lg:px-8 
                ${sizes[size]}
                ${className}
            `.trim()}
        >
            {children}
        </Component>
    );
} 