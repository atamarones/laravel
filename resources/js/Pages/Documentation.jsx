import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import VirtualTableDocs from '@/docs/examples/VirtualTableDocs';
import FormDocs from '@/docs/examples/FormDocs';
import CardDocs from '@/docs/examples/CardDocs';
import ListDocs from '@/docs/examples/ListDocs';

const Documentation = () => {
    const [activeComponent, setActiveComponent] = useState('virtual-table');

    const components = [
        {
            id: 'virtual-table',
            name: 'VirtualTable',
            description: 'Tabla virtualizada de alto rendimiento',
            component: VirtualTableDocs,
        },
        {
            id: 'form',
            name: 'Form',
            description: 'Formulario con validación integrada',
            component: FormDocs,
        },
        {
            id: 'card',
            name: 'Card',
            description: 'Tarjeta versátil para mostrar contenido',
            component: CardDocs,
        },
        {
            id: 'list',
            name: 'List',
            description: 'Lista versátil con selección y estados',
            component: ListDocs,
        },
        // Aquí se agregarán más componentes documentados
    ];

    const renderSidebar = () => (
        <div className="w-64 flex-shrink-0 border-r border-gray-200">
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Componentes</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Documentación de componentes optimizados
                </p>
            </div>
            <nav className="flex-1 space-y-1">
                {components.map((component) => (
                    <button
                        key={component.id}
                        className={`
                            w-full flex items-center px-6 py-3 text-sm font-medium
                            ${activeComponent === component.id
                                ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-500'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }
                        `}
                        onClick={() => setActiveComponent(component.id)}
                    >
                        {component.name}
                    </button>
                ))}
            </nav>
        </div>
    );

    const renderContent = () => {
        const component = components.find(c => c.id === activeComponent);
        if (!component) return null;

        const Component = component.component;
        return <Component />;
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Documentación
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Sistema de componentes optimizados
                            </p>
                        </div>
                        <Link
                            href="/"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                        >
                            Volver a la aplicación
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8">
                    <div className="bg-white rounded-lg shadow flex">
                        {renderSidebar()}
                        <div className="flex-1 p-8 overflow-auto">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">
                        Sistema de documentación de componentes optimizados.
                        Versión 1.0.0
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Documentation; 