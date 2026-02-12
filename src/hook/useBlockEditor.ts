import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';

export const useBlockEditor = (
    initialContent: string,
    placeholder: string,
    onUpdate: (html: string) => void
) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({ placeholder }),
        ],
        content: initialContent,
        onUpdate: ({ editor }) => {
            onUpdate(editor.getHTML());
        },
    });

    // Đồng bộ khi dữ liệu từ bên ngoài thay đổi (ví dụ: AI Gen)
    useEffect(() => {
        if (editor && initialContent !== editor.getHTML()) {
            editor.commands.setContent(initialContent);
        }
    }, [initialContent, editor]);

    return editor;
};