import { vi, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Resume from '../pages/ResumeGeneratePage';
import '@testing-library/jest-dom';

// 1. Mock CKEditor React Component
vi.mock('@ckeditor/ckeditor5-react', () => ({
    CKEditor: ({ data, initialData }: any) => (
        <div data-testid="mock-ckeditor">{data || initialData || 'CKEditor Mock Content'}</div>
    ),
}));

// 2. Mock thư viện ckeditor5 cụ thể để tránh treo hệ thống
vi.mock('ckeditor5', () => {
    const mockPlugin = vi.fn();
    return {
        ClassicEditor: vi.fn(),
        Essentials: mockPlugin,
        Paragraph: mockPlugin,
        Bold: mockPlugin,
        Italic: mockPlugin,
        Undo: mockPlugin,
        Heading: mockPlugin,
        Image: mockPlugin,
        ImageUpload: mockPlugin,
        Autosave: mockPlugin,
        Link: mockPlugin,
        List: mockPlugin,
        MediaEmbed: mockPlugin,
        Table: mockPlugin,
        TableToolbar: mockPlugin,
    };
});

test('Kiểm tra Resume render thành công và hiển thị đúng nội dung', () => {
    render(<Resume />);

    // Kiểm tra khung soạn thảo đã hiển thị
    const editor = screen.getByTestId('mock-ckeditor');
    expect(editor).toBeInTheDocument();
});
