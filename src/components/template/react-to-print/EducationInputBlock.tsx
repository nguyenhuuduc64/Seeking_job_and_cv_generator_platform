import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    const handleChange = (field: keyof EducationData, value: string) => {
        const newData = { ...localData, [field]: value };
        setLocalData(newData);
        if (onDataChange) onDataChange(newData);
    };

    // Thêm min-h để không bị xẹp ô khi trống thưa ông chủ
    const inputStyle =
        'w-full border-none bg-transparent p-0 text-sm text-gray-700 outline-none focus:ring-0 resize-none overflow-hidden placeholder:text-gray-300 min-h-[1.5em]';

    return (
        <div className="group relative mb-8 w-full bg-white p-2">
            {/* Header: Cố định border để không bị nhảy thưa ông chủ */}
            <div className="mb-4 w-full border-b border-black pb-1">
                <h2 className="text-base font-bold uppercase tracking-wide text-black">
                    {t('cv.education.title')}
                </h2>
            </div>

            {/* Layout chính: Sử dụng items-start để các dòng không bị kéo dãn thưa ông chủ */}
            <div className="flex flex-row gap-6 items-start">
                {/* Cột thời gian: Fix cứng chiều rộng để không bị text dài đẩy lệch thưa ông chủ */}
                <div className="w-[120px] shrink-0 pt-0.5">
                    <TextareaAutosize
                        placeholder={t('cv.education.period_placeholder')}
                        className="w-full border-none bg-transparent p-0 text-sm italic font-medium text-gray-500 outline-none focus:ring-0 resize-none overflow-hidden"
                        value={localData.period || ''}
                        onChange={(e) => handleChange('period', e.target.value)}
                    />
                </div>

                {/* Cột thông tin: flex-1 để chiếm trọn phần còn lại thưa ông chủ */}
                <div className="flex flex-1 flex-col gap-1">
                    <TextareaAutosize
                        placeholder={t('cv.education.school_placeholder')}
                        className={`${inputStyle} font-bold text-gray-800 !text-[15px]`}
                        value={localData.school || ''}
                        onChange={(e) => handleChange('school', e.target.value)}
                    />

                    <TextareaAutosize
                        placeholder={t('cv.education.major_placeholder')}
                        className={`${inputStyle} italic text-gray-500`}
                        value={localData.major || ''}
                        onChange={(e) => handleChange('major', e.target.value)}
                    />

                    <TextareaAutosize
                        placeholder={t('cv.education.desc_placeholder')}
                        className={`${inputStyle} mt-1 text-gray-600`}
                        value={localData.description || ''}
                        onChange={(e) => handleChange('description', e.target.value)}
                    />
                </div>
            </div>

            {/* Debug: Chỉ hiện khi hover thưa ông chủ */}
            <div className="mt-4 rounded bg-gray-50 p-2 font-mono text-[10px] text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 no-print">
                <span className="text-blue-400 font-bold uppercase">Debug Education:</span>{' '}
                {JSON.stringify(localData)}
            </div>

            {/* Nút xóa: Cải thiện vị trí để không đè lên text thưa ông chủ */}
            {onDelete && (
                <button
                    onClick={onDelete}
                    className="absolute -left-6 top-10 opacity-0 group-hover:opacity-100 transition-all no-print p-1 bg-red-50 text-red-500 hover:text-red-700 rounded"
                    title={t('cv.common.delete')}
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
