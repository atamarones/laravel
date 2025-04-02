import React from 'react';
import { Tab } from '@headlessui/react';

const Tabs = ({
    tabs = [],
    className = '',
    variant = 'default',
    size = 'md',
    orientation = 'horizontal',
    fullWidth = false,
    onChange,
    defaultIndex = 0,
}) => {
    const variants = {
        default: {
            tab: 'text-gray-500 hover:text-gray-700',
            selected: 'text-primary-600 border-primary-500',
            panel: 'bg-white',
        },
        primary: {
            tab: 'text-primary-400 hover:text-primary-600',
            selected: 'text-primary-900 border-primary-500',
            panel: 'bg-primary-50',
        },
        secondary: {
            tab: 'text-secondary-400 hover:text-secondary-600',
            selected: 'text-secondary-900 border-secondary-500',
            panel: 'bg-secondary-50',
        },
        pills: {
            tab: 'text-gray-500 hover:text-gray-700',
            selected: 'bg-primary-100 text-primary-700',
            panel: 'bg-white',
        },
    };

    const sizes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
    };

    const baseTabStyles = `
        inline-flex items-center justify-center
        font-medium
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
        transition-colors duration-200 ease-in-out
    `;

    const orientationStyles = {
        horizontal: {
            list: 'flex space-x-8 border-b border-gray-200',
            tab: 'px-1 py-4 border-b-2 border-transparent',
        },
        vertical: {
            list: 'flex flex-col space-y-1',
            tab: 'px-3 py-2 rounded-md',
        },
    };

    const renderTab = (tab) => (
        <Tab
            key={tab.id}
            className={({ selected }) => `
                ${baseTabStyles}
                ${orientationStyles[orientation].tab}
                ${sizes[size]}
                ${selected ? variants[variant].selected : variants[variant].tab}
                ${fullWidth ? 'w-full' : ''}
                ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            disabled={tab.disabled}
        >
            {({ selected }) => (
                <>
                    {tab.icon && (
                        <tab.icon
                            className={`
                                ${orientation === 'horizontal' ? 'mr-2' : 'mr-3'}
                                h-5 w-5
                                ${selected ? 'text-current' : 'text-gray-400 group-hover:text-gray-500'}
                            `}
                        />
                    )}
                    {tab.label}
                    {tab.count !== undefined && (
                        <span
                            className={`
                                ml-2 rounded-full px-2.5 py-0.5 text-xs font-medium
                                ${
                                    selected
                                        ? 'bg-primary-100 text-primary-700'
                                        : 'bg-gray-100 text-gray-900'
                                }
                            `}
                        >
                            {tab.count}
                        </span>
                    )}
                </>
            )}
        </Tab>
    );

    return (
        <Tab.Group
            defaultIndex={defaultIndex}
            onChange={onChange}
            vertical={orientation === 'vertical'}
        >
            <Tab.List
                className={`
                    ${orientationStyles[orientation].list}
                    ${className}
                `}
            >
                {tabs.map(renderTab)}
            </Tab.List>
            <Tab.Panels className="mt-4">
                {tabs.map((tab) => (
                    <Tab.Panel
                        key={tab.id}
                        className={`
                            rounded-lg
                            ${variants[variant].panel}
                            focus:outline-none focus:ring-2 focus:ring-primary-500
                        `}
                    >
                        {tab.content}
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    );
};

export default Tabs; 