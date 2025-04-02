import React from 'react';
import { useForm } from '@inertiajs/react';

const Form = ({
    children,
    className = '',
    variant = 'default',
    size = 'md',
    onSubmit,
    initialValues = {},
    validationSchema,
    resetOnSubmit = false,
    preserveScroll = true,
    preserveState = true,
    method = 'post',
    action,
}) => {
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm(initialValues);

    const variants = {
        default: {
            base: 'bg-white',
            label: 'text-gray-700',
            input: 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
            error: 'text-error-600',
            button: 'bg-primary-600 text-white hover:bg-primary-700',
        },
        primary: {
            base: 'bg-primary-50',
            label: 'text-primary-900',
            input: 'border-primary-300 focus:border-primary-500 focus:ring-primary-500',
            error: 'text-error-600',
            button: 'bg-primary-600 text-white hover:bg-primary-700',
        },
        secondary: {
            base: 'bg-secondary-50',
            label: 'text-secondary-900',
            input: 'border-secondary-300 focus:border-secondary-500 focus:ring-secondary-500',
            error: 'text-error-600',
            button: 'bg-secondary-600 text-white hover:bg-secondary-700',
        },
    };

    const sizes = {
        sm: 'space-y-4',
        md: 'space-y-6',
        lg: 'space-y-8',
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearErrors();

        let isValid = true;
        if (validationSchema) {
            try {
                await validationSchema.validate(data, { abortEarly: false });
            } catch (err) {
                isValid = false;
                const validationErrors = {};
                err.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });
                setErrors(validationErrors);
            }
        }

        if (isValid) {
            if (onSubmit) {
                await onSubmit(data);
            } else if (action) {
                const submitMethod = method.toLowerCase() === 'put' ? put : post;
                await submitMethod(action, {
                    preserveScroll,
                    preserveState,
                    onSuccess: () => {
                        if (resetOnSubmit) {
                            reset();
                        }
                    },
                });
            }
        }
    };

    const formContext = {
        data,
        setData,
        errors,
        processing,
        variant,
        size,
        variants: variants[variant],
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`${sizes[size]} ${variants[variant].base} ${className}`}
            noValidate
        >
            {typeof children === 'function' ? children(formContext) : children}
        </form>
    );
};

// Componentes auxiliares del formulario
const FormGroup = ({ children, className = '', error }) => (
    <div className={`space-y-2 ${className}`}>
        {children}
        {error && <div className="text-sm text-error-600">{error}</div>}
    </div>
);

const FormLabel = ({ children, className = '', required }) => (
    <label className={`block text-sm font-medium ${className}`}>
        {children}
        {required && <span className="text-error-500 ml-1">*</span>}
    </label>
);

const FormHelperText = ({ children, className = '', error }) => (
    <p className={`mt-2 text-sm ${error ? 'text-error-600' : 'text-gray-500'} ${className}`}>
        {children}
    </p>
);

Form.Group = FormGroup;
Form.Label = FormLabel;
Form.HelperText = FormHelperText;

export default Form; 