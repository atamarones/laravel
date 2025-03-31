import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { UserGroupIcon } from '@heroicons/react/24/outline';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Panel de Control
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    {/* Mensaje de bienvenida */}
                    <div className="overflow-hidden rounded-lg bg-gradient-to-r from-primary-600 to-primary-800 shadow">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <UserGroupIcon className="h-12 w-12 text-white" aria-hidden="true" />
                                </div>
                                <div className="ml-5">
                                    <h3 className="text-lg font-medium leading-6 text-white">
                                        Bienvenido, {auth.user.name}
                                    </h3>
                                    <div className="mt-2 text-sm text-primary-100">
                                        Accede rápidamente a todas las funcionalidades del sistema desde este panel de control.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Aquí irá el nuevo contenido del dashboard */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
