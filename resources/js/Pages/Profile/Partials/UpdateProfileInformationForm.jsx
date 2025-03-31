import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
    isSuperAdmin = false,
}) {
    const user = usePage().props.auth.user;
    console.log('UpdateProfileInformation - isSuperAdmin:', isSuperAdmin);
    console.log('UpdateProfileInformation - user:', user);

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        if (isSuperAdmin) {
            patch(route('profile.update'));
        }
    };

    // Renderizar diferente basado en isSuperAdmin
    const renderField = (id, value, type = 'text') => {
        if (isSuperAdmin) {
            return (
                <TextInput
                    id={id}
                    type={type}
                    className="mt-1 block w-full"
                    value={value}
                    onChange={(e) => setData(id, e.target.value)}
                    required
                    autoComplete={id}
                    isFocused={id === 'name'}
                />
            );
        }
        return (
            <div className="mt-1 block w-full p-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600">
                {value}
            </div>
        );
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Información del Perfil
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    {isSuperAdmin 
                        ? "Actualiza la información de tu perfil y tu dirección de correo electrónico."
                        : "Información de tu perfil y dirección de correo electrónico."}
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />
                    {renderField('name', data.name)}
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Correo Electrónico" />
                    {renderField('email', data.email, 'email')}
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Tu dirección de correo electrónico no está verificada.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-2 rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            >
                                Haz clic aquí para reenviar el correo de verificación.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                Se ha enviado un nuevo enlace de verificación a tu dirección de correo electrónico.
                            </div>
                        )}
                    </div>
                )}

                {isSuperAdmin && (
                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Guardar</PrimaryButton>

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
                )}
            </form>
        </section>
    );
}
