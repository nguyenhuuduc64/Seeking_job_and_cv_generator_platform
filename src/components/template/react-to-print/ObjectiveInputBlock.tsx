import React, { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { generateContent } from '../../../utils/resume';

export interface ObjectiveData {
    content?: string;
}

interface Props {
    data?: ObjectiveData;
    onDataChange?: (data: ObjectiveData) => void;
    onDelete?: () => void;
}

const ObjectiveInputBlock: React.FC<Props> = ({ data, onDataChange, onDelete }) => {
    const [localData, setLocalData] = useState<ObjectiveData>(data || { content: '' });
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (value: string) => {
        const newData = { content: value };
        setLocalData(newData);
        if (onDataChange) onDataChange(newData);
    };

    const handleGenerateAI = async () => {
        const content = await generateContent(textareaRef?.current?.value || '');
        const newData = { content };
        setLocalData(newData);
        if (onDataChange) onDataChange(newData);
    };

    return (
        <div className="group relative mb-6 w-full bg-white">
            {/* --- TIÊU ĐỀ (Giữ nguyên style PDF) --- */}
            <div className="mb-2 w-full border-b border-black pb-1">
                <h2 className="text-base font-bold uppercase tracking-wide text-black">
                    Mục tiêu nghề nghiệp
                </h2>
            </div>

            {/* --- NỘI DUNG --- */}
            <div className="w-full relative">
                {/* Nút AI - Chỉ hiện trên Web, ẩn hoàn toàn khi In */}
                <button
                    onClick={handleGenerateAI}
                    className="no-print absolute -right-20 top-0 text-[10px] bg-purple-100 text-purple-600 px-2 py-1 rounded hover:bg-purple-200 transition-all opacity-0 group-hover:opacity-100"
                >
                    ✨ AI Gen
                </button>

                <TextareaAutosize
                    minRows={1}
                    placeholder="Mục tiêu nghề nghiệp của bạn..."
                    className="w-full border-none bg-transparent py-1 text-sm text-gray-800 outline-none focus:ring-0 resize-none p-0"
                    value={localData.content || ''}
                    onChange={(e) => handleChange(e.target.value)}
                    ref={textareaRef}
                />
            </div>

            {/* NÚT XÓA - Chỉ hiện trên Web khi hover */}
            {onDelete && (
                <button
                    onClick={onDelete}
                    className="no-print absolute -left-8 top-0 hidden rounded-full bg-red-50 p-1 text-red-400 hover:text-red-600 transition-all group-hover:block"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default ObjectiveInputBlock;
