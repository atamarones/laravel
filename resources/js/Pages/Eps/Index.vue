<template>
    <Head title="EPS" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Gestión de EPS</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-lg font-semibold">Lista de EPS</h3>
                            <Link :href="route('eps.create')" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Nueva EPS
                            </Link>
                        </div>

                        <div class="overflow-x-auto">
                            <table class="min-w-full bg-white">
                                <thead class="bg-gray-100">
                                    <tr>
                                        <th class="py-2 px-4 border-b">Entidad</th>
                                        <th class="py-2 px-4 border-b">Código</th>
                                        <th class="py-2 px-4 border-b">Código Movilidad</th>
                                        <th class="py-2 px-4 border-b">NIT</th>
                                        <th class="py-2 px-4 border-b">Régimen</th>
                                        <th class="py-2 px-4 border-b">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="eps in eps" :key="eps.id" class="hover:bg-gray-50">
                                        <td class="py-2 px-4 border-b">{{ eps.entidad }}</td>
                                        <td class="py-2 px-4 border-b">{{ eps.codigo }}</td>
                                        <td class="py-2 px-4 border-b">{{ eps.codigo_movilidad }}</td>
                                        <td class="py-2 px-4 border-b">{{ eps.nit }}</td>
                                        <td class="py-2 px-4 border-b">{{ eps.regimen }}</td>
                                        <td class="py-2 px-4 border-b">
                                            <div class="flex space-x-2">
                                                <Link :href="route('eps.edit', eps.id)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                                                    Editar
                                                </Link>
                                                <button @click="destroy(eps.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { router } from '@inertiajs/vue3';

const props = defineProps({
    eps: Array
});

const destroy = (id) => {
    if (confirm('¿Está seguro de que desea eliminar esta EPS?')) {
        router.delete(route('eps.destroy', id));
    }
};
</script> 