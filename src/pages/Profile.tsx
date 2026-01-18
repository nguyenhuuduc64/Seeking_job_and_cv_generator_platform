import { useEffect } from 'react';
import instance from '../config/axios';
import { useSelector } from 'react-redux';
import { type CVType } from '../types';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
export default function Profile() {
    const currentUser = useSelector((state: any) => state.user.user);
    const navigate = useNavigate();
    //ham lay danh sach cv
    const { data, isError, error } = useQuery({
        queryKey: ['users'], // Key duy nhất để định danh dữ liệu này trong bộ nhớ đệm
        queryFn: () => instance.get('/cvs').then((res) => res.data),
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (isError) {
            console.log(error);
        }
        if (data) {
            console.log(data);
        }
    }, [isError, error, data]);

    return (
        <div
            className="flex flex-col lg:flex-row gap-8 container mx-auto lg:px-[120px] px-[20px] h-auto lg:h-[calc(100vh-200px)]"
            style={{}}
        >
            {/* Vùng bên trái: Danh sách CV (Chiếm 2 phần) */}
            <div className="flex-[2] border border-gray-300 bg-white overflow-y-auto p-4 custom-scrollbar">
                {data?.data?.map((item: CVType) => (
                    <div key={item.id} className="p-2 border-bottom">
                        {item.id}
                    </div>
                ))}
                <div
                    className="p-2 border-bottom cursor-pointer flex items-center justify-center lg:w-3/12 lg:h-1/2"
                    style={{ backgroundColor: 'var(--background-default-color)' }}
                    onClick={() => navigate('/tao-cv')}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </div>

            {/* Vùng bên phải: Thông tin & Quy định (Chiếm 1 phần) */}
            <div className="flex flex-col gap-8 flex-1">
                <div className="flex-1 border border-gray-300 bg-white p-4">
                    {currentUser?.name}
                </div>
                <div className="flex-1 border border-gray-300 bg-white p-4">
                    vung noi dung quy dinh
                </div>
            </div>
        </div>
    );
}
