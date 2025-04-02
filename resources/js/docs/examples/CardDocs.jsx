import React from 'react';
import Card from '@/Components/Card';

const CardDocs = () => {
    const BasicExample = () => (
        <Card title="Título de la tarjeta" subtitle="Subtítulo opcional">
            <p className="text-gray-600">
                Este es un ejemplo básico de una tarjeta con título y contenido.
                Las tarjetas son útiles para mostrar información relacionada de manera organizada.
            </p>
        </Card>
    );

    const AdvancedExample = () => {
        const actions = (
            <div className="flex space-x-2">
                <button className="text-primary-600 hover:text-primary-700">
                    Editar
                </button>
                <button className="text-red-600 hover:text-red-700">
                    Eliminar
                </button>
            </div>
        );

        const footer = (
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Última actualización: hace 2 días</span>
                <button className="text-primary-600 hover:text-primary-700">
                    Ver más
                </button>
            </div>
        );

        return (
            <Card
                title="Proyecto React"
                subtitle="Frontend Development"
                actions={actions}
                footer={footer}
                variant="raised"
                hoverable
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Desarrollo de una aplicación web moderna usando React y Tailwind CSS.
                        El proyecto incluye un sistema de diseño personalizado y componentes reutilizables.
                    </p>
                    <div className="flex space-x-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            React
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            Tailwind
                        </span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                            TypeScript
                        </span>
                    </div>
                </div>
            </Card>
        );
    };

    const LoadingExample = () => (
        <Card
            title="Cargando datos"
            subtitle="Por favor espere"
            loading
            variant="flat"
        >
            <p className="text-gray-600">
                Este contenido está oculto mientras se muestra el estado de carga.
            </p>
        </Card>
    );

    const componentProps = [
        {
            name: 'title',
            type: 'string',
            required: false,
            description: 'Título de la tarjeta',
        },
        {
            name: 'subtitle',
            type: 'string',
            required: false,
            description: 'Subtítulo de la tarjeta',
        },
        {
            name: 'actions',
            type: 'ReactNode',
            required: false,
            description: 'Acciones a mostrar en la esquina superior derecha',
        },
        {
            name: 'footer',
            type: 'ReactNode',
            required: false,
            description: 'Contenido del pie de la tarjeta',
        },
        {
            name: 'variant',
            type: "'default' | 'flat' | 'raised' | 'outlined'",
            required: false,
            description: 'Variante visual de la tarjeta',
        },
        {
            name: 'loading',
            type: 'boolean',
            required: false,
            description: 'Muestra un estado de carga',
        },
        {
            name: 'hoverable',
            type: 'boolean',
            required: false,
            description: 'Aplica efecto hover a la tarjeta',
        },
        {
            name: 'className',
            type: 'string',
            required: false,
            description: 'Clases CSS adicionales',
        },
    ];

    const examples = [
        {
            title: 'Ejemplo básico',
            description: 'Tarjeta simple con título y contenido',
            code: `<Card title="Título de la tarjeta" subtitle="Subtítulo opcional">
    <p className="text-gray-600">
        Este es un ejemplo básico de una tarjeta con título y contenido.
        Las tarjetas son útiles para mostrar información relacionada de manera organizada.
    </p>
</Card>`,
            component: BasicExample,
        },
        {
            title: 'Ejemplo avanzado',
            description: 'Tarjeta con acciones, pie de página y efectos visuales',
            code: `const actions = (
    <div className="flex space-x-2">
        <button className="text-primary-600 hover:text-primary-700">
            Editar
        </button>
        <button className="text-red-600 hover:text-red-700">
            Eliminar
        </button>
    </div>
);

const footer = (
    <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
            Última actualización: hace 2 días
        </span>
        <button className="text-primary-600 hover:text-primary-700">
            Ver más
        </button>
    </div>
);

<Card
    title="Proyecto React"
    subtitle="Frontend Development"
    actions={actions}
    footer={footer}
    variant="raised"
    hoverable
>
    <div className="space-y-4">
        <p className="text-gray-600">
            Desarrollo de una aplicación web moderna usando React y Tailwind CSS.
            El proyecto incluye un sistema de diseño personalizado y componentes reutilizables.
        </p>
        <div className="flex space-x-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                React
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Tailwind
            </span>
            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                TypeScript
            </span>
        </div>
    </div>
</Card>`,
            component: AdvancedExample,
        },
        {
            title: 'Estado de carga',
            description: 'Tarjeta mostrando un estado de carga',
            code: `<Card
    title="Cargando datos"
    subtitle="Por favor espere"
    loading
    variant="flat"
>
    <p className="text-gray-600">
        Este contenido está oculto mientras se muestra el estado de carga.
    </p>
</Card>`,
            component: LoadingExample,
        },
    ];

    const notes = [
        'Diseño moderno y limpio con Tailwind CSS',
        'Múltiples variantes visuales: default, flat, raised, outlined',
        'Soporte para acciones personalizadas en la cabecera',
        'Pie de página opcional para información adicional',
        'Estado de carga integrado con animación',
        'Efecto hover opcional para interactividad',
        'Totalmente personalizable a través de props y clases CSS',
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Card</h2>
                <p className="mt-2 text-gray-600">
                    Componente de tarjeta versátil para mostrar contenido relacionado
                </p>
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-900">Propiedades</h3>
                <div className="mt-4 border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Nombre
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Tipo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Requerido
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Descripción
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {componentProps.map((prop) => (
                                <tr key={prop.name}>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {prop.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {prop.type}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {prop.required ? 'Sí' : 'No'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {prop.description}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-900">Ejemplos</h3>
                <div className="mt-4 space-y-8">
                    {examples.map((example, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden">
                            <div className="p-6 bg-white">
                                <h4 className="text-lg font-medium text-gray-900">
                                    {example.title}
                                </h4>
                                <p className="mt-1 text-sm text-gray-500">
                                    {example.description}
                                </p>
                                <div className="mt-4">
                                    <example.component />
                                </div>
                            </div>
                            <div className="bg-gray-50 p-6">
                                <pre className="text-sm text-gray-800 overflow-auto">
                                    {example.code}
                                </pre>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-900">Notas de implementación</h3>
                <ul className="mt-4 list-disc list-inside space-y-2 text-gray-600">
                    {notes.map((note, index) => (
                        <li key={index}>{note}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CardDocs; 