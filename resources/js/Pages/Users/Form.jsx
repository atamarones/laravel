import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

export default function UserForm({ user = null, roles = [], className = '' }) {
    const { data, setData, post, put, processing, errors, recentlySuccessful } = useForm({
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '',
        password_confirmation: '',
        roles: user?.roles?.map(r => r.id) ?? [],
    });

    const submit = (e) => {
        e.preventDefault();

        if (user) {
            put(route('users.update', user.id));
        } else {
            post(route('users.store'));
        }
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />
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
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="password" value={user ? "Nueva Contraseña (opcional)" : "Contraseña"} />
                    <TextInput
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required={!user}
                        autoComplete="new-password"
                    />
                    <InputError className="mt-2" message={errors.password} />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        className="mt-1 block w-full"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required={!user || data.password !== ''}
                        autoComplete="new-password"
                    />
                    <InputError className="mt-2" message={errors.password_confirmation} />
                </div>

                <div>
                    <InputLabel value="Roles" />
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                        {roles.map((role) => (
                            <label key={role.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={role.id}
                                    checked={data.roles.includes(role.id)}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        setData('roles', isChecked
                                            ? [...data.roles, role.id]
                                            : data.roles.filter(id => id !== role.id)
                                        );
                                    }}
                                    className="rounded border-gray-300 text-primary-600 shadow-sm focus:ring-primary-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">{role.name}</span>
                            </label>
                        ))}
                    </div>
                    <InputError className="mt-2" message={errors.roles} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        {user ? 'Actualizar' : 'Crear'} Usuario
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