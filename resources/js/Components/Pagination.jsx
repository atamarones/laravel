import { Link } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Pagination({ links }) {
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            {/* Paginación móvil */}
            <div className="flex flex-1 justify-between sm:hidden">
                <Link
                    href={links.prev_page_url}
                    preserveScroll
                    className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                        !links.prev_page_url
                            ? 'pointer-events-none bg-gray-100 text-gray-400'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    Anterior
                </Link>
                <Link
                    href={links.next_page_url}
                    preserveScroll
                    className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                        !links.next_page_url
                            ? 'pointer-events-none bg-gray-100 text-gray-400'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    Siguiente
                </Link>
            </div>

            {/* Paginación escritorio */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{links.from}</span> a{' '}
                        <span className="font-medium">{links.to}</span> de{' '}
                        <span className="font-medium">{links.total}</span> resultados
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <Link
                            href={links.prev_page_url}
                            preserveScroll
                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                                !links.prev_page_url
                                    ? 'pointer-events-none bg-gray-100'
                                    : 'hover:bg-gray-50'
                            }`}
                        >
                            <span className="sr-only">Anterior</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                        <Link
                            href={links.next_page_url}
                            preserveScroll
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                                !links.next_page_url
                                    ? 'pointer-events-none bg-gray-100'
                                    : 'hover:bg-gray-50'
                            }`}
                        >
                            <span className="sr-only">Siguiente</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
} 