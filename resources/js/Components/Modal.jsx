import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const Modal = ({
    children,
    show = false,
    maxWidth = '2xl',
    closeable = true,
    onClose = () => {},
    title,
    description,
    footer,
    variant = 'default',
    size = 'md',
    fullScreen = false,
    loading = false,
}) => {
    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '3xl': 'sm:max-w-3xl',
        '4xl': 'sm:max-w-4xl',
        '5xl': 'sm:max-w-5xl',
        '6xl': 'sm:max-w-6xl',
        '7xl': 'sm:max-w-7xl',
    }[maxWidth];

    const variants = {
        default: 'bg-white',
        primary: 'bg-primary-50',
        secondary: 'bg-secondary-50',
        warning: 'bg-warning-50',
        danger: 'bg-error-50',
        success: 'bg-success-50',
    };

    const sizes = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all"
                onClose={closeable ? onClose : () => {}}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-500/75" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel
                        className={`mb-6 ${
                            fullScreen
                                ? 'w-full h-screen'
                                : `${maxWidthClass} w-full mx-auto`
                        } transform overflow-hidden rounded-lg shadow-xl transition-all`}
                    >
                        <div className={`${variants[variant]} ${sizes[size]}`}>
                            {loading && (
                                <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-50">
                                    <svg
                                        className="animate-spin h-8 w-8 text-primary-600"
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
                                </div>
                            )}

                            {closeable && (
                                <div className="absolute top-0 right-0 pt-4 pr-4">
                                    <button
                                        type="button"
                                        className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        onClick={onClose}
                                    >
                                        <span className="sr-only">Cerrar</span>
                                        <svg
                                            className="h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}

                            {title && (
                                <Dialog.Title className="text-lg font-medium text-gray-900">
                                    {title}
                                </Dialog.Title>
                            )}

                            {description && (
                                <Dialog.Description className="mt-2 text-sm text-gray-500">
                                    {description}
                                </Dialog.Description>
                            )}

                            <div className={`${title || description ? 'mt-4' : ''}`}>
                                {children}
                            </div>

                            {footer && (
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                    {footer}
                                </div>
                            )}
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
};

export default Modal;
