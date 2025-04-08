import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, position }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detalles del Cargo</h2>}
        >
            <Head title="Detalles del Cargo" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <Link
                                    href={route('positions.index')}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    ← Volver a la lista
                                </Link>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Información del Cargo</h3>
                                <div className="mt-4 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                                        <div className="mt-1 text-sm text-gray-900">{position.name}</div>
                                    </div>

                                    {position.description && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Descripción</label>
                                            <div className="mt-1 text-sm text-gray-900">{position.description}</div>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Fecha de Creación</label>
                                        <div className="mt-1 text-sm text-gray-900">
                                            {new Date(position.created_at).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Última Actualización</label>
                                        <div className="mt-1 text-sm text-gray-900">
                                            {new Date(position.updated_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 