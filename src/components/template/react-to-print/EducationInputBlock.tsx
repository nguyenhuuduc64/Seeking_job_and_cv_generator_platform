import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export interface EducationData {
    period?: string;
    school?: string;
    major?: string;
    description?: string;
}

interface Props {
    data?: EducationData;
    onDataChange?: (data: EducationData) => void;
    onDelete?: () => void;
}

const EducationInputBlock: React.FC<Props> = ({ data, onDataChange, onDelete }) => {
    const [localData, setLocalData] = useState<EducationData>(data || {});

    const handleChange = (field: keyof EducationData, value: string) => {
        const newData = { ...localData, [field]: value };
        setLocalData(newData);
        if (onDataChange) onDataChange(newData);
    };

    // Style cho các ô nhập liệu bên phải (Tên trường, ngành, mô tả)
    const inputStyle =
        'w-full border-none bg-transparent p-0 text-sm text-gray-700 outline-none focus:ring-0 resize-none overflow-hidden placeholder:text-gray-300';

    return (
        <div className="group relative mb-8 w-full bg-white p-2">
            {/* 1. Tiêu đề in hoa gạch chân đen toàn trang (Đồng nhất UI) */}
            <div className="mb-4 w-full border-b border-black pb-1">
                <h2 className="text-base font-bold uppercase tracking-wide text-black">Học vấn</h2>
            </div>

            {/* 2. Nội dung chính chia 2 cột */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Cột trái: Thời gian */}
                <div className="w-full md:w-1/4 shrink-0">
                    <TextareaAutosize
                        placeholder="Bắt đầu - Kết thúc"
                        className="w-full border-none bg-transparent p-0 text-sm italic font-medium text-gray-500 outline-none focus:ring-0 resize-none overflow-hidden"
                        value={localData.period || ''}
                        onChange={(e) => handleChange('period', e.target.value)}
                    />
                </div>

                {/* Cột phải: Thông tin chi tiết */}
                <div className="flex flex-1 flex-col gap-1">
                    {/* Tên trường học (In đậm) */}
                    <TextareaAutosize
                        placeholder="Tên trường học"
                        className={`${inputStyle} font-bold text-gray-800`}
                        value={localData.school || ''}
                        onChange={(e) => handleChange('school', e.target.value)}
                    />

                    {/* Ngành học (In nghiêng) */}
                    <TextareaAutosize
                        placeholder="Ngành học / Môn học"
                        className={`${inputStyle} italic text-gray-500`}
                        value={localData.major || ''}
                        onChange={(e) => handleChange('major', e.target.value)}
                    />

                    {/* Mô tả quá trình */}
                    <TextareaAutosize
                        placeholder="Mô tả quá trình học tập hoặc thành tích của bạn"
                        className={`${inputStyle} mt-1`}
                        value={localData.description || ''}
                        onChange={(e) => handleChange('description', e.target.value)}
                    />
                </div>
            </div>

            {/* 3. Debug View (Hiện khi hover) */}
            <div className="mt-4 rounded bg-gray-50 p-2 font-mono text-[10px] text-gray-400 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-blue-400 font-bold uppercase">Debug Education:</span>{' '}
                {JSON.stringify(localData)}
            </div>

            {/* Nút Xóa (Hiện khi hover) */}
            {onDelete && (
                <button
                    onClick={onDelete}
                    className="absolute -right-2 -top-2 hidden rounded-full bg-red-500 p-1 text-white shadow-md transition-transform hover:scale-110 group-hover:block"
                    title="Xóa mục này"
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

export default EducationInputBlock;
