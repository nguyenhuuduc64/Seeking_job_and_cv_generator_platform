import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useTranslation } from 'react-i18next';

export interface SkillItem {
    group: string;
    skillList: string;
}

export interface ExperienceData {
    title?: string;
    list: SkillItem[];
}

interface Props {
    data?: ExperienceData;
    onDataChange?: (data: ExperienceData) => void;
    onDelete?: () => void;
}

const SkillInputBlock: React.FC<Props> = ({ data, onDataChange, onDelete }) => {
    const { t } = useTranslation();
    const [localData, setLocalData] = useState<ExperienceData>(
        data || {
            title: t('cv.skill.title'),
            // Khởi tạo mảng rỗng hoặc 1 dòng đúng chuẩn SkillItem thưa ông chủ
            list: [{ group: '', skillList: '' }],
        }
    );

    const updateList = (index: number, field: keyof SkillItem, value: string) => {
        const newList = [...localData.list];
        // Cập nhật trực tiếp giá trị chuỗi vào field thưa ông chủ
        newList[index] = { ...newList[index], [field]: value };

        const newData = { ...localData, list: newList };
        setLocalData(newData);
        if (onDataChange) onDataChange(newData);
    };

    const addRow = () => {
        const currentList = Array.isArray(localData?.list) ? localData.list : [];
        const newData = {
            ...localData,
            // Đảm bảo thêm đúng cấu trúc Skill thưa ông chủ
            list: [...currentList, { group: '', skillList: '' }],
        };

        setLocalData(newData);
        if (onDataChange) onDataChange(newData);
    };
    return (
        <div className="group relative mb-8 w-full bg-white p-2">
            {/* Header tiêu đề thưa ông chủ */}
            <div className="mb-4 w-full border-b border-black pb-1">
                <h2 className="text-base font-bold uppercase tracking-wide text-black">
                    {t('cv.skill.title')}
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
                                placeholder={t('cv.skill.kill_group_placeholder')}
                                className="w-full border-none bg-transparent p-0 text-sm italic font-medium text-gray-500 outline-none focus:ring-0 resize-none overflow-hidden"
                                value={item.group}
                                onChange={(e) => updateList(index, 'group', e.target.value)}
                            />
                        </div>

                        {/* Cột nội dung bên phải thưa ông chủ */}
                        <div className="flex flex-1 flex-col gap-1">
                            <TextareaAutosize
                                placeholder={t('cv.skill.skill_list_placeholder')}
                                className="w-full border-none bg-transparent p-0 font-bold text-gray-800 outline-none focus:ring-0 resize-none overflow-hidden"
                                value={item.skillList}
                                onChange={(e) => updateList(index, 'skillList', e.target.value)}
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
                + {t('cv.skill.add_button')}
            </button>

            {/* Debug chỉ hiện khi cần thưa ông chủ */}
            <div className="mt-2 rounded bg-gray-50 p-2 font-mono text-[10px] text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 no-print">
                <span className="text-blue-400 uppercase font-bold">Debug skill:</span>{' '}
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

export default SkillInputBlock;
