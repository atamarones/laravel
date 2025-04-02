import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Pagination from '@/Components/Pagination';
import SearchInput from '@/Components/SearchInput';

export default function Index({ auth, eps }) {
    const [processing, setProcessing] = useState(false);

    const handleDelete = (id) => {
        if (confirm('¿Está seguro de que desea eliminar esta EPS?')) {
            setProcessing(true);
            router.delete(route('eps.destroy', id), {
                onFinish: () => setProcessing(false),
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">EPS</h2>}
        >
            <Head title="EPS" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="sm:flex sm:items-center sm:justify-between mb-6">
                                <div className="w-full max-w-lg">
                                    <SearchInput 
                                        route={route('eps.index')}
                                        placeholder="Buscar EPS..."
                                    />
                                </div>
                                {auth.user.permissions.includes('eps.create') && (
                                    <div className="mt-4 sm:mt-0">
                                        <Link
                                            href={route('eps.create')}
                                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:from-primary-700 hover:to-primary-900 focus:bg-primary-700 active:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                        >
                                            <PlusIcon className="h-4 w-4 mr-2" />
                                            Nueva EPS
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {eps.data.length === 0 ? (
                                <div className="text-center py-4">
                                    <p className="text-gray-500">No hay registros disponibles</p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-4">
                                        <Pagination links={eps} />
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Código
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Entidad
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        NIT
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Régimen
                                                    </th>
                                                    <th className="relative px-6 py-3">
                                                        <span className="sr-only">Acciones</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {eps.data.map((item) => (
                                                    <tr key={item.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {item.code}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {item.name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {item.nit}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {item.regime}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                            <Link
                                                                href={route('eps.show', item.id)}
                                                                className="inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded text-gray-700 hover:text-gray-900 focus:outline-none transition ease-in-out duration-150"
                                                            >
                                                                <EyeIcon className="h-4 w-4" />
                                                            </Link>
                                                            
                                                            {auth.user.permissions.includes('eps.edit') && (
                                                                <Link
                                                                    href={route('eps.edit', item.id)}
                                                                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded text-indigo-700 hover:text-indigo-900 focus:outline-none transition ease-in-out duration-150"
                                                                >
                                                                    <PencilIcon className="h-4 w-4" />
                                                                </Link>
                                                            )}
                                                            
                                                            {auth.user.permissions.includes('eps.delete') && (
                                                                <button
                                                                    onClick={() => handleDelete(item.id)}
                                                                    disabled={processing}
                                                                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded text-red-700 hover:text-red-900 focus:outline-none transition ease-in-out duration-150"
                                                                >
                                                                    <TrashIcon className="h-4 w-4" />
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mt-4">
                                        <Pagination links={eps} />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 