import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@material-tailwind/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';

export default function Edit({ auth, collaboratorType }) {
    const { data, setData, put, processing, errors } = useForm({
        name: collaboratorType.name,
        description: collaboratorType.description,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('collaborator-types.update', collaboratorType.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Tipo de Colaborador</h2>}
        >
            <Head title="Editar Tipo de Colaborador" />

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
                                    <InputLabel htmlFor="description" value="Descripción" />
                                    <TextArea
                                        id="description"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="mt-1 block w-full"
                                        rows="4"
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-primary-600 hover:bg-primary-700"
                                    >
                                        Actualizar Tipo de Colaborador
                                    </Button>

                                    <Link href={route('collaborator-types.index')}>
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