import { useCallback, useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';

export default function SearchInput({ value = '', placeholder = 'Buscar...', className = '' }) {
    const [query, setQuery] = useState(value);

    useEffect(() => {
        setQuery(value);
    }, [value]);

    const debouncedSearch = useCallback(
        debounce((query) => {
            router.get(
                route(route().current()),
                { search: query },
                { preserveState: true, preserveScroll: true }
            );
        }, 300),
        []
    );

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
    };

    return (
        <div className={`relative ${className}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder={placeholder}
            />
        </div>
    );
} 