<template>
    <Head title="Editar EPS" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Editar EPS</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">
                        <form @submit.prevent="submit" class="space-y-6">
                            <div>
                                <InputLabel for="entidad" value="Entidad" />
                                <TextInput
                                    id="entidad"
                                    type="text"
                                    class="mt-1 block w-full"
                                    v-model="form.entidad"
                                    required
                                />
                                <InputError :message="form.errors.entidad" class="mt-2" />
                            </div>

                            <div>
                                <InputLabel for="codigo" value="Código" />
                                <TextInput
                                    id="codigo"
                                    type="text"
                                    class="mt-1 block w-full"
                                    v-model="form.codigo"
                                    required
                                />
                                <InputError :message="form.errors.codigo" class="mt-2" />
                            </div>

                            <div>
                                <InputLabel for="codigo_movilidad" value="Código Movilidad" />
                                <TextInput
                                    id="codigo_movilidad"
                                    type="text"
                                    class="mt-1 block w-full"
                                    v-model="form.codigo_movilidad"
                                />
                                <InputError :message="form.errors.codigo_movilidad" class="mt-2" />
                            </div>

                            <div>
                                <InputLabel for="nit" value="NIT" />
                                <TextInput
                                    id="nit"
                                    type="text"
                                    class="mt-1 block w-full"
                                    v-model="form.nit"
                                    required
                                />
                                <InputError :message="form.errors.nit" class="mt-2" />
                            </div>

                            <div>
                                <InputLabel for="regimen" value="Régimen" />
                                <select
                                    id="regimen"
                                    class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    v-model="form.regimen"
                                    required
                                >
                                    <option value="">Seleccione un régimen</option>
                                    <option value="CONTRIBUTIVO">CONTRIBUTIVO</option>
                                    <option value="SUBSIDIADO">SUBSIDIADO</option>
                                    <option value="AMBOS REGÍMENES">AMBOS REGÍMENES</option>
                                    <option value="No Aplica">No Aplica</option>
                                </select>
                                <InputError :message="form.errors.regimen" class="mt-2" />
                            </div>

                            <div class="flex items-center justify-end mt-4">
                                <Link
                                    :href="route('eps.index')"
                                    class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Cancelar
                                </Link>
                                <PrimaryButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                                    Actualizar EPS
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const props = defineProps({
    eps: Object
});

const form = useForm({
    entidad: props.eps.entidad,
    codigo: props.eps.codigo,
    codigo_movilidad: props.eps.codigo_movilidad,
    nit: props.eps.nit,
    regimen: props.eps.regimen,
});

const submit = () => {
    form.put(route('eps.update', props.eps.id));
};
</script> 