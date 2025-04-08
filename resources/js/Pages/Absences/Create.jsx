import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AbsenceForm from './Form';

export default function Create({ 
    auth,
    absenceTypes,
    epsList,
    cie10List,
    can
}) {
    console.log('Datos recibidos en Create:', { absenceTypes, epsList, cie10List });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registrar Ausencia</h2>}
        >
            <Head title="Registrar Ausencia" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <AbsenceForm 
                        absenceTypes={absenceTypes || []}
                        epsList={epsList || []}
                        cie10List={cie10List || []}
                        className="space-y-6"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 