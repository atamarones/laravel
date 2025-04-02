import React from 'react';
import ComponentDocs from '../ComponentDocs';
import VirtualTable from '@/Components/VirtualTable';

// Ejemplo básico
const BasicExample = () => {
    const data = Array.from({ length: 1000 }, (_, index) => ({
        id: index + 1,
        name: `Usuario ${index + 1}`,
        email: `usuario${index + 1}@ejemplo.com`,
        role: index % 3 === 0 ? 'Admin' : 'Usuario',
    }));

    const columns = [
        { key: 'id', header: 'ID', width: 80 },
        { key: 'name', header: 'Nombre', flex: 1 },
        { key: 'email', header: 'Email', flex: 1 },
        { key: 'role', header: 'Rol', width: 120 },
    ];

    return (
        <div className="h-96">
            <VirtualTable
                data={data}
                columns={columns}
                rowHeight={48}
            />
        </div>
    );
};

// Ejemplo con selección y ordenamiento
const AdvancedExample = () => {
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [sortBy, setSortBy] = React.useState('name');
    const [sortDirection, setSortDirection] = React.useState('asc');

    const data = Array.from({ length: 1000 }, (_, index) => ({
        id: index + 1,
        name: `Usuario ${index + 1}`,
        email: `usuario${index + 1}@ejemplo.com`,
        role: index % 3 === 0 ? 'Admin' : 'Usuario',
    }));

    const handleSort = (key) => {
        if (sortBy === key) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(key);
            setSortDirection('asc');
        }
    };

    const columns = [
        { key: 'id', header: 'ID', width: 80, sortable: true },
        { key: 'name', header: 'Nombre', flex: 1, sortable: true },
        { key: 'email', header: 'Email', flex: 1, sortable: true },
        { key: 'role', header: 'Rol', width: 120, sortable: true },
    ];

    return (
        <div className="h-96">
            <VirtualTable
                data={data}
                columns={columns}
                rowHeight={48}
                selectable
                selectedRows={selectedRows}
                onSelectRow={(row) => {
                    setSelectedRows(prev =>
                        prev.includes(row.id)
                            ? prev.filter(id => id !== row.id)
                            : [...prev, row.id]
                    );
                }}
                onSelectAll={() => {
                    setSelectedRows(prev =>
                        prev.length === data.length
                            ? []
                            : data.map(row => row.id)
                    );
                }}
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSort={handleSort}
            />
        </div>
    );
};

const VirtualTableDocs = () => {
    const componentProps = [
        {
            name: 'data',
            type: 'Array',
            required: true,
            description: 'Array de objetos que contiene los datos a mostrar en la tabla.',
        },
        {
            name: 'columns',
            type: 'Array',
            required: true,
            description: 'Configuración de las columnas de la tabla.',
        },
        {
            name: 'rowHeight',
            type: 'number',
            default: '48',
            description: 'Altura en píxeles de cada fila.',
        },
        {
            name: 'headerHeight',
            type: 'number',
            default: '56',
            description: 'Altura en píxeles del encabezado.',
        },
        {
            name: 'selectable',
            type: 'boolean',
            default: 'false',
            description: 'Habilita la selección de filas.',
        },
        {
            name: 'selectedRows',
            type: 'Array',
            description: 'Array de IDs de las filas seleccionadas.',
        },
        {
            name: 'onSelectRow',
            type: 'function',
            description: 'Función llamada cuando se selecciona una fila.',
        },
        {
            name: 'onSelectAll',
            type: 'function',
            description: 'Función llamada cuando se seleccionan todas las filas.',
        },
        {
            name: 'sortBy',
            type: 'string',
            description: 'Clave de la columna por la que se está ordenando.',
        },
        {
            name: 'sortDirection',
            type: 'string',
            description: "Dirección del ordenamiento ('asc' o 'desc').",
        },
        {
            name: 'onSort',
            type: 'function',
            description: 'Función llamada cuando se cambia el ordenamiento.',
        },
    ];

    const examples = [
        {
            title: 'Básico',
            component: BasicExample,
            code: `
const BasicExample = () => {
    const data = Array.from({ length: 1000 }, (_, index) => ({
        id: index + 1,
        name: \`Usuario \${index + 1}\`,
        email: \`usuario\${index + 1}@ejemplo.com\`,
        role: index % 3 === 0 ? 'Admin' : 'Usuario',
    }));

    const columns = [
        { key: 'id', header: 'ID', width: 80 },
        { key: 'name', header: 'Nombre', flex: 1 },
        { key: 'email', header: 'Email', flex: 1 },
        { key: 'role', header: 'Rol', width: 120 },
    ];

    return (
        <div className="h-96">
            <VirtualTable
                data={data}
                columns={columns}
                rowHeight={48}
            />
        </div>
    );
};`,
        },
        {
            title: 'Avanzado',
            component: AdvancedExample,
            code: `
const AdvancedExample = () => {
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [sortBy, setSortBy] = React.useState('name');
    const [sortDirection, setSortDirection] = React.useState('asc');

    // ... resto del código ...

    return (
        <div className="h-96">
            <VirtualTable
                data={data}
                columns={columns}
                rowHeight={48}
                selectable
                selectedRows={selectedRows}
                onSelectRow={(row) => {
                    setSelectedRows(prev =>
                        prev.includes(row.id)
                            ? prev.filter(id => id !== row.id)
                            : [...prev, row.id]
                    );
                }}
                onSelectAll={() => {
                    setSelectedRows(prev =>
                        prev.length === data.length
                            ? []
                            : data.map(row => row.id)
                    );
                }}
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSort={handleSort}
            />
        </div>
    );
};`,
        },
    ];

    const notes = [
        'La tabla utiliza virtualización para renderizar solo las filas visibles, lo que mejora significativamente el rendimiento con grandes conjuntos de datos.',
        'Las columnas pueden ser fijas (width) o flexibles (flex) para adaptarse al espacio disponible.',
        'El componente soporta selección múltiple de filas y ordenamiento por columnas.',
        'Se incluye soporte para temas y estilos personalizados a través de clases de Tailwind.',
        'El componente es completamente accesible y soporta navegación por teclado.',
    ];

    return (
        <ComponentDocs
            title="VirtualTable"
            description="Tabla virtualizada de alto rendimiento para manejar grandes conjuntos de datos de manera eficiente."
            component={BasicExample}
            code={examples[0].code}
            props={componentProps}
            examples={examples}
            notes={notes}
        />
    );
};

export default VirtualTableDocs; 