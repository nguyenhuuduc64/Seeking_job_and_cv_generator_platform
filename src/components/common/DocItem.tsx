import { useEffect } from 'react';
import type { CVType } from '../../types';
import { useNavigate } from 'react-router-dom';
import Resume from './Resume';
import instance from '@/config/axios';
import { useQueryClient } from '@tanstack/react-query';
import { AlertDialogDemo } from './AlertCustom';
interface DocItemProps {
    item: CVType;
    className?: string;
}

export default function DocItem({ item, className }: DocItemProps) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleCvClick = () => {
        navigate(`/tao-cv/${item.id}`);
    };

    const handleDelete = async () => {
        try {
            await instance.delete(`/cvs/${item.id}`);
            // Làm mới kho dữ liệu ngay lập tức thưa ông chủ
            queryClient.invalidateQueries({ queryKey: ['cvs'] });
        } catch (error) {
            console.log('Lỗi xóa thưa ông chủ:', error);
        }
    };

    return (
        <div
            onClick={handleCvClick}
            className={`${className} relative cursor-pointer overflow-hidden border border-gray-100 hover:border-blue-400 transition-all`}
        >
            <div className="relative">
                {/* Lớp phủ chặn click vào nội dung Resume thưa ông chủ */}
                <div className="absolute inset-0 z-10 bg-transparent" />

                <Resume
                    cvData={item.content as any}
                    onItemsChange={() => {}}
                    styles={{ transform: 'scale(0.4)', transformOrigin: 'top center' }}
                />
            </div>

            {/* Chỉ dùng DUY NHẤT AlertDialogDemo ở đây thưa ông chủ */}
            <div onClick={(e) => e.stopPropagation()} className="cursor-pointer">
                <AlertDialogDemo
                    className="absolute bottom-2 right-2 z-20 "
                    buttonName="Xóa"
                    message="Bạn chắc chắn muốn xóa CV này chứ?"
                    onSubmit={handleDelete}
                />
            </div>
        </div>
    );
}
