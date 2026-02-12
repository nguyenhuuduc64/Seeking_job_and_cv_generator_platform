import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import uploadImageToCloudinary from '../../../utils/uploadToCloudinary';
import { useBlockEditor } from '@/hook/useBlockEditor';
import { EditorContent } from '@tiptap/react';
import Toolbar from '@/components/common/toolbar/Toolbar';

// --- TYPES ---
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
    // --- 1. STATE MANAGEMENT ---
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
            avatarUrl: 'https://res.cloudinary.com/dnecovspp/image/upload/v1754741468/luan_van/x2z5q2q2q2q2q2q2q2q2.jpg',
        }
    );

    // --- 2. TIPTAP EDITOR (Chỉ cho Họ tên) ---
    const editor = useBlockEditor(
        localData.fullName || '',
        'Họ và tên...',
        (html) => {
            const newData = { ...localData, fullName: html };
            setLocalData(newData); // Cập nhật local để các phần khác không mất
            if (onDataChange) onDataChange(newData);
        }
    );

    // Cập nhật localData nếu props data từ ngoài đổi (quan trọng thưa ông chủ)
    useEffect(() => {
        if (data) setLocalData(data);
    }, [data]);

    const handleChange = (field: keyof PersonalInfoData, value: string) => {
        const newData = { ...localData, [field]: value };
        setLocalData(newData);
        if (onDataChange) onDataChange(newData);
    };

    const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = await uploadImageToCloudinary(file);
            const newData = { ...localData, avatarUrl: url };
            setLocalData(newData);
            if (onDataChange) onDataChange(newData);
        }
    }

    const inputStyle = "flex-1 border-none bg-transparent py-1 text-sm text-gray-600 outline-none focus:ring-0 resize-none overflow-hidden placeholder:text-gray-300 ";
    const printTextStyle = "hidden flex-1 py-1 text-sm text-gray-600 ";

    if (!editor) return null;

    return (
        <div className="group relative mb-10 flex w-full flex-col gap-6 bg-white p-4 md:flex-row print:flex-row print:gap-8 print:mb-6">

            {/* Toolbar xuất hiện khi hover vào vùng thông tin cá nhân */}
            <div className="no-print absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-md rounded border bg-white">
                <Toolbar editor={editor} />
            </div>

            {/* --- BÊN TRÁI: AVATAR --- */}
            <div className="flex shrink-0 justify-center md:block">
                <div className="relative h-44 w-36 overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
                    {localData.avatarUrl ? (
                        <>
                            <img src={localData.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                            <input type='file' className='absolute inset-0 opacity-0 cursor-pointer no-print' onChange={handleUploadFile} />
                        </>
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-50">
                            <input type='file' onChange={handleUploadFile} />
                        </div>
                    )}
                </div>
            </div>

            {/* --- BÊN PHẢI: THÔNG TIN --- */}
            <div className="flex flex-1 flex-col gap-1">

                {/* Họ tên: Đã thay Textarea bằng EditorContent thưa ông chủ */}
                <div className="prose prose-2xl max-w-none text-black leading-tight">
                    <EditorContent editor={editor} />
                </div>

                <div className="mt-4 flex flex-col gap-1.5">
                    {[
                        { label: 'Ngày sinh:', field: 'dob' },
                        { label: 'Giới tính:', field: 'gender' },
                        { label: 'Điện thoại:', field: 'phone' },
                        { label: 'Email:', field: 'email' },
                        { label: 'Địa chỉ:', field: 'address' },
                    ].map((item) => (
                        <div key={item.field} className="flex items-start border-b border-transparent">
                            <span className="w-28 text-sm font-bold text-black shrink-0 py-1">{item.label}</span>

                            <TextareaAutosize
                                className={inputStyle}
                                value={(localData as any)[item.field]}
                                onChange={(e) => handleChange(item.field as any, e.target.value)}
                            />

                            <p className={printTextStyle}>
                                {(localData as any)[item.field]}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Nút xóa */}
            {onDelete && (
                <button onClick={onDelete} className="no-print absolute -right-2 -top-2 hidden group-hover:block bg-red-500 rounded-full p-1 text-white shadow-lg">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default PersonalInfoInputBlock;