import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@material-tailwind/react';

export default function Edit({ auth, cie10 }) {
    const form = useForm({
        code: cie10.code,
        description: cie10.description,
    });

    const submit = (e) => {
        e.preventDefault();
        form.put(route('cie10.update', cie10.code));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar CIE10</h2>}
        >
            <Head title="Editar CIE10" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="code" value="Código" />
                                    <TextInput
                                        id="code"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={form.data.code}
                                        onChange={e => form.setData('code', e.target.value)}
                                        required
                                    />
                                    <InputError message={form.errors.code} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="Descripción" />
                                    <TextInput
                                        id="description"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={form.data.description}
                                        onChange={e => form.setData('description', e.target.value)}
                                        required
                                    />
                                    <InputError message={form.errors.description} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button
                                        type="submit"
                                        disabled={form.processing}
                                        className="bg-primary-600 hover:bg-primary-700"
                                    >
                                        Actualizar CIE10
                                    </Button>

                                    <Link href={route('cie10.index')}>
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