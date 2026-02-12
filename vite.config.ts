import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// BẮT BUỘC phải có 'export default' ở đây
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        // Nếu ông chủ có dùng alias như '@/', hãy thêm vào đây
    },
    server: {
        host: true,
        allowedHosts: ['openedx.id.vn'],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"), // Ánh xạ @ vào thư mục src
        },
    },
});
