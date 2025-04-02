import React from 'react';
import { Transition } from '@headlessui/react';

const Alert = ({
    children,
    title,
    variant = 'info',
    icon: Icon,
    dismissible = true,
    show = true,
    onDismiss,
    className = '',
}) => {
    const variants = {
        info: {
            bg: 'bg-info-50',
            icon: 'text-info-400',
            title: 'text-info-800',
            text: 'text-info-700',
            button: 'text-info-500 hover:bg-info-100',
        },
        success: {
            bg: 'bg-success-50',
            icon: 'text-success-400',
            title: 'text-success-800',
            text: 'text-success-700',
            button: 'text-success-500 hover:bg-success-100',
        },
        warning: {
            bg: 'bg-warning-50',
            icon: 'text-warning-400',
            title: 'text-warning-800',
            text: 'text-warning-700',
            button: 'text-warning-500 hover:bg-warning-100',
        },
        error: {
            bg: 'bg-error-50',
            icon: 'text-error-400',
            title: 'text-error-800',
            text: 'text-error-700',
            button: 'text-error-500 hover:bg-error-100',
        },
    };

    const defaultIcons = {
        info: (props) => (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                />
            </svg>
        ),
        success: (props) => (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                />
            </svg>
        ),
        warning: (props) => (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                />
            </svg>
        ),
        error: (props) => (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    };

    const IconComponent = Icon || defaultIcons[variant];

    return (
        <Transition
            show={show}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className={`rounded-md ${variants[variant].bg} p-4 ${className}`}>
                <div className="flex">
                    <div className="flex-shrink-0">
                        <IconComponent className={`h-5 w-5 ${variants[variant].icon}`} aria-hidden="true" />
                    </div>
                    <div className="ml-3 flex-1">
                        <div className="flex justify-between items-center">
                            <div>
                                {title && (
                                    <h3 className={`text-sm font-medium ${variants[variant].title}`}>
                                        {title}
                                    </h3>
                                )}
                                <div className={`text-sm ${variants[variant].text} ${title ? 'mt-2' : ''}`}>
                                    {children}
                                </div>
                            </div>
                            {dismissible && (
                                <div className="ml-4 flex-shrink-0">
                                    <button
                                        type="button"
                                        className={`rounded-md inline-flex ${variants[variant].button} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${variant}-50 focus:ring-${variant}-600`}
                                        onClick={onDismiss}
                                    >
                                        <span className="sr-only">Cerrar</span>
                                        <svg
                                            className="h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );
};

export default Alert; 