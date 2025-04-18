import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@material-tailwind/react';

export default function Create({ auth }) {
    const form = useForm({
        code: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('cie10.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Crear CIE10</h2>}
        >
            <Head title="Crear CIE10" />

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
                                        maxLength="10"
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
                                        maxLength="255"
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
                                        Crear CIE10
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