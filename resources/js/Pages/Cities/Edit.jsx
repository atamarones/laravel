import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@material-tailwind/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Link } from '@inertiajs/react';

export default function Edit({ auth, city }) {
    const { data, setData, put, processing, errors } = useForm({
        name: city.name,
        department: city.department,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('cities.update', city.id));
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
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Nombre" />
                                    <TextInput
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        type="text"
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="department" value="Departamento" />
                                    <TextInput
                                        id="department"
                                        value={data.department}
                                        onChange={e => setData('department', e.target.value)}
                                        type="text"
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.department} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-primary-600 hover:bg-primary-700"
                                    >
                                        Actualizar Ciudad
                                    </Button>

                                    <Link href={route('cities.index')}>
                                        <Button
                                            type="button"
                                            variant="outlined"
                                            color="gray"
                                            className="border-gray-300 text-gray-700 hover:border-gray-400"
                                        >
                                            Cancelar
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 