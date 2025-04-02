import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Pagination from '@/Components/Pagination';
import SearchInput from '@/Components/SearchInput';

export default function Index({ auth, employees, filters, can }) {
    const [processing, setProcessing] = useState(false);

    const handleDelete = (id) => {
        if (confirm('¿Está seguro de que desea eliminar este empleado?')) {
            setProcessing(true);
            router.delete(route('employees.destroy', id), {
                onFinish: () => setProcessing(false),
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Empleados</h2>}
        >
            <Head title="Empleados" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="sm:flex sm:items-center sm:justify-between mb-6">
                                <div className="w-full max-w-lg">
                                    <SearchInput
                                        route={route('employees.index')}
                                        placeholder="Buscar por nombre o identificación..."
                                    />
                                </div>
                                {can.create && (
                                    <div className="mt-4 sm:mt-0">
                                        <Link
                                            href={route('employees.create')}
                                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:from-primary-700 hover:to-primary-900 focus:bg-primary-700 active:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                        >
                                            <PlusIcon className="h-4 w-4 mr-2" />
                                            Nuevo Empleado
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {employees.data.length === 0 ? (
                                <div className="text-center py-4">
                                    <p className="text-gray-500">No hay registros disponibles</p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-4">
                                        <Pagination links={employees} />
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Nombre
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Identificación
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Cargo
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Tipo
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Ciudad
                                                    </th>
                                                    <th scope="col" className="relative px-6 py-3">
                                                        <span className="sr-only">Acciones</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {employees.data.map(employee => (
                                                    <tr key={employee.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {employee.full_name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {employee.identification_number}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {employee.position}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {employee.collaborator_type}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {employee.city}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <div className="flex items-center justify-end gap-4">
                                                                <Link
                                                                    href={route('employees.show', employee.id)}
                                                                    className="text-gray-600 hover:text-gray-900"
                                                                >
                                                                    <EyeIcon className="h-5 w-5" />
                                                                </Link>

                                                                {can.edit && (
                                                                    <Link
                                                                        href={route('employees.edit', employee.id)}
                                                                        className="text-indigo-600 hover:text-indigo-900"
                                                                    >
                                                                        <PencilIcon className="h-5 w-5" />
                                                                    </Link>
                                                                )}

                                                                {can.delete && (
                                                                    <button
                                                                        onClick={() => handleDelete(employee.id)}
                                                                        disabled={processing}
                                                                        className="text-red-600 hover:text-red-900"
                                                                    >
                                                                        <TrashIcon className="h-5 w-5" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mt-4">
                                        <Pagination links={employees} />
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