import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PencilIcon } from '@heroicons/react/24/outline';

export default function Show({ auth, employee, can }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Detalles del Empleado
                    </h2>
                    {can.update && (
                        <Link
                            href={route('employees.edit', employee.id)}
                            className="flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700"
                        >
                            <PencilIcon className="h-4 w-4 mr-2" />
                            Editar
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Detalles del Empleado" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Información básica */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Información Básica</h3>
                            <dl className="grid grid-cols-1 gap-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Nombre Completo</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.full_name}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Número de Identificación</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.identification_number}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Fecha de Nacimiento</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {new Date(employee.birth_date).toLocaleDateString()}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Lugar de Nacimiento</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.birth_place}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Género</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.gender?.name || 'No especificado'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Estado Civil</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.civil_status?.name || 'No especificado'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Altura</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.height} m</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Peso</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.weight} kg</dd>
                                </div>
                            </dl>
                        </div>

                        {/* Información laboral */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Información Laboral</h3>
                            <dl className="grid grid-cols-1 gap-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Fecha de Inicio</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {new Date(employee.start_date).toLocaleDateString()}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Cargo</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.position?.name || 'No especificado'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Tipo de Colaborador</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.collaborator_type?.name || 'No especificado'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Ciudad</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.city?.name || 'No especificado'}</dd>
                                </div>
                            </dl>
                        </div>

                        {/* Información de contacto */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Información de Contacto</h3>
                            <dl className="grid grid-cols-1 gap-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Dirección</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.contact_information?.address || 'No especificado'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Teléfono</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.contact_information?.phone || 'No especificado'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Correo Electrónico</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.contact_information?.email || 'No especificado'}</dd>
                                </div>
                            </dl>
                        </div>

                        {/* Seguridad social */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Seguridad Social</h3>
                            <dl className="grid grid-cols-1 gap-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">EPS</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.social_security?.eps || 'No especificado'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Fondo de Pensiones</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.social_security?.pension_fund || 'No especificado'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">ARL</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.social_security?.arl || 'No especificado'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Caja de Compensación</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.social_security?.compensation_fund || 'No especificado'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Tipo de Sangre</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.social_security?.blood_type?.name || 'No especificado'}</dd>
                                </div>
                            </dl>
                        </div>

                        {/* Información bancaria y salarial */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Información Bancaria y Salarial</h3>
                            <dl className="grid grid-cols-1 gap-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Salario</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {employee.salary?.salary ? new Intl.NumberFormat('es-CO', {
                                            style: 'currency',
                                            currency: 'COP'
                                        }).format(employee.salary.salary) : 'No especificado'}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Exclusión Salarial</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {employee.salary?.salary_exclusion ? new Intl.NumberFormat('es-CO', {
                                            style: 'currency',
                                            currency: 'COP'
                                        }).format(employee.salary.salary_exclusion) : 'No especificado'}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Banco</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.bank_account?.bank || 'No especificado'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Tipo de Cuenta</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.bank_account?.account_type || 'No especificado'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Número de Cuenta</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.bank_account?.account_number || 'No especificado'}</dd>
                                </div>
                            </dl>
                        </div>

                        {/* Contacto de emergencia */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Contacto de Emergencia</h3>
                            <dl className="grid grid-cols-1 gap-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Nombre del Contacto</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.emergency_contact?.contact_name || 'No especificado'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Parentesco</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.emergency_contact?.relationship || 'No especificado'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Teléfono del Contacto</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.emergency_contact?.contact_phone || 'No especificado'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Dirección del Contacto</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.emergency_contact?.contact_address || 'No especificado'}</dd>
                                </div>
                            </dl>
                        </div>

                        {/* Uniforme */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Uniforme</h3>
                            <dl className="grid grid-cols-1 gap-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Talla de Camisa</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.uniform?.shirt || 'No especificado'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Talla de Camiseta</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.uniform?.t_shirt || 'No especificado'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Talla de Pantalón</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.uniform?.pants || 'No especificado'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Talla de Zapatos</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{employee.uniform?.shoes || 'No especificado'}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 