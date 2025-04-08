import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head } from '@inertiajs/react';
import EmployeeForm from './Form';

export default function Edit({ 
    auth,
    employee,
    genders,
    civilStatuses,
    positions,
    collaboratorTypes,
    cities,
    bloodTypes,
    epsList
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Empleado</h2>}
        >
            <Head title="Editar Empleado" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <EmployeeForm 
                        employee={employee}
                        genders={genders}
                        civilStatuses={civilStatuses}
                        positions={positions}
                        collaboratorTypes={collaboratorTypes}
                        cities={cities}
                        bloodTypes={bloodTypes}
                        epsList={epsList}
                        className="space-y-6"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 