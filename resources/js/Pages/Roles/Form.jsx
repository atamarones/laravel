import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

export default function RoleForm({ role = null, permissions = [], className = '' }) {
    const { data, setData, post, put, processing, errors, recentlySuccessful } = useForm({
        name: role?.name ?? '',
        permissions: role?.permissions?.map(p => p.id) ?? [],
    });

    const submit = (e) => {
        e.preventDefault();

        if (role) {
            put(route('roles.update', role.id));
        } else {
            post(route('roles.store'));
        }
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nombre del Rol" />
                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel value="Permisos" />
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                        {permissions.map((permission) => (
                            <label key={permission.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={permission.id}
                                    checked={data.permissions.includes(permission.id)}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        setData('permissions', isChecked
                                            ? [...data.permissions, permission.id]
                                            : data.permissions.filter(id => id !== permission.id)
                                        );
                                    }}
                                    className="rounded border-gray-300 text-primary-600 shadow-sm focus:ring-primary-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">{permission.name}</span>
                            </label>
                        ))}
                    </div>
                    <InputError className="mt-2" message={errors.permissions} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        {role ? 'Actualizar' : 'Crear'} Rol
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Guardado.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
} 