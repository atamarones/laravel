import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ComponentDocs = ({
    title,
    description,
    component: Component,
    code,
    props = [],
    examples = [],
    notes = [],
}) => {
    const [activeTab, setActiveTab] = useState('preview');
    const [selectedExample, setSelectedExample] = useState(0);

    const renderPropTable = () => (
        <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Props</h3>
            <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tipo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Default
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Descripción
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {props.map((prop) => (
                            <tr key={prop.name}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {prop.name}
                                    {prop.required && (
                                        <span className="ml-1 text-error-500">*</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {prop.type}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {prop.default || '-'}
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
    );

    const renderExample = (example, index) => (
        <div
            key={index}
            className={`mt-4 ${selectedExample === index ? 'block' : 'hidden'}`}
        >
            <div className="p-6 bg-white rounded-lg border border-gray-200">
                <example.component />
            </div>
            <div className="mt-4">
                <SyntaxHighlighter
                    language="jsx"
                    style={tomorrow}
                    className="rounded-lg"
                >
                    {example.code}
                </SyntaxHighlighter>
            </div>
        </div>
    );

    const renderNotes = () => (
        <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Notas de Implementación</h3>
            <div className="mt-4 space-y-4">
                {notes.map((note, index) => (
                    <div
                        key={index}
                        className="flex items-start"
                    >
                        <div className="flex-shrink-0">
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-600">
                                {index + 1}
                            </span>
                        </div>
                        <p className="ml-3 text-sm text-gray-500">{note}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    <p className="text-gray-500">{description}</p>

                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                className={`
                                    py-4 px-1 border-b-2 font-medium text-sm
                                    ${activeTab === 'preview'
                                        ? 'border-primary-500 text-primary-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }
                                `}
                                onClick={() => setActiveTab('preview')}
                            >
                                Vista Previa
                            </button>
                            <button
                                className={`
                                    py-4 px-1 border-b-2 font-medium text-sm
                                    ${activeTab === 'code'
                                        ? 'border-primary-500 text-primary-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }
                                `}
                                onClick={() => setActiveTab('code')}
                            >
                                Código
                            </button>
                        </nav>
                    </div>

                    {activeTab === 'preview' ? (
                        <div>
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <Component />
                            </div>
                            {examples.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Ejemplos
                                    </h3>
                                    <div className="mt-4 border-b border-gray-200">
                                        <nav className="-mb-px flex space-x-8">
                                            {examples.map((example, index) => (
                                                <button
                                                    key={index}
                                                    className={`
                                                        py-4 px-1 border-b-2 font-medium text-sm
                                                        ${selectedExample === index
                                                            ? 'border-primary-500 text-primary-600'
                                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                        }
                                                    `}
                                                    onClick={() => setSelectedExample(index)}
                                                >
                                                    {example.title}
                                                </button>
                                            ))}
                                        </nav>
                                    </div>
                                    {examples.map((example, index) => renderExample(example, index))}
                                </div>
                            )}
                            {renderPropTable()}
                            {notes.length > 0 && renderNotes()}
                        </div>
                    ) : (
                        <div className="mt-4">
                            <SyntaxHighlighter
                                language="jsx"
                                style={tomorrow}
                                className="rounded-lg"
                            >
                                {code}
                            </SyntaxHighlighter>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComponentDocs; 