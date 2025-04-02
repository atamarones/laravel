import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';

const Notification = ({
    show = false,
    title,
    message,
    variant = 'info',
    icon: Icon,
    position = 'top-right',
    duration = 5000,
    onClose,
    action,
}) => {
    const variants = {
        info: {
            bg: 'bg-info-50',
            icon: 'text-info-400',
            title: 'text-info-800',
            text: 'text-info-700',
            button: 'text-info-500 hover:text-info-600',
        },
        success: {
            bg: 'bg-success-50',
            icon: 'text-success-400',
            title: 'text-success-800',
            text: 'text-success-700',
            button: 'text-success-500 hover:text-success-600',
        },
        warning: {
            bg: 'bg-warning-50',
            icon: 'text-warning-400',
            title: 'text-warning-800',
            text: 'text-warning-700',
            button: 'text-warning-500 hover:text-warning-600',
        },
        error: {
            bg: 'bg-error-50',
            icon: 'text-error-400',
            title: 'text-error-800',
            text: 'text-error-700',
            button: 'text-error-500 hover:text-error-600',
        },
    };

    const positions = {
        'top-right': 'top-0 right-0',
        'top-left': 'top-0 left-0',
        'bottom-right': 'bottom-0 right-0',
        'bottom-left': 'bottom-0 left-0',
        'top-center': 'top-0 left-1/2 transform -translate-x-1/2',
        'bottom-center': 'bottom-0 left-1/2 transform -translate-x-1/2',
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

    React.useEffect(() => {
        if (show && duration && onClose) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    return (
        <div
            aria-live="assertive"
            className={`fixed ${positions[position]} z-50 flex items-end px-4 py-6 pointer-events-none sm:p-6`}
        >
            <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                <Transition
                    show={show}
                    as={Fragment}
                    enter="transform ease-out duration-300 transition"
                    enterFrom={
                        position.includes('bottom')
                            ? 'translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
                            : '-translate-y-2 opacity-0 sm:translate-y-0 sm:-translate-x-2'
                    }
                    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className={`
                            max-w-sm w-full ${variants[variant].bg} shadow-lg rounded-lg pointer-events-auto
                            ring-1 ring-black ring-opacity-5 overflow-hidden
                        `}
                    >
                        <div className="p-4">
                            <div className="flex items-start">
                                {IconComponent && (
                                    <div className="flex-shrink-0">
                                        <IconComponent className={`h-6 w-6 ${variants[variant].icon}`} />
                                    </div>
                                )}
                                <div className="ml-3 w-0 flex-1 pt-0.5">
                                    {title && (
                                        <p className={`text-sm font-medium ${variants[variant].title}`}>
                                            {title}
                                        </p>
                                    )}
                                    <p className={`mt-1 text-sm ${variants[variant].text}`}>{message}</p>
                                    {action && (
                                        <div className="mt-3 flex space-x-7">
                                            <button
                                                type="button"
                                                className={`
                                                    bg-transparent rounded-md text-sm font-medium
                                                    ${variants[variant].button}
                                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                                                `}
                                                onClick={action.onClick}
                                            >
                                                {action.label}
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="ml-4 flex-shrink-0 flex">
                                    <button
                                        type="button"
                                        className={`
                                            rounded-md inline-flex ${variants[variant].button}
                                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                                        `}
                                        onClick={onClose}
                                    >
                                        <span className="sr-only">Cerrar</span>
                                        <svg
                                            className="h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    );
};

export default Notification; 