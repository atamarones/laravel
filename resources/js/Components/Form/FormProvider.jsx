import React, { createContext, useContext, useState, useCallback } from 'react';
import { useForm } from '@inertiajs/react';

const FormContext = createContext();

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext debe ser usado dentro de un FormProvider');
    }
    return context;
};

const FormProvider = ({
    children,
    initialValues = {},
    validationRules = {},
    onSubmit,
    resetOnSubmit = false,
    method = 'post',
    action = '',
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touchedFields, setTouchedFields] = useState({});
    const [customErrors, setCustomErrors] = useState({});

    const form = useForm(initialValues);

    const validateField = useCallback((name, value) => {
        const rules = validationRules[name] || [];
        const errors = [];

        rules.forEach(rule => {
            if (typeof rule === 'function') {
                const error = rule(value, form.data);
                if (error) errors.push(error);
            } else if (rule.required && !value) {
                errors.push('Este campo es requerido');
            } else if (rule.minLength && value.length < rule.minLength) {
                errors.push(`Mínimo ${rule.minLength} caracteres`);
            } else if (rule.maxLength && value.length > rule.maxLength) {
                errors.push(`Máximo ${rule.maxLength} caracteres`);
            } else if (rule.pattern && !rule.pattern.test(value)) {
                errors.push(rule.message || 'Formato inválido');
            } else if (rule.validate) {
                const error = rule.validate(value, form.data);
                if (error) errors.push(error);
            }
        });

        return errors;
    }, [validationRules, form.data]);

    const validateForm = useCallback(() => {
        const errors = {};
        let isValid = true;

        Object.keys(form.data).forEach(fieldName => {
            const fieldErrors = validateField(fieldName, form.data[fieldName]);
            if (fieldErrors.length > 0) {
                errors[fieldName] = fieldErrors;
                isValid = false;
            }
        });

        setCustomErrors(errors);
        return isValid;
    }, [form.data, validateField]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            // Marcar todos los campos como tocados para mostrar errores
            const allTouched = Object.keys(form.data).reduce((acc, field) => ({
                ...acc,
                [field]: true
            }), {});
            setTouchedFields(allTouched);
            return;
        }

        setIsSubmitting(true);

        try {
            await form.submit(method, action, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    if (resetOnSubmit) {
                        form.reset();
                        setTouchedFields({});
                    }
                    if (onSubmit) onSubmit(form.data);
                },
                onError: (errors) => {
                    setCustomErrors(prev => ({...prev, ...errors}));
                },
                onFinish: () => setIsSubmitting(false),
            });
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        form.setData(name, value);

        if (touchedFields[name]) {
            const fieldErrors = validateField(name, value);
            setCustomErrors(prev => ({
                ...prev,
                [name]: fieldErrors
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouchedFields(prev => ({
            ...prev,
            [name]: true
        }));

        const fieldErrors = validateField(name, value);
        setCustomErrors(prev => ({
            ...prev,
            [name]: fieldErrors
        }));
    };

    const getFieldProps = (name) => ({
        name,
        value: form.data[name] || '',
        onChange: handleChange,
        onBlur: handleBlur,
        'aria-invalid': touchedFields[name] && customErrors[name]?.length > 0,
        'aria-describedby': `${name}-error`,
    });

    const contextValue = {
        form,
        isSubmitting,
        errors: customErrors,
        touchedFields,
        getFieldProps,
        handleSubmit,
        validateField,
        validateForm,
    };

    return (
        <FormContext.Provider value={contextValue}>
            {children}
        </FormContext.Provider>
    );
};

export default FormProvider; 