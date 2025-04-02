import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import EmployeeForm from './Form';

export default function Create({ 
    auth,
    genders,
    civilStatuses,
    positions,
    collaboratorTypes,
    cities,
    bloodTypes
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Crear Empleado</h2>}
        >
            <Head title="Crear Empleado" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <EmployeeForm 
                        genders={genders}
                        civilStatuses={civilStatuses}
                        positions={positions}
                        collaboratorTypes={collaboratorTypes}
                        cities={cities}
                        bloodTypes={bloodTypes}
                        className="space-y-6"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 