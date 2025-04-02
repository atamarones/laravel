import React from 'react';
import { Link } from '@inertiajs/react';

const Pagination = ({ links }) => {
    // Si no hay links o no es un objeto con links, no renderizar nada
    if (!links || !links.links || links.links.length <= 3) {
        return null;
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                {links.prev ? (
                    <Link
                        href={links.prev}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Anterior
                    </Link>
                ) : (
                    <button
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 cursor-not-allowed"
                        disabled
                    >
                        Anterior
                    </button>
                )}
                {links.next ? (
                    <Link
                        href={links.next}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Siguiente
                    </Link>
                ) : (
                    <button
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 cursor-not-allowed"
                        disabled
                    >
                        Siguiente
                    </button>
                )}
            </div>
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
                        {links.links.map((link, index) => {
                            if (link.url === null) {
                                return (
                                    <span
                                        key={index}
                                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 bg-gray-100 cursor-not-allowed"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            }

                            return (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 ${
                                        link.active
                                            ? 'z-10 bg-primary-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                                    } ${index === 0 ? 'rounded-l-md' : ''} ${
                                        index === links.links.length - 1 ? 'rounded-r-md' : ''
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination; 