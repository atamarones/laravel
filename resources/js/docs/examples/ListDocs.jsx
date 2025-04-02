import React, { useState } from 'react';
import List from '@/Components/List';

const ListDocs = () => {
    const BasicExample = () => {
        const items = [
            { id: 1, title: 'Elemento 1', description: 'Descripción del elemento 1' },
            { id: 2, title: 'Elemento 2', description: 'Descripción del elemento 2' },
            { id: 3, title: 'Elemento 3', description: 'Descripción del elemento 3' },
        ];

        const renderItem = (item) => (
            <div className="py-2">
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-gray-500">{item.description}</div>
            </div>
        );

        return (
            <List
                items={items}
                renderItem={renderItem}
                emptyMessage="No hay elementos para mostrar"
            />
        );
    };

    const SelectableExample = () => {
        const [selectedItem, setSelectedItem] = useState(null);

        const items = [
            { id: 1, title: 'Proyecto A', status: 'Activo', progress: 75 },
            { id: 2, title: 'Proyecto B', status: 'Pendiente', progress: 30 },
            { id: 3, title: 'Proyecto C', status: 'Completado', progress: 100 },
            { id: 4, title: 'Proyecto D', status: 'Cancelado', progress: 0 },
        ];

        const renderItem = (item) => (
            <div className="flex justify-between items-center py-3">
                <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.status}</div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${item.progress}%` }}
                        />
                    </div>
                    <span className="text-sm text-gray-600">{item.progress}%</span>
                </div>
            </div>
        );

        return (
            <List
                items={items}
                renderItem={renderItem}
                selectable
                selectedItem={selectedItem}
                onItemClick={setSelectedItem}
                divided
                hoverable
            />
        );
    };

    const LoadingExample = () => {
        const items = [
            { id: 1, title: 'Cargando...', description: 'Por favor espere' },
            { id: 2, title: 'Cargando...', description: 'Por favor espere' },
            { id: 3, title: 'Cargando...', description: 'Por favor espere' },
        ];

        return (
            <List
                items={items}
                loading
                renderItem={(item) => (
                    <div className="py-2">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                )}
            />
        );
    };

    const componentProps = [
        {
            name: 'items',
            type: 'array',
            required: true,
            description: 'Array de elementos a mostrar en la lista',
        },
        {
            name: 'renderItem',
            type: '(item: any) => ReactNode',
            required: true,
            description: 'Función para renderizar cada elemento',
        },
        {
            name: 'selectable',
            type: 'boolean',
            required: false,
            description: 'Habilita la selección de elementos',
        },
        {
            name: 'selectedItem',
            type: 'any',
            required: false,
            description: 'Elemento actualmente seleccionado',
        },
        {
            name: 'onItemClick',
            type: '(item: any) => void',
            required: false,
            description: 'Función llamada al hacer clic en un elemento',
        },
        {
            name: 'divided',
            type: 'boolean',
            required: false,
            description: 'Agrega divisores entre elementos',
        },
        {
            name: 'hoverable',
            type: 'boolean',
            required: false,
            description: 'Agrega efecto hover a los elementos',
        },
        {
            name: 'loading',
            type: 'boolean',
            required: false,
            description: 'Muestra un estado de carga',
        },
        {
            name: 'emptyMessage',
            type: 'string',
            required: false,
            description: 'Mensaje a mostrar cuando no hay elementos',
        },
    ];

    const examples = [
        {
            title: 'Ejemplo básico',
            description: 'Lista simple con elementos personalizados',
            code: `const items = [
    { id: 1, title: 'Elemento 1', description: 'Descripción del elemento 1' },
    { id: 2, title: 'Elemento 2', description: 'Descripción del elemento 2' },
    { id: 3, title: 'Elemento 3', description: 'Descripción del elemento 3' },
];

const renderItem = (item) => (
    <div className="py-2">
        <div className="font-medium">{item.title}</div>
        <div className="text-sm text-gray-500">{item.description}</div>
    </div>
);

<List
    items={items}
    renderItem={renderItem}
    emptyMessage="No hay elementos para mostrar"
/>`,
            component: BasicExample,
        },
        {
            title: 'Lista seleccionable',
            description: 'Lista con elementos seleccionables y barra de progreso',
            code: `const [selectedItem, setSelectedItem] = useState(null);

const items = [
    { id: 1, title: 'Proyecto A', status: 'Activo', progress: 75 },
    { id: 2, title: 'Proyecto B', status: 'Pendiente', progress: 30 },
    { id: 3, title: 'Proyecto C', status: 'Completado', progress: 100 },
    { id: 4, title: 'Proyecto D', status: 'Cancelado', progress: 0 },
];

const renderItem = (item) => (
    <div className="flex justify-between items-center py-3">
        <div>
            <div className="font-medium">{item.title}</div>
            <div className="text-sm text-gray-500">{item.status}</div>
        </div>
        <div className="flex items-center space-x-4">
            <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: \`\${item.progress}%\` }}
                />
            </div>
            <span className="text-sm text-gray-600">{item.progress}%</span>
        </div>
    </div>
);

<List
    items={items}
    renderItem={renderItem}
    selectable
    selectedItem={selectedItem}
    onItemClick={setSelectedItem}
    divided
    hoverable
/>`,
            component: SelectableExample,
        },
        {
            title: 'Estado de carga',
            description: 'Lista mostrando un estado de carga',
            code: `const items = [
    { id: 1, title: 'Cargando...', description: 'Por favor espere' },
    { id: 2, title: 'Cargando...', description: 'Por favor espere' },
    { id: 3, title: 'Cargando...', description: 'Por favor espere' },
];

<List
    items={items}
    loading
    renderItem={(item) => (
        <div className="py-2">
            <div className="font-medium">{item.title}</div>
            <div className="text-sm text-gray-500">{item.description}</div>
        </div>
    )}
/>`,
            component: LoadingExample,
        },
    ];

    const notes = [
        'Renderizado personalizado de elementos a través de renderItem',
        'Soporte para selección de elementos con estado controlado',
        'Divisores opcionales entre elementos',
        'Efecto hover opcional para mejor interactividad',
        'Estado de carga integrado con animación',
        'Mensaje personalizable cuando la lista está vacía',
        'Totalmente personalizable a través de props y clases CSS',
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">List</h2>
                <p className="mt-2 text-gray-600">
                    Componente de lista versátil con soporte para selección y estados de carga
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

export default ListDocs; 