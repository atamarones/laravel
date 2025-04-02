import React, { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext();

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading debe ser usado dentro de un LoadingProvider');
    }
    return context;
};

const LoadingProvider = ({ children }) => {
    const [loadingStates, setLoadingStates] = useState({});
    const [globalLoading, setGlobalLoading] = useState(false);

    const startLoading = useCallback((key = 'global') => {
        if (key === 'global') {
            setGlobalLoading(true);
        } else {
            setLoadingStates(prev => ({
                ...prev,
                [key]: true
            }));
        }
    }, []);

    const stopLoading = useCallback((key = 'global') => {
        if (key === 'global') {
            setGlobalLoading(false);
        } else {
            setLoadingStates(prev => ({
                ...prev,
                [key]: false
            }));
        }
    }, []);

    const isLoading = useCallback((key = 'global') => {
        return key === 'global' ? globalLoading : !!loadingStates[key];
    }, [globalLoading, loadingStates]);

    const LoadingOverlay = () => {
        if (!globalLoading) return null;

        return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                role="alert"
                aria-busy="true"
                aria-label="Cargando"
            >
                <div className="rounded-lg bg-white p-6 shadow-xl">
                    <div className="flex items-center space-x-3">
                        <svg
                            className="h-8 w-8 animate-spin text-primary-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        <span className="text-lg font-medium text-gray-900">
                            Cargando...
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    const LoadingButton = ({
        children,
        loading,
        disabled,
        className = '',
        spinnerClassName = '',
        ...props
    }) => {
        return (
            <button
                disabled={loading || disabled}
                className={`
                    relative inline-flex items-center justify-center
                    ${loading ? 'cursor-not-allowed opacity-75' : ''}
                    ${className}
                `}
                {...props}
            >
                {loading && (
                    <svg
                        className={`
                            -ml-1 mr-2 h-4 w-4 animate-spin text-white
                            ${spinnerClassName}
                        `}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {children}
            </button>
        );
    };

    return (
        <LoadingContext.Provider
            value={{
                startLoading,
                stopLoading,
                isLoading,
                LoadingButton,
            }}
        >
            {children}
            <LoadingOverlay />
        </LoadingContext.Provider>
    );
};

export default LoadingProvider; 