import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, absences }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Ausencias</h2>}
        >
            <Head title="Ausencias" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold">Lista de Ausencias</h3>
                                <Link href={route('absences.create')}>
                                    <PrimaryButton type="button">
                                        Registrar Ausencia
                                    </PrimaryButton>
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="py-2 px-4 border">Empleado</th>
                                            <th className="py-2 px-4 border">Tipo</th>
                                            <th className="py-2 px-4 border">Fecha Inicio</th>
                                            <th className="py-2 px-4 border">Fecha Fin</th>
                                            <th className="py-2 px-4 border">Días</th>
                                            <th className="py-2 px-4 border">Horas</th>
                                            <th className="py-2 px-4 border">Valor</th>
                                            <th className="py-2 px-4 border">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {absences?.map((absence) => (
                                            <tr key={absence.id}>
                                                <td className="py-2 px-4 border">{absence.employee?.full_name}</td>
                                                <td className="py-2 px-4 border">{absence.absence_type?.name}</td>
                                                <td className="py-2 px-4 border">{absence.start_date}</td>
                                                <td className="py-2 px-4 border">{absence.end_date}</td>
                                                <td className="py-2 px-4 border">{absence.absence_days}</td>
                                                <td className="py-2 px-4 border">{absence.hours}</td>
                                                <td className="py-2 px-4 border">{absence.absence_value}</td>
                                                <td className="py-2 px-4 border">
                                                    <Link
                                                        href={route('absences.show', absence.id)}
                                                        className="text-blue-600 hover:text-blue-800 mr-2"
                                                    >
                                                        Ver
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 