import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { generateContent } from '../../../utils/resume';
import Toolbar from '../../common/toolbar/Toolbar';

export interface ObjectiveData {
    content?: string;
}

interface Props {
    data?: ObjectiveData;
    onDataChange?: (data: ObjectiveData) => void;
    onDelete?: () => void;
}

const ObjectiveInputBlock: React.FC<Props> = ({ data, onDataChange, onDelete }) => {

    // Khởi tạo Editor Tiptap thưa ông chủ
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Mục tiêu nghề nghiệp của bạn...',
            }),
        ],
        content: data?.content || '', // Nội dung ban đầu là HTML từ DB/LocalStorage
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            if (onDataChange) onDataChange({ content: html });
        },
    });

    // Đồng bộ hóa khi data từ cha thay đổi (ví dụ khi nhấn AI Gen)
    useEffect(() => {
        if (editor && data?.content !== editor.getHTML()) {
            editor.commands.setContent(data?.content || '');
        }
    }, [data?.content, editor]);

    const handleGenerateAI = async () => {
        const aiResult = await generateContent(editor?.getText() || '');
        if (editor) {
            editor.commands.setContent(aiResult);
            if (onDataChange) onDataChange({ content: aiResult });
        }
    };

    if (!editor) return null;

    return (
        <div className="group relative mb-6 w-full bg-white">
            {/* --- TOOLBAR: Chỉ hiện trên Web khi hover hoặc focus --- */}
            <div className="no-print absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-md rounded border">
                <Toolbar editor={editor} />
            </div>

            {/* --- TIÊU ĐỀ (Giữ nguyên style PDF) --- */}
            <div className="mb-2 w-full border-b border-black pb-1">
                <h2 className="text-base font-bold uppercase tracking-wide text-black">
                    Mục tiêu nghề nghiệp
                </h2>
            </div>

            {/* --- NỘI DUNG --- */}
            <div className="w-full relative">
                <button
                    onClick={handleGenerateAI}
                    className="no-print absolute -right-20 top-0 text-[10px] bg-purple-100 text-purple-600 px-2 py-1 rounded hover:bg-purple-200 transition-all opacity-0 group-hover:opacity-100"
                >
                    ✨ AI Gen
                </button>

                {/* Editor thay thế cho Textarea thưa ông chủ */}
                <div className="prose prose-sm max-w-none text-gray-800">
                    <EditorContent editor={editor} className="outline-none" />
                </div>
            </div>
        </div>
    );
};

export default ObjectiveInputBlock;