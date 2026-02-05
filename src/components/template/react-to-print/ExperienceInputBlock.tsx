import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

// --- 1. TYPES ---
export interface ExperienceItem {
    period: string;
    company: string;
    position: string;
    description: string;
}

export interface ExperienceData {
    title?: string;
    list: ExperienceItem[];
}

interface Props {
    data?: ExperienceData;
    onDataChange?: (data: ExperienceData) => void;
    onDelete?: () => void;
}

const ExperienceInputBlock: React.FC<Props> = ({ data, onDataChange, onDelete }) => {
    const [localData, setLocalData] = useState<ExperienceData>(
        data || {
            title: 'KINH NGHIỆM LÀM VIỆC',
            list: [{ period: '', company: '', position: '', description: '' }],
        }
    );

    const updateList = (index: number, field: keyof ExperienceItem, value: string) => {
        const newList = [...localData.list];
        newList[index] = { ...newList[index], [field]: value };
        const newData = { ...localData, list: newList };

        setLocalData(newData);
        if (onDataChange) onDataChange(newData);
    };

    const addRow = () => {
        // Kiểm tra xem list có thực sự là mảng không trước khi spread
        const currentList = Array.isArray(localData?.list) ? localData.list : [];

        const newData = {
            ...localData,
            list: [...currentList, { period: '', company: '', position: '', description: '' }],
        };

        setLocalData(newData);
        if (onDataChange) onDataChange(newData); // Cập nhật ngay để đồng bộ với cha
    };

    return (
        <div className="group relative mb-8 w-full bg-white p-2">
            <div className="mb-4 w-full border-b border-black pb-1">
                <h2 className="text-base font-bold uppercase tracking-wide text-black">
                    {localData.title}
                </h2>
            </div>

            <div className="space-y-6">
                {localData?.list?.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-12 gap-4 border-b border-gray-50 pb-4 last:border-0"
                    >
                        <div className="col-span-3">
                            <input
                                placeholder="Bắt đầu - Kết thúc"
                                className="w-full border-none bg-transparent text-sm italic text-gray-500 outline-none focus:ring-0"
                                value={item.period}
                                onChange={(e) => updateList(index, 'period', e.target.value)}
                            />
                        </div>
                        <div className="col-span-9 space-y-1">
                            <input
                                placeholder="Tên công ty"
                                className="w-full border-none bg-transparent font-bold text-gray-800 outline-none focus:ring-0"
                                value={item.company}
                                onChange={(e) => updateList(index, 'company', e.target.value)}
                            />
                            <input
                                placeholder="Vị trí công việc"
                                className="w-full border-none bg-transparent font-semibold text-gray-700 italic outline-none focus:ring-0"
                                value={item.position}
                                onChange={(e) => updateList(index, 'position', e.target.value)}
                            />
                            <TextareaAutosize
                                placeholder="Mô tả kinh nghiệm..."
                                rows={2}
                                className="w-full border-none bg-transparent text-sm text-gray-600 outline-none focus:ring-0"
                                value={item.description}
                                onChange={(e) => updateList(index, 'description', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addRow}
                className="mt-2 cursor-pointer text-xs text-blue-500 opacity-0 group-hover:opacity-100"
            >
                + Thêm kinh nghiệm
            </button>

            <div className="mt-2 rounded bg-gray-50 p-2 font-mono text-[10px] text-gray-400 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-blue-400 uppercase font-bold">Debug Experience:</span>{' '}
                {JSON.stringify(localData)}
            </div>

            {onDelete && <button onClick={onDelete} />}
        </div>
    );
};

export default ExperienceInputBlock;
