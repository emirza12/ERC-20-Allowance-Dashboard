import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { WagmiConfig } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig, queryClient } from './bootstrap';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        if (name === 'Welcome') {
            name = 'Overview';
        }
        return resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx'));
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <QueryClientProvider client={queryClient}>
                <WagmiConfig config={wagmiConfig}>
                    <App {...props} />
                </WagmiConfig>
            </QueryClientProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});