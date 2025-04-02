import React from 'react';
import { theme } from '@/theme';

export default function Card({
    children,
    className = '',
    title,
    subtitle,
    actions,
    footer,
    noPadding = false,
    variant = 'default',
    loading = false,
}) {
    const variants = {
        default: 'bg-white border border-gray-200',
        flat: 'bg-white',
        raised: 'bg-white shadow-lg',
        outlined: 'bg-white border border-gray-200',
    };

    return (
        <div
            className={`
                rounded-lg overflow-hidden
                ${variants[variant]}
                ${loading ? 'animate-pulse' : ''}
                ${className}
            `.trim()}
        >
            {/* Card Header */}
            {(title || actions) && (
                <div className="px-4 py-3 sm:px-6 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        {title && (
                            <h3 className="text-lg font-medium text-gray-900">
                                {title}
                            </h3>
                        )}
                        {subtitle && (
                            <p className="mt-1 text-sm text-gray-500">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    {actions && (
                        <div className="flex items-center space-x-2">
                            {actions}
                        </div>
                    )}
                </div>
            )}

            {/* Card Content */}
            <div className={!noPadding ? 'p-4 sm:p-6' : ''}>
                {children}
            </div>

            {/* Card Footer */}
            {footer && (
                <div className="px-4 py-3 sm:px-6 bg-gray-50 border-t border-gray-200">
                    {footer}
                </div>
            )}
        </div>
    );
} 