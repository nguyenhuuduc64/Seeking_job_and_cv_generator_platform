import '@testing-library/jest-dom/vitest'; // Kết nối matchers với vitest
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Tự động dọn dẹp DOM sau mỗi bài test để tránh rác dữ liệu
afterEach(() => {
    cleanup();
});
