import { useState, useEffect } from 'react';
import es from '../lang/es';
import en from '../lang/en';

const translations = { es, en };

export function useTranslation() {
    const [language, setLanguage] = useState('es');
    
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return key;
            }
        }
        
        return value;
    };

    return { t, language, changeLanguage };
} 