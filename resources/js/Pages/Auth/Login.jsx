import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Login({ status, canResetPassword }) {
    const { t, language, changeLanguage } = useTranslation();
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

                <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
                    <div className="relative mb-8 flex items-center gap-6">
                        <Link href="/" className="text-2xl font-bold text-white">
                            <svg className="h-12 w-auto" viewBox="0 0 24 24" fill="none">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V7L18 12L13 17V14H9V10H13Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </Link>
                        {/* Selector de idioma */}
                        <div className="relative">
                            <select
                                value={language}
                                onChange={(e) => changeLanguage(e.target.value)}
                                className="appearance-none rounded-lg bg-gray-800 pl-4 pr-10 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="es">Español</option>
                                <option value="en">English</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </div>
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

                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700/50 px-3 py-2 text-white shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />

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
