import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

// Slice para el estado de la UI
const createUISlice = (set, get) => ({
    sidebarOpen: true,
    theme: 'light',
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setTheme: (theme) => set({ theme }),
});

// Slice para el estado de autenticación
const createAuthSlice = (set, get) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    logout: () => set({ user: null, isAuthenticated: false }),
});

// Slice para el estado de notificaciones
const createNotificationSlice = (set, get) => ({
    notifications: [],
    addNotification: (notification) =>
        set((state) => ({
            notifications: [
                {
                    id: Date.now(),
                    type: 'info',
                    duration: 5000,
                    ...notification,
                },
                ...state.notifications,
            ],
        })),
    removeNotification: (id) =>
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
        })),
    clearNotifications: () => set({ notifications: [] }),
});

// Slice para el estado de la caché
const createCacheSlice = (set, get) => ({
    cache: new Map(),
    setCache: (key, value, ttl = 5 * 60 * 1000) => {
        const expires = Date.now() + ttl;
        set((state) => ({
            cache: new Map(state.cache).set(key, { value, expires }),
        }));
    },
    getCache: (key) => {
        const cached = get().cache.get(key);
        if (!cached) return null;
        if (Date.now() > cached.expires) {
            get().clearCache(key);
            return null;
        }
        return cached.value;
    },
    clearCache: (key) =>
        set((state) => {
            const newCache = new Map(state.cache);
            if (key) {
                newCache.delete(key);
            } else {
                newCache.clear();
            }
            return { cache: newCache };
        }),
});

// Store principal
const useStore = create(
    devtools(
        persist(
            (set, get) => ({
                ...createUISlice(set, get),
                ...createAuthSlice(set, get),
                ...createNotificationSlice(set, get),
                ...createCacheSlice(set, get),
            }),
            {
                name: 'app-storage',
                partialize: (state) => ({
                    theme: state.theme,
                    user: state.user,
                    isAuthenticated: state.isAuthenticated,
                }),
            }
        )
    )
);

// Selectores optimizados
export const useUI = () =>
    useStore(
        (state) => ({
            sidebarOpen: state.sidebarOpen,
            theme: state.theme,
            setSidebarOpen: state.setSidebarOpen,
            toggleSidebar: state.toggleSidebar,
            setTheme: state.setTheme,
        }),
        shallow
    );

export const useAuth = () =>
    useStore(
        (state) => ({
            user: state.user,
            isAuthenticated: state.isAuthenticated,
            setUser: state.setUser,
            logout: state.logout,
        }),
        shallow
    );

export const useNotifications = () =>
    useStore(
        (state) => ({
            notifications: state.notifications,
            addNotification: state.addNotification,
            removeNotification: state.removeNotification,
            clearNotifications: state.clearNotifications,
        }),
        shallow
    );

export const useCache = () =>
    useStore(
        (state) => ({
            setCache: state.setCache,
            getCache: state.getCache,
            clearCache: state.clearCache,
        }),
        shallow
    );

export default useStore; 