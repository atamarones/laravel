import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const ConfirmDialog = ({
    show = false,
    title,
    message,
    variant = 'default',
    icon: Icon,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    onConfirm,
    onCancel,
    loading = false,
    size = 'md',
}) => {
    const variants = {
        default: {
            icon: 'text-gray-400',
            title: 'text-gray-900',
            message: 'text-gray-500',
            confirmButton: 'bg-primary-600 text-white hover:bg-primary-700',
            cancelButton: 'bg-white text-gray-700 hover:bg-gray-50',
        },
        danger: {
            icon: 'text-error-400',
            title: 'text-error-900',
            message: 'text-error-500',
            confirmButton: 'bg-error-600 text-white hover:bg-error-700',
            cancelButton: 'bg-white text-gray-700 hover:bg-gray-50',
        },
        warning: {
            icon: 'text-warning-400',
            title: 'text-warning-900',
            message: 'text-warning-500',
            confirmButton: 'bg-warning-600 text-white hover:bg-warning-700',
            cancelButton: 'bg-white text-gray-700 hover:bg-gray-50',
        },
        info: {
            icon: 'text-info-400',
            title: 'text-info-900',
            message: 'text-info-500',
            confirmButton: 'bg-info-600 text-white hover:bg-info-700',
            cancelButton: 'bg-white text-gray-700 hover:bg-gray-50',
        },
    };

    const sizes = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    };

    const defaultIcons = {
        default: (props) => (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
        danger: (props) => (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
            </svg>
        ),
        warning: (props) => (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
        info: (props) => (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
    };

    const IconComponent = Icon || defaultIcons[variant];

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onCancel}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={`
                                    w-full ${sizes[size]} transform overflow-hidden rounded-2xl
                                    bg-white p-6 text-left align-middle shadow-xl transition-all
                                `}
                            >
                                <div className="sm:flex sm:items-start">
                                    {IconComponent && (
                                        <div
                                            className={`
                                                mx-auto flex h-12 w-12 flex-shrink-0 items-center
                                                justify-center rounded-full bg-${variant}-100 sm:mx-0 sm:h-10 sm:w-10
                                            `}
                                        >
                                            <IconComponent className={`h-6 w-6 ${variants[variant].icon}`} />
                                        </div>
                                    )}
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className={`text-lg font-medium leading-6 ${variants[variant].title}`}>
                                            {title}
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className={`text-sm ${variants[variant].message}`}>{message}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className={`
                                            inline-flex w-full justify-center rounded-md border border-transparent
                                            px-4 py-2 text-base font-medium shadow-sm focus:outline-none
                                            focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm
                                            ${variants[variant].confirmButton}
                                            ${loading ? 'opacity-75 cursor-not-allowed' : ''}
                                            focus:ring-${variant === 'default' ? 'primary' : variant}-500
                                        `}
                                        onClick={onConfirm}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                                Procesando...
                                            </>
                                        ) : (
                                            confirmText
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className={`
                                            mt-3 inline-flex w-full justify-center rounded-md border
                                            border-gray-300 px-4 py-2 text-base font-medium shadow-sm
                                            focus:outline-none focus:ring-2 focus:ring-offset-2
                                            focus:ring-primary-500 sm:mt-0 sm:w-auto sm:text-sm
                                            ${variants[variant].cancelButton}
                                        `}
                                        onClick={onCancel}
                                    >
                                        {cancelText}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ConfirmDialog; 