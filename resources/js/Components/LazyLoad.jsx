import React, { useEffect, useRef, useState } from 'react';

const LazyLoad = ({
    children,
    component: Component = 'div',
    height = 'auto',
    width = 'auto',
    threshold = 0.1,
    placeholder,
    onVisible,
    className = '',
    style = {},
    rootMargin = '50px 0px',
    ...props
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const currentElement = containerRef.current;
        if (!currentElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    onVisible?.();
                    observer.unobserve(currentElement);
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        observer.observe(currentElement);

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [threshold, rootMargin, onVisible]);

    const handleLoad = () => {
        setHasLoaded(true);
    };

    // Renderizar placeholder mientras no sea visible
    if (!isVisible) {
        return (
            <Component
                ref={containerRef}
                className={className}
                style={{
                    height,
                    width,
                    ...style,
                }}
                {...props}
            >
                {placeholder}
            </Component>
        );
    }

    // Si es una imagen
    if (props.src) {
        return (
            <Component
                {...props}
                className={`
                    ${className}
                    ${!hasLoaded ? 'animate-pulse bg-gray-200' : ''}
                `}
                style={{
                    height,
                    width,
                    opacity: hasLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out',
                    ...style,
                }}
                onLoad={handleLoad}
            />
        );
    }

    // Para otros componentes
    return (
        <Component
            className={className}
            style={{
                height,
                width,
                ...style,
            }}
            {...props}
        >
            {children}
        </Component>
    );
};

// Componente específico para imágenes
export const LazyImage = ({
    src,
    alt = '',
    className = '',
    placeholderSrc,
    onLoad,
    ...props
}) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const handleLoad = (e) => {
        setLoaded(true);
        onLoad?.(e);
    };

    const handleError = () => {
        setError(true);
    };

    return (
        <LazyLoad
            component="img"
            src={error ? placeholderSrc : src}
            alt={alt}
            className={`
                ${className}
                ${!loaded ? 'animate-pulse bg-gray-200' : ''}
            `}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
        />
    );
};

// Componente específico para iframes
export const LazyIframe = ({
    src,
    title = '',
    className = '',
    placeholderContent,
    ...props
}) => {
    return (
        <LazyLoad
            component="iframe"
            src={src}
            title={title}
            className={className}
            placeholder={placeholderContent}
            {...props}
        />
    );
};

// HOC para hacer lazy load de cualquier componente
export const withLazyLoad = (WrappedComponent, options = {}) => {
    return function LazyLoadedComponent(props) {
        return (
            <LazyLoad {...options}>
                <WrappedComponent {...props} />
            </LazyLoad>
        );
    };
};

export default LazyLoad; 