import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

// --- 1. TYPES ---
export interface PersonalInfoData {
    fullName?: string;
    position?: string;
    dob?: string;
    gender?: string;
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
    avatarUrl?: string;
}

interface Props {
    data?: PersonalInfoData;
    onDataChange?: (data: PersonalInfoData) => void;
    onDelete?: () => void;
}

const PersonalInfoInputBlock: React.FC<Props> = ({ data, onDataChange, onDelete }) => {
    // --- 2. STATE MANAGEMENT ---
    const [localData, setLocalData] = useState<PersonalInfoData>(
        data || {
            fullName: 'Đức Nguyễn',
            position: 'Vị trí ứng tuyển',
            dob: 'DD/MM/YY',
            gender: 'Nam/Nữ',
            phone: '0123 456 789',
            email: 'duchuuiq@gmail.com',
            website: 'facebook.com/TopCV.vn',
            address: 'Quận A, thành phố Hà Nội',
        }
    );

    const handleChange = (field: keyof PersonalInfoData, value: string) => {
        const newData = { ...localData, [field]: value };
        setLocalData(newData);
        if (onDataChange) onDataChange(newData);
    };

    // Style dùng chung cho các nhãn (Label)
    const labelStyle = 'w-28 text-sm font-bold text-black shrink-0 py-1';
    // Style cho các ô nhập liệu tự giãn
    const inputStyle =
        'flex-1 border-none bg-transparent py-1 text-sm text-gray-600 outline-none focus:ring-0 resize-none overflow-hidden placeholder:text-gray-300';

    return (
        <div className="group relative mb-10 flex w-full flex-col gap-6 bg-white p-4 md:flex-row">
            {/* --- BÊN TRÁI: AVATAR --- */}
            <div className="flex shrink-0 justify-center md:block">
                <div className="relative h-40 w-32 overflow-hidden bg-gray-200 border border-gray-300">
                    {localData.avatarUrl ? (
                        <img
                            src={localData.avatarUrl}
                            alt="Avatar"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <svg
                                className="h-20 w-20 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>
                    )}
                    {/* Input ẩn để thay avatar nếu ông chủ cần sau này */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20 cursor-pointer">
                        <span className="text-[10px] text-white font-bold uppercase">Thay ảnh</span>
                    </div>
                </div>
            </div>

            {/* --- BÊN PHẢI: THÔNG TIN CHI TIẾT --- */}
            <div className="flex flex-1 flex-col gap-1">
                {/* Họ tên & Vị trí */}
                <TextareaAutosize
                    className="w-full border-none bg-transparent p-0 text-2xl font-bold text-black outline-none focus:ring-0 resize-none overflow-hidden"
                    value={localData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="HỌ VÀ TÊN"
                />
                <TextareaAutosize
                    className="mb-2 w-full border-none bg-transparent p-0 text-sm italic text-gray-500 outline-none focus:ring-0 resize-none overflow-hidden"
                    value={localData.position}
                    onChange={(e) => handleChange('position', e.target.value)}
                    placeholder="Vị trí ứng tuyển"
                />

                {/* Các trường thông tin có Label */}
                <div className="flex flex-col gap-0.5">
                    {[
                        { label: 'Ngày sinh:', field: 'dob' as keyof PersonalInfoData },
                        { label: 'Giới tính:', field: 'gender' as keyof PersonalInfoData },
                        { label: 'Số điện thoại:', field: 'phone' as keyof PersonalInfoData },
                        { label: 'Email:', field: 'email' as keyof PersonalInfoData },
                        { label: 'Website:', field: 'website' as keyof PersonalInfoData },
                        { label: 'Địa chỉ:', field: 'address' as keyof PersonalInfoData },
                    ].map((item) => (
                        <div key={item.field} className="flex items-start">
                            <span className={labelStyle}>{item.label}</span>
                            <TextareaAutosize
                                className={inputStyle}
                                value={localData[item.field] as string}
                                onChange={(e) => handleChange(item.field, e.target.value)}
                                placeholder="..."
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* --- DEBUG VIEW & NÚT XÓA --- */}
            <div className="absolute -bottom-6 left-0 text-[10px] font-mono text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-blue-400 font-bold uppercase">Debug Personal Info:</span>{' '}
                {JSON.stringify(localData)}
            </div>

            {onDelete && (
                <button
                    onClick={onDelete}
                    className="absolute -right-2 -top-2 hidden rounded-full bg-red-500 p-1 text-white shadow-md transition-transform hover:scale-110 group-hover:block"
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

export default PersonalInfoInputBlock;
