import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { generateContent } from '../../../utils/resume';
import Toolbar from '../../common/toolbar/Toolbar';
import { useTranslation } from 'react-i18next';
export interface ObjectiveData {
    content?: string;
}

interface Props {
    data?: ObjectiveData;
    onDataChange?: (data: ObjectiveData) => void;
    onDelete?: () => void;
}

const ObjectiveInputBlock: React.FC<Props> = ({ data, onDataChange, onDelete }) => {
    const { t } = useTranslation();
    const editor = useEditor(
        {
            extensions: [
                StarterKit,
                Placeholder.configure({
                    placeholder: t('cv.objective.placeholder'),
                }),
            ],
            content: data?.content || '',
            onUpdate: ({ editor }) => {
                const html = editor.getHTML();
                if (onDataChange) onDataChange({ content: html });
            },
        },
        [t]
    );

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
            <div className="no-print absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-md rounded border">
                <Toolbar editor={editor} />
            </div>

            <div className="mb-2 w-full border-b border-black pb-1">
                <h2 className="text-base font-bold uppercase tracking-wide text-black">
                    {t('cv.objective.title')}
                </h2>
            </div>

            <div className="w-full relative">
                <button
                    onClick={handleGenerateAI}
                    className="no-print absolute -right-20 top-0 text-[10px] bg-purple-100 text-purple-600 px-2 py-1 rounded hover:bg-purple-200 transition-all opacity-0 group-hover:opacity-100"
                >
                    ✨ AI Gen
                </button>

                <div className="prose prose-sm max-w-none text-gray-800">
                    <EditorContent editor={editor} className="outline-none" />
                </div>
            </div>
        </div>
    );
};

export default ObjectiveInputBlock;
