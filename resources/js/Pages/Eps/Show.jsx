import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, eps }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detalles de la EPS</h2>}
        >
            <Head title="Detalles de la EPS" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4">
                                <Link
                                    href={route('eps.index')}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Volver al listado
                                </Link>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Información de la EPS</h3>
                                
                                <div className="mt-4 space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Nombre</p>
                                        <p className="mt-1">{eps.name}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Código</p>
                                        <p className="mt-1">{eps.code}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Código de Movilidad</p>
                                        <p className="mt-1">{eps.mobility_code || 'No especificado'}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-500">NIT</p>
                                        <p className="mt-1">{eps.nit}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Régimen</p>
                                        <p className="mt-1">{eps.regime}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Fecha de Creación</p>
                                        <p className="mt-1">{new Date(eps.created_at).toLocaleDateString()}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Última Actualización</p>
                                        <p className="mt-1">{new Date(eps.updated_at).toLocaleDateString()}</p>
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