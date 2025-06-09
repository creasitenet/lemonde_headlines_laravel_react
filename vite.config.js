import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [       
        react(),
        tailwindcss(),
        laravel({
            input: ['resources/css/app.css', 'resources/js/App.tsx'],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
    build: {
        outDir: 'public/build',
        manifest: true,
        rollupOptions: {
            input: 'resources/js/App.tsx'
        }
    }
});
