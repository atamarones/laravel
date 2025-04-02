import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Button } from '@material-tailwind/react';

export default function Create({ auth }) {
    const form = useForm({
        name: '',
        code: '',
        mobility_code: '',
        nit: '',
        regime: '',
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('eps.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Crear EPS</h2>}
        >
            <Head title="Crear EPS" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Nombre" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={form.data.name}
                                        onChange={e => form.setData('name', e.target.value)}
                                        maxLength="255"
                                        required
                                    />
                                    <InputError message={form.errors.name} className="mt-2" />
                                </div>

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
                                    <InputLabel htmlFor="mobility_code" value="Código de Movilidad" />
                                    <TextInput
                                        id="mobility_code"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={form.data.mobility_code}
                                        onChange={e => form.setData('mobility_code', e.target.value)}
                                        maxLength="10"
                                    />
                                    <InputError message={form.errors.mobility_code} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="nit" value="NIT" />
                                    <TextInput
                                        id="nit"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={form.data.nit}
                                        onChange={e => form.setData('nit', e.target.value)}
                                        maxLength="20"
                                        required
                                    />
                                    <InputError message={form.errors.nit} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="regime" value="Régimen" />
                                    <select
                                        id="regime"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={form.data.regime}
                                        onChange={e => form.setData('regime', e.target.value)}
                                        required
                                    >
                                        <option value="">Seleccione un régimen</option>
                                        <option value="CONTRIBUTIVO">CONTRIBUTIVO</option>
                                        <option value="SUBSIDIADO">SUBSIDIADO</option>
                                        <option value="AMBOS REGÍMENES">AMBOS REGÍMENES</option>
                                        <option value="No Aplica">No Aplica</option>
                                    </select>
                                    <InputError message={form.errors.regime} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button
                                        type="submit"
                                        disabled={form.processing}
                                        className="bg-primary-600 hover:bg-primary-700"
                                    >
                                        Crear EPS
                                    </Button>

                                    <Link href={route('eps.index')}>
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