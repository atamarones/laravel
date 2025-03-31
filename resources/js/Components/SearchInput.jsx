import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { router } from '@inertiajs/react';
import { debounce } from 'lodash';

export default function SearchInput({ route, placeholder = 'Buscar...' }) {
    const [search, setSearch] = useState('');

    const debouncedSearch = debounce((value) => {
        router.get(route, { search: value }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }, 300);

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        debouncedSearch(value);
    };

    return (
        <div className="relative flex items-center">
            <MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-400" />
            <input
                type="text"
                value={search}
                onChange={handleSearch}
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                placeholder={placeholder}
            />
        </div>
    );
} 