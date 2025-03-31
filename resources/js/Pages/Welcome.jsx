import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Welcome({ auth, canResetPassword }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t, language, changeLanguage } = useTranslation();
    
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900">
                {/* Efectos de fondo */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                
                {/* Efecto de resplandor */}
                <div className="absolute inset-0">
                    <div className="absolute -left-4 top-0 h-72 w-72 rounded-full bg-primary-600 opacity-20 blur-[100px]"></div>
                    <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary-400 opacity-10 blur-[100px]"></div>
                    <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-primary-500 opacity-20 blur-[100px]"></div>
                </div>

                <div className="relative z-10 flex min-h-screen">
                    {/* Sección de Contenido */}
                    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                        <div className="max-w-2xl">
                            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                                {t('welcome.title')}
                                <span className="mt-2 block bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                                    {t('welcome.subtitle')}
                                </span>
                            </h1>
                            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300 md:text-xl">
                                {t('welcome.description')}
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="mt-16 grid w-full max-w-4xl gap-8 md:grid-cols-3">
                            {/* Feature 1 */}
                            <div className="group rounded-2xl bg-gray-800/30 p-6 backdrop-blur-sm transition-all hover:bg-gray-800/40">
                                <div className="mb-4 inline-block rounded-lg bg-primary-600/10 p-3">
                                    <svg className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-white">{t('welcome.features.automation.title')}</h3>
                                <p className="text-gray-400">{t('welcome.features.automation.description')}</p>
                            </div>

                            {/* Feature 2 */}
                            <div className="group rounded-2xl bg-gray-800/30 p-6 backdrop-blur-sm transition-all hover:bg-gray-800/40">
                                <div className="mb-4 inline-block rounded-lg bg-primary-600/10 p-3">
                                    <svg className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-white">{t('welcome.features.analytics.title')}</h3>
                                <p className="text-gray-400">{t('welcome.features.analytics.description')}</p>
                                    </div>

                            {/* Feature 3 */}
                            <div className="group rounded-2xl bg-gray-800/30 p-6 backdrop-blur-sm transition-all hover:bg-gray-800/40">
                                <div className="mb-4 inline-block rounded-lg bg-primary-600/10 p-3">
                                    <svg className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                <h3 className="mb-2 text-xl font-semibold text-white">{t('welcome.features.security.title')}</h3>
                                <p className="text-gray-400">{t('welcome.features.security.description')}</p>
                            </div>
                                            </div>
                                        </div>

                    {/* Sección de Login */}
                    <div className="flex w-full max-w-md flex-col justify-center bg-black/90 px-8 backdrop-blur-md border-l border-gray-800/50">
                        <div className="mb-8">
                            {/* Logo y selector de idioma */}
                            <div className="mb-8 flex items-center justify-between">
                                <img
                                    src="/images/logo/logo.png"
                                    alt="Logo Empresa"
                                    className="h-12 w-auto object-contain"
                                />

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

                            {/* Formulario de login */}
                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300" htmlFor="email">
                                        {t('auth.email')}
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-800/50 px-3 py-2 text-white shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && <div className="mt-2 text-sm text-red-500">{errors.email}</div>}
                                    </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300" htmlFor="password">
                                        {t('auth.password')}
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-800/50 px-3 py-2 text-white shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    {errors.password && <div className="mt-2 text-sm text-red-500">{errors.password}</div>}
                                    </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="rounded border-gray-600 bg-gray-800/50 text-primary-600 shadow-sm focus:ring-primary-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-300">{t('auth.remember_me')}</span>
                                    </label>
                                    </div>

                                <div className="flex flex-col space-y-3">
                                    <button
                                        type="submit"
                                        className="w-full rounded-lg bg-primary-600 px-4 py-2 text-center text-sm font-medium text-white transition-all hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-25"
                                        disabled={processing}
                                    >
                                        {t('auth.login')}
                                    </button>

                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-center text-sm text-gray-400 hover:text-gray-300"
                                        >
                                            {t('auth.forgot_password')}
                                        </Link>
                                    )}
                                </div>
                            </form>
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
}
