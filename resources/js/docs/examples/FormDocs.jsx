import React from 'react';
import Form from '@/Components/Form';
import { z } from 'zod';

const FormDocs = () => {
    const BasicExample = () => {
        const schema = z.object({
            name: z.string().min(1, 'El nombre es requerido'),
            email: z.string().email('Email inválido'),
            message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
        });

        const handleSubmit = (values) => {
            console.log('Valores enviados:', values);
        };

        return (
            <Form
                onSubmit={handleSubmit}
                validationSchema={schema}
                className="space-y-4"
            >
                <Form.Field
                    name="name"
                    label="Nombre"
                    placeholder="Ingrese su nombre"
                />
                <Form.Field
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Ingrese su email"
                />
                <Form.Field
                    name="message"
                    label="Mensaje"
                    type="textarea"
                    placeholder="Ingrese su mensaje"
                />
                <Form.Button>Enviar</Form.Button>
            </Form>
        );
    };

    const AdvancedExample = () => {
        const schema = z.object({
            username: z.string().min(3, 'El usuario debe tener al menos 3 caracteres'),
            password: z.string()
                .min(8, 'La contraseña debe tener al menos 8 caracteres')
                .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
                .regex(/[0-9]/, 'Debe contener al menos un número'),
            role: z.string().min(1, 'Seleccione un rol'),
            permissions: z.array(z.string()).min(1, 'Seleccione al menos un permiso'),
            active: z.boolean(),
        });

        const roles = [
            { value: 'admin', label: 'Administrador' },
            { value: 'user', label: 'Usuario' },
            { value: 'guest', label: 'Invitado' },
        ];

        const permissions = [
            { value: 'create', label: 'Crear' },
            { value: 'read', label: 'Leer' },
            { value: 'update', label: 'Actualizar' },
            { value: 'delete', label: 'Eliminar' },
        ];

        const handleSubmit = (values) => {
            console.log('Valores enviados:', values);
        };

        return (
            <Form
                onSubmit={handleSubmit}
                validationSchema={schema}
                className="space-y-4"
            >
                <Form.Field
                    name="username"
                    label="Usuario"
                    placeholder="Ingrese su usuario"
                    helper="El usuario debe tener al menos 3 caracteres"
                />
                <Form.Field
                    name="password"
                    label="Contraseña"
                    type="password"
                    placeholder="Ingrese su contraseña"
                    helper="La contraseña debe tener al menos 8 caracteres, una mayúscula y un número"
                />
                <Form.Field
                    name="role"
                    label="Rol"
                    type="select"
                    options={roles}
                    placeholder="Seleccione un rol"
                />
                <Form.Field
                    name="permissions"
                    label="Permisos"
                    type="checkbox-group"
                    options={permissions}
                />
                <Form.Field
                    name="active"
                    label="Usuario activo"
                    type="switch"
                />
                <Form.Button>Crear usuario</Form.Button>
            </Form>
        );
    };

    const componentProps = [
        {
            name: 'onSubmit',
            type: '(values: any) => void',
            required: true,
            description: 'Función que se ejecuta al enviar el formulario',
        },
        {
            name: 'validationSchema',
            type: 'ZodSchema',
            required: false,
            description: 'Schema de validación usando Zod',
        },
        {
            name: 'initialValues',
            type: 'object',
            required: false,
            description: 'Valores iniciales del formulario',
        },
        {
            name: 'className',
            type: 'string',
            required: false,
            description: 'Clases CSS adicionales',
        },
        {
            name: 'resetOnSubmit',
            type: 'boolean',
            required: false,
            description: 'Reinicia el formulario después del envío',
        },
    ];

    const examples = [
        {
            title: 'Ejemplo básico',
            description: 'Formulario simple con validación básica',
            code: `const schema = z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    email: z.string().email('Email inválido'),
    message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

<Form
    onSubmit={handleSubmit}
    validationSchema={schema}
    className="space-y-4"
>
    <Form.Field
        name="name"
        label="Nombre"
        placeholder="Ingrese su nombre"
    />
    <Form.Field
        name="email"
        label="Email"
        type="email"
        placeholder="Ingrese su email"
    />
    <Form.Field
        name="message"
        label="Mensaje"
        type="textarea"
        placeholder="Ingrese su mensaje"
    />
    <Form.Button>Enviar</Form.Button>
</Form>`,
            component: BasicExample,
        },
        {
            title: 'Ejemplo avanzado',
            description: 'Formulario con múltiples tipos de campos y validación compleja',
            code: `const schema = z.object({
    username: z.string().min(3, 'El usuario debe tener al menos 3 caracteres'),
    password: z.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
        .regex(/[0-9]/, 'Debe contener al menos un número'),
    role: z.string().min(1, 'Seleccione un rol'),
    permissions: z.array(z.string()).min(1, 'Seleccione al menos un permiso'),
    active: z.boolean(),
});

<Form
    onSubmit={handleSubmit}
    validationSchema={schema}
    className="space-y-4"
>
    <Form.Field
        name="username"
        label="Usuario"
        placeholder="Ingrese su usuario"
        helper="El usuario debe tener al menos 3 caracteres"
    />
    <Form.Field
        name="password"
        label="Contraseña"
        type="password"
        placeholder="Ingrese su contraseña"
        helper="La contraseña debe tener al menos 8 caracteres, una mayúscula y un número"
    />
    <Form.Field
        name="role"
        label="Rol"
        type="select"
        options={roles}
        placeholder="Seleccione un rol"
    />
    <Form.Field
        name="permissions"
        label="Permisos"
        type="checkbox-group"
        options={permissions}
    />
    <Form.Field
        name="active"
        label="Usuario activo"
        type="switch"
    />
    <Form.Button>Crear usuario</Form.Button>
</Form>`,
            component: AdvancedExample,
        },
    ];

    const notes = [
        'Validación de formularios integrada usando Zod',
        'Soporte para múltiples tipos de campos: text, email, password, select, checkbox-group, switch, etc.',
        'Manejo de errores y mensajes de ayuda',
        'Estilizado con Tailwind CSS y totalmente personalizable',
        'Componentes anidados (Form.Field, Form.Button) para mejor organización',
        'Soporte para valores iniciales y reinicio del formulario',
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Form</h2>
                <p className="mt-2 text-gray-600">
                    Componente de formulario con validación integrada y múltiples tipos de campos
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

export default FormDocs; 