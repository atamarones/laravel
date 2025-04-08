import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import { 
    Bars3Icon, 
    XMarkIcon,
    HomeIcon,
    UsersIcon,
    DocumentTextIcon,
    BellIcon,
    ArrowRightOnRectangleIcon,
    UserCircleIcon,
    BuildingOfficeIcon,
    ClipboardDocumentListIcon,
    MapPinIcon,
    BriefcaseIcon,
    ChevronDownIcon,
    DocumentMagnifyingGlassIcon,
    Cog8ToothIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

export default function AuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [openMenus, setOpenMenus] = useState({
        master: true,
        employees: false,
        admin: true,
        absences: false
    });

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = (menuId) => {
        setOpenMenus(prev => ({
            ...prev,
            [menuId]: !prev[menuId]
        }));
    };

    const hasPermission = (permission) => {
        // Si el usuario es super-admin, tiene todos los permisos
        if (user?.roles?.includes('super-admin')) return true;
        
        // Si no se requiere permiso específico
        if (!permission) return true;
        
        // Si no hay usuario o permisos
        if (!user || !user.permissions) return false;
        
        // Verificar el permiso específico
        return user.permissions.includes(permission);
    };

    const navigation = [
        { 
            name: 'Dashboard', 
            href: route('dashboard'), 
            icon: HomeIcon, 
            current: route().current('dashboard'),
        },
        {
            name: 'Empleados',
            icon: UserGroupIcon,
            id: 'employees',
            items: [
                { 
                    name: 'Lista de Empleados', 
                    href: route('employees.index'), 
                    icon: UsersIcon, 
                    current: route().current('employees.*'),
                    permission: 'employees.view'
                },
                { 
                    name: 'Nuevo Empleado', 
                    href: route('employees.create'), 
                    icon: DocumentTextIcon, 
                    current: route().current('employees.create'),
                    permission: 'employees.create'
                },
            ]
        },
        {
            name: 'Administración',
            icon: Cog8ToothIcon,
            id: 'admin',
            items: [
                { 
                    name: 'Usuarios', 
                    href: route('users.index'), 
                    icon: UsersIcon, 
                    current: route().current('users.*'),
                    permission: 'users.view'
                },
                { 
                    name: 'Roles', 
                    href: route('roles.index'), 
                    icon: DocumentTextIcon, 
                    current: route().current('roles.*'),
                    permission: 'roles.view'
                },
            ]
        },
        {
            name: 'Tablas Maestras',
            icon: ClipboardDocumentListIcon,
            id: 'master',
            items: [
                {
                    name: 'Cargos',
                    href: route('positions.index'),
                    icon: BriefcaseIcon,
                    current: route().current('positions.*'),
                    permission: 'positions.view'
                },
                {
                    name: 'CIE-10',
                    href: route('cie10.index'),
                    icon: DocumentMagnifyingGlassIcon,
                    current: route().current('cie10.*'),
                    permission: 'cie10.view'
                },
                {
                    name: 'Ciudades',
                    href: route('cities.index'),
                    icon: MapPinIcon,
                    current: route().current('cities.*'),
                    permission: 'cities.view'
                },
                {
                    name: 'EPS',
                    href: route('eps.index'),
                    icon: BuildingOfficeIcon,
                    current: route().current('eps.*'),
                    permission: 'eps.view'
                },
                {
                    name: 'Estados Civiles',
                    href: route('civil-status.index'),
                    icon: UsersIcon,
                    current: route().current('civil-status.*'),
                    permission: 'civil-status.view'
                },
                {
                    name: 'Géneros',
                    href: route('genders.index'),
                    icon: UsersIcon,
                    current: route().current('genders.*'),
                    permission: 'genders.view'
                },
                {
                    name: 'Tipos de Colaborador',
                    href: route('collaborator-types.index'),
                    icon: UserCircleIcon,
                    current: route().current('collaborator-types.*'),
                    permission: 'collaborator-types.view'
                },
                {
                    name: 'Tipos de Ausencia',
                    href: route('absence-types.index'),
                    icon: UsersIcon,
                    current: route().current('absence-types.*'),
                    permission: 'absence-types.view'
                },
            ]
        },
        {
            name: 'Ausentismo y Accidentalidad',
            icon: BellIcon,
            id: 'absences',
            items: [
                {
                    name: 'Registrar Ausentismo',
                    href: route('absences.create'),
                    icon: DocumentTextIcon,
                    current: route().current('absences.create'),
                    permission: 'absences.create'
                },
                {
                    name: 'Consultar Ausentismos',
                    href: route('absences.index'),
                    icon: DocumentMagnifyingGlassIcon,
                    current: route().current('absences.*'),
                    permission: 'absences.view'
                },
                {
                    name: 'Registrar Accidente',
                    href: route('accidents.create'),
                    icon: DocumentTextIcon,
                    current: route().current('accidents.create'),
                    permission: 'accidents.create'
                },
                {
                    name: 'Consultar Accidentes',
                    href: route('accidents.index'),
                    icon: DocumentMagnifyingGlassIcon,
                    current: route().current('accidents.*'),
                    permission: 'accidents.view'
                }
            ]
        }
    ];

    const renderNavItem = (item) => {
        if (item.items) {
            const hasPermittedItems = item.items.some(subItem => hasPermission(subItem.permission));
            if (!hasPermittedItems) return null;

            return (
                <div key={item.name} className="space-y-1">
                    <button
                        onClick={() => toggleMenu(item.id)}
                        className={`group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium ${
                            openMenus[item.id]
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                        <item.icon className="mr-3 h-6 w-6 flex-shrink-0" />
                        <span className="flex-1 text-left">{item.name}</span>
                        <ChevronDownIcon
                            className={`h-5 w-5 transform transition-transform duration-200 ${
                                openMenus[item.id] ? 'rotate-180' : ''
                            }`}
                        />
                    </button>
                    <div
                        className={`space-y-1 pl-11 overflow-hidden transition-all duration-200 ${
                            openMenus[item.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        {item.items.map((subItem) => 
                            hasPermission(subItem.permission) && (
                                <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                                        subItem.current
                                            ? 'bg-gray-800 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                                >
                                    <subItem.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                                    {subItem.name}
                                </Link>
                            )
                        )}
                    </div>
                </div>
            );
        }

        return hasPermission(item.permission) && (
            <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                    item.current
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
            >
                <item.icon className="mr-3 h-6 w-6 flex-shrink-0" />
                {item.name}
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar - Desktop */}
            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                <div className="flex min-h-0 flex-1 flex-col bg-gray-900">
                    <div className="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
                        <ApplicationLogo className="h-8 w-auto text-white" />
                        <span className="ml-2 text-xl font-semibold text-white">Admin Panel</span>
                    </div>
                    <div className="flex flex-1 flex-col overflow-y-auto">
                        <nav className="flex-1 space-y-1 px-2 py-4">
                            {navigation.map((item) => renderNavItem(item))}
                        </nav>
                        {/* Profile and Logout Section */}
                        <div className="border-t border-gray-700 p-4 space-y-2">
                            <Link
                                href={route('profile.edit')}
                                className="flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                            >
                                <UserCircleIcon className="mr-2 h-5 w-5" />
                                Mi Perfil
                            </Link>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                            >
                                <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5" />
                                Cerrar Sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Bar */}
            <div className="md:pl-64">
                <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow md:hidden">
                    <button
                        type="button"
                        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
                        onClick={() => setShowingNavigationDropdown(true)}
                    >
                        <span className="sr-only">Abrir menú</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                {/* Mobile menu */}
                {isMobile && (
                    <div className={`fixed inset-0 z-40 ${showingNavigationDropdown ? '' : 'hidden'}`}>
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setShowingNavigationDropdown(false)}></div>
                        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-900 pt-5 pb-4">
                            <div className="absolute top-0 right-0 -mr-12 pt-2">
                                <button
                                    type="button"
                                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    onClick={() => setShowingNavigationDropdown(false)}
                                >
                                    <XMarkIcon className="h-6 w-6 text-white" />
                                </button>
                            </div>
                            <div className="flex flex-shrink-0 items-center px-4">
                                <ApplicationLogo className="h-8 w-auto text-white" />
                                <span className="ml-2 text-xl font-semibold text-white">Admin Panel</span>
                            </div>
                            <div className="mt-5 h-0 flex-1 overflow-y-auto">
                                <nav className="space-y-1 px-2">
                                    {navigation.map((item) => {
                                        if (item.items) {
                                            return (
                                                <div key={item.name} className="space-y-1">
                                                    <button
                                                        onClick={() => toggleMenu(item.id)}
                                                        className="group flex w-full items-center rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                                    >
                                                        <item.icon className="mr-4 h-6 w-6 flex-shrink-0" />
                                                        <span className="flex-1 text-left">{item.name}</span>
                                                        <ChevronDownIcon
                                                            className={`h-5 w-5 transform transition-transform ${
                                                                openMenus[item.id] ? 'rotate-180' : ''
                                                            }`}
                                                        />
                                                    </button>
                                                    {openMenus[item.id] && (
                                                        <div className="space-y-1 pl-11">
                                                            {item.items.map((subItem) => (
                                                                hasPermission(subItem.permission) && (
                                                                    <Link
                                                                        key={subItem.name}
                                                                        href={subItem.href}
                                                                        className={`group flex items-center rounded-lg px-3 py-2 text-base font-medium ${
                                                                            subItem.current
                                                                                ? 'bg-gray-800 text-white'
                                                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                                        }`}
                                                                        onClick={() => setShowingNavigationDropdown(false)}
                                                                    >
                                                                        <subItem.icon className="mr-4 h-6 w-6 flex-shrink-0" />
                                                                        {subItem.name}
                                                                    </Link>
                                                                )
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        }

                                        return hasPermission(item.permission) && (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={`group flex items-center rounded-lg px-3 py-2 text-base font-medium ${
                                                    item.current
                                                        ? 'bg-gray-800 text-white'
                                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                }`}
                                                onClick={() => setShowingNavigationDropdown(false)}
                                            >
                                                <item.icon className="mr-4 h-6 w-6 flex-shrink-0" />
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </nav>
                                {/* Mobile Logout Button */}
                                <div className="border-t border-gray-700 p-4 mt-auto">
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                                        onClick={() => setShowingNavigationDropdown(false)}
                                    >
                                        <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5" />
                                        Cerrar Sesión
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <main className="py-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                        {/* Page header */}
                        <div className="md:flex md:items-center md:justify-between mb-6">
                            <div className="min-w-0 flex-1">
                                {header}
                            </div>
                        </div>
                        {/* Page content */}
                        <div className="py-4">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
