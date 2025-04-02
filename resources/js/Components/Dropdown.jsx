import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from '@inertiajs/react';

const Dropdown = ({
    trigger,
    items = [],
    className = '',
    variant = 'default',
    size = 'md',
    align = 'right',
    width = 48,
}) => {
    const variants = {
        default: {
            button: 'text-gray-700 hover:bg-gray-50',
            active: 'bg-gray-100 text-gray-900',
            item: 'text-gray-700 hover:bg-gray-50',
            icon: 'text-gray-400',
        },
        primary: {
            button: 'text-primary-700 hover:bg-primary-50',
            active: 'bg-primary-100 text-primary-900',
            item: 'text-primary-700 hover:bg-primary-50',
            icon: 'text-primary-400',
        },
        secondary: {
            button: 'text-secondary-700 hover:bg-secondary-50',
            active: 'bg-secondary-100 text-secondary-900',
            item: 'text-secondary-700 hover:bg-secondary-50',
            icon: 'text-secondary-400',
        },
    };

    const sizes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
    };

    const alignmentClasses = {
        left: 'origin-top-left left-0',
        right: 'origin-top-right right-0',
        center: 'origin-top',
    };

    const widthClasses = {
        48: 'w-48',
        56: 'w-56',
        64: 'w-64',
        72: 'w-72',
    };

    const renderTrigger = ({ open }) => {
        if (typeof trigger === 'function') {
            return trigger({ open });
        }

        return (
            <button
                type="button"
                className={`
                    inline-flex items-center justify-center rounded-md
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                    ${variants[variant].button}
                    ${sizes[size]}
                    ${open ? variants[variant].active : ''}
                `}
            >
                {trigger}
                <svg
                    className={`ml-2 -mr-0.5 h-4 w-4 ${variants[variant].icon}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        );
    };

    const renderItem = (item) => {
        const itemClasses = `
            group flex w-full items-center px-4 py-2 ${sizes[size]}
            ${variants[variant].item}
            ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `;

        if (item.href) {
            return (
                <Link href={item.href} className={itemClasses}>
                    {item.icon && (
                        <item.icon className={`mr-3 h-5 w-5 ${variants[variant].icon} group-hover:text-inherit`} />
                    )}
                    {item.label}
                </Link>
            );
        }

        return (
            <button
                type="button"
                className={itemClasses}
                onClick={item.onClick}
                disabled={item.disabled}
            >
                {item.icon && (
                    <item.icon className={`mr-3 h-5 w-5 ${variants[variant].icon} group-hover:text-inherit`} />
                )}
                {item.label}
            </button>
        );
    };

    return (
        <Menu as="div" className={`relative inline-block text-left ${className}`}>
            <Menu.Button as={Fragment}>{renderTrigger}</Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className={`
                        absolute mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
                        ${alignmentClasses[align]}
                        ${widthClasses[width]}
                        z-50
                    `}
                >
                    <div className="py-1">
                        {items.map((item, index) => (
                            <Menu.Item key={item.id || index} disabled={item.disabled}>
                                {({ active }) => (
                                    <div className={active ? variants[variant].active : ''}>
                                        {renderItem(item)}
                                    </div>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default Dropdown;
