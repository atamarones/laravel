import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

const Navigation = ({
    items = [],
    variant = 'default',
    size = 'md',
    vertical = false,
    collapsible = false,
    className = '',
    activeItem,
    onItemClick,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const variants = {
        default: {
            nav: 'bg-white',
            item: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
            activeItem: 'text-primary-600 bg-primary-50',
        },
        primary: {
            nav: 'bg-primary-600',
            item: 'text-primary-100 hover:text-white hover:bg-primary-700',
            activeItem: 'text-white bg-primary-700',
        },
        secondary: {
            nav: 'bg-secondary-600',
            item: 'text-secondary-100 hover:text-white hover:bg-secondary-700',
            activeItem: 'text-white bg-secondary-700',
        },
    };

    const sizes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
    };

    const baseItemStyles = `
        flex items-center px-4 py-2 font-medium rounded-md
        transition-colors duration-150 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
    `;

    const renderItems = () => (
        <div className={`${vertical ? 'flex-col' : 'flex-row'} flex ${!vertical && 'space-x-4'}`}>
            {items.map((item, index) => {
                const isActive = activeItem === item.key;
                const itemClasses = `
                    ${baseItemStyles}
                    ${isActive ? variants[variant].activeItem : variants[variant].item}
                    ${vertical && 'w-full'}
                    ${vertical && index > 0 && 'mt-1'}
                `;

                return (
                    <Link
                        key={item.key}
                        href={item.href}
                        className={itemClasses}
                        onClick={() => onItemClick && onItemClick(item)}
                    >
                        {item.icon && (
                            <item.icon
                                className={`flex-shrink-0 h-5 w-5 ${
                                    isActive ? 'text-current' : 'text-current opacity-75'
                                } mr-2`}
                            />
                        )}
                        {item.label}
                    </Link>
                );
            })}
        </div>
    );

    return (
        <nav
            className={`
                ${variants[variant].nav}
                ${sizes[size]}
                ${className}
                ${vertical ? 'flex flex-col' : 'flex items-center'}
                ${collapsible ? 'relative' : ''}
            `}
        >
            {collapsible ? (
                <>
                    <button
                        type="button"
                        className="inline-flex items-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="sr-only">Abrir menú</span>
                        <svg
                            className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                        <svg
                            className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <Transition
                        show={isOpen}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">{renderItems()}</div>
                        </div>
                    </Transition>
                </>
            ) : (
                renderItems()
            )}
        </nav>
    );
};

export default Navigation; 