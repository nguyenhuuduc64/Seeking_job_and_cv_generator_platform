import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    const [localData, setLocalData] = useState<ExperienceData>(
        data || {
            title: t('cv.experience.title'),
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
        const currentList = Array.isArray(localData?.list) ? localData.list : [];
        const newData = {
            ...localData,
            list: [...currentList, { period: '', company: '', position: '', description: '' }],
        };

        setLocalData(newData);
        if (onDataChange) onDataChange(newData);
    };

    return (
        <div className="group relative mb-8 w-full bg-white p-2">
            {/* Header tiêu đề thưa ông chủ */}
            <div className="mb-4 w-full border-b border-black pb-1">
                <h2 className="text-base font-bold uppercase tracking-wide text-black">
                    {t('cv.experience.title')}
                </h2>
            </div>

            <div className="space-y-6">
                {localData?.list?.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-row gap-6 items-start border-b border-gray-50 pb-4 last:border-0"
                    >
                        {/* Cột thời gian: Fix cứng 120px thưa ông chủ */}
                        <div className="w-[120px] shrink-0 pt-0.5">
                            <TextareaAutosize
                                placeholder={t('cv.experience.period_placeholder')}
                                className="w-full border-none bg-transparent p-0 text-sm italic font-medium text-gray-500 outline-none focus:ring-0 resize-none overflow-hidden"
                                value={item.period}
                                onChange={(e) => updateList(index, 'period', e.target.value)}
                            />
                        </div>

                        {/* Cột nội dung bên phải thưa ông chủ */}
                        <div className="flex flex-1 flex-col gap-1">
                            <TextareaAutosize
                                placeholder={t('cv.experience.company_placeholder')}
                                className="w-full border-none bg-transparent p-0 font-bold text-gray-800 outline-none focus:ring-0 resize-none overflow-hidden"
                                value={item.company}
                                onChange={(e) => updateList(index, 'company', e.target.value)}
                            />
                            <TextareaAutosize
                                placeholder={t('cv.experience.position_placeholder')}
                                className="w-full border-none bg-transparent p-0 font-semibold text-gray-700 italic outline-none focus:ring-0 resize-none overflow-hidden"
                                value={item.position}
                                onChange={(e) => updateList(index, 'position', e.target.value)}
                            />
                            <TextareaAutosize
                                placeholder={t('cv.experience.desc_placeholder')}
                                rows={2}
                                className="w-full border-none bg-transparent p-0 text-sm text-gray-600 outline-none focus:ring-0 resize-none overflow-hidden mt-1"
                                value={item.description}
                                onChange={(e) => updateList(index, 'description', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Nút thêm dòng thưa ông chủ */}
            <button
                onClick={addRow}
                className="mt-2 cursor-pointer text-xs text-blue-500 opacity-0 group-hover:opacity-100 no-print"
            >
                + {t('cv.experience.add_button')}
            </button>

            {/* Debug chỉ hiện khi cần thưa ông chủ */}
            <div className="mt-2 rounded bg-gray-50 p-2 font-mono text-[10px] text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 no-print">
                <span className="text-blue-400 uppercase font-bold">Debug Experience:</span>{' '}
                {JSON.stringify(localData)}
            </div>

            {/* Nút xóa block thưa ông chủ */}
            {onDelete && (
                <button
                    onClick={onDelete}
                    className="absolute -left-6 top-10 opacity-0 group-hover:opacity-100 transition-all no-print text-red-500"
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

export default ExperienceInputBlock;
