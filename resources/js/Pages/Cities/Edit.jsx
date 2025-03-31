import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@material-tailwind/react';

export default function Edit({ auth, city }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: city.name,
        department: city.department,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('cities.update', city.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Ciudad</h2>}
        >
            <Head title="Editar Ciudad" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                </div>

                                <div>
                                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                        Departamento
                                    </label>
                                    <input
                                        type="text"
                                        id="department"
                                        value={data.department}
                                        onChange={e => setData('department', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {errors.department && <div className="text-red-500 text-xs mt-1">{errors.department}</div>}
                                </div>

                                <div className="flex justify-end gap-4">
                                    <Button
                                        href={route('cities.index')}
                                        variant="outlined"
                                        color="red"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="filled"
                                        color="blue"
                                        disabled={processing}
                                    >
                                        Actualizar
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 