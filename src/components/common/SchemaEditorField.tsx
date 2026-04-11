import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Toolbar from '@/components/common/toolbar/Toolbar';
import { useEffect } from 'react';

interface Props {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

export const SchemaEditorField = ({ value, onChange, placeholder }: Props) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'min-h-[200px] p-3 focus:outline-none prose max-w-none text-sm',
            },
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!editor) return null;

    return (
        <div className="border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
            <div className="bg-gray-50 border-b">
                <Toolbar editor={editor} />
            </div>
            <EditorContent editor={editor} />
        </div>
    );
};
