import { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Login({ status, canResetPassword }) {
    const { t, language, changeLanguage } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Log in" />
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900">
                {/* Efecto de partículas/grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                
                {/* Círculo de luz */}
                <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary-500/20 blur-[120px]"></div>

                <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        <div>
                            <img
                                className="mx-auto h-12 w-auto"
                                src="/images/logo/logo.png"
                                alt="Logo Empresa"
                            />
                        </div>
                    </div>

                    <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-gray-800/50 px-6 py-4 backdrop-blur-sm sm:rounded-lg">
                        <form onSubmit={submit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-300" htmlFor="email">
                                    {t('auth.email')}
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700/50 px-3 py-2 text-white shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                {errors.email && <div className="mt-2 text-sm text-red-500">{errors.email}</div>}
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-300" htmlFor="password">
                                    {t('auth.password')}
                                </label>

                                <div className="relative mt-1">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={data.password}
                                        className="block w-full rounded-lg border border-gray-600 bg-gray-700/50 px-3 py-2 pr-10 text-white shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                    >
                                        👁️
                                    </button>
                                </div>

                                {errors.password && <div className="mt-2 text-sm text-red-500">{errors.password}</div>}
                            </div>

                            <div className="mt-4 block">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded border-gray-600 bg-gray-700/50 text-primary-600 shadow-sm focus:ring-primary-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-300">{t('auth.remember_me')}</span>
                                </label>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-gray-400 hover:text-gray-300"
                                    >
                                        {t('auth.forgot_password')}
                                    </Link>
                                )}

                                <button
                                    type="submit"
                                    className="inline-flex items-center rounded-full bg-primary-600 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-25"
                                    disabled={processing}
                                >
                                    {t('auth.login')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
