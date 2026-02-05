import { useEffect } from 'react';
import instance from '../config/axios';
import { type CVType } from '../types';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import DocItem from '../components/common/docItem/DocItem';
export default function Profile() {
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
            console.log('danh sach cv lay duoc', data);
        }
    }, [isError, error, data]);

    return (
        <div
            className="flex flex-col lg:flex-row gap-8 container mx-auto lg:px-[120px] px-[20px]"
            style={{}}
        >
            {/* Vùng bên trái: Danh sách CV (Chiếm 2 phần) */}
            <div className="flex flex-wrap bg-white overflow-y-auto p-4 custom-scrollbar gap-8 flex-2">
                {data?.result?.map((item: CVType, index: number) => (
                    <DocItem
                        item={item}
                        key={index}
                        className="lg:w-[200px] lg:h-[300px] md:w-[200px] md:h-[300px] border border-gray-300"
                    />
                ))}
                <div
                    className="p-2 border-bottom cursor-pointer flex items-center justify-center lg:w-[200px] lg:h-[300px] md:w-[200px] md:h-[300px]"
                    style={{ backgroundColor: 'var(--background-default-color)' }}
                    onClick={() => navigate('/tao-cv')}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </div>

            {/* Vùng bên phải: Thông tin & Quy định (Chiếm 1 phần) */}
            <div className="flex flex-col gap-8 flex-1">
                <div className="flex-1 border border-blue-100 bg-white p-6 rounded-lg shadow-sm">
                    {/* Tiêu đề trang trọng */}
                    <div className="flex items-center gap-2 mb-4 border-b border-blue-200 pb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04a11.02 11.02 0 00-2.396 12.261 11.955 11.955 0 0011.014 7.755 11.955 11.955 0 0011.014-7.755 11.02 11.02 0 00-2.396-12.261z"
                            />
                        </svg>
                        <h3 className="text-base font-bold uppercase tracking-tight text-blue-900">
                            Cam kết bảo mật từ Ban sáng lập
                        </h3>
                    </div>

                    {/* Nội dung liệt kê cam kết */}
                    <ul className="space-y-4 text-sm text-gray-700">
                        <li className="flex gap-3">
                            <span className="font-bold text-blue-600">01.</span>
                            <p>
                                <span className="font-semibold text-gray-900">
                                    Bảo mật tuyệt đối:
                                </span>{' '}
                                Dữ liệu cá nhân và nội dung CV của khách hàng được mã hóa và lưu trữ
                                an toàn, cam kết không cung cấp cho bên thứ ba khi chưa có sự đồng
                                ý.
                            </p>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-blue-600">02.</span>
                            <p>
                                <span className="font-semibold text-gray-900">
                                    Quyền sở hữu dữ liệu:
                                </span>{' '}
                                Người dùng có toàn quyền chỉnh sửa, xóa bỏ thông tin cá nhân khỏi hệ
                                thống bất cứ lúc nào.
                            </p>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-blue-600">03.</span>
                            <p>
                                <span className="font-semibold text-gray-900">
                                    Hỗ trợ chính trực:
                                </span>{' '}
                                Đội ngũ kỹ thuật luôn sẵn sàng hỗ trợ xử lý các vấn đề liên quan đến
                                dữ liệu và trải nghiệm người dùng một cách nhanh chóng nhất.
                            </p>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-blue-600">04.</span>
                            <p>
                                <span className="font-semibold text-gray-900">Không spam:</span> Hệ
                                thống cam kết không gửi email quảng cáo rác, chỉ liên lạc khi có
                                thông báo quan trọng về tài khoản hoặc cập nhật hệ thống.
                            </p>
                        </li>
                    </ul>

                    {/* Chân trang thông điệp */}
                    <div className="mt-6 pt-4 border-t border-blue-100 text-center">
                        <p className="text-xs font-medium text-blue-800 italic">
                            "Sự tin tưởng của khách hàng là tài sản lớn nhất của chúng tôi."
                        </p>
                        <p className="mt-1 text-[10px] text-gray-400 uppercase tracking-widest">
                            The Founding Team
                        </p>
                    </div>
                </div>
                <div className="flex-1 border border-blue-100 bg-white p-6 rounded-lg shadow-sm">
                    {/* Tiêu đề trang trọng */}
                    <div className="flex items-center gap-2 mb-4 border-b border-blue-200 pb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <h3 className="text-base font-bold uppercase tracking-tight text-blue-900">
                            Quy định & Điều khoản sử dụng
                        </h3>
                    </div>

                    {/* Nội dung liệt kê quy định */}
                    <ul className="space-y-4 text-sm text-gray-700">
                        <li className="flex gap-3">
                            <span className="font-bold text-blue-600">01.</span>
                            <p>
                                <span className="font-semibold text-gray-900">
                                    Trách nhiệm nội dung:
                                </span>{' '}
                                Người dùng chịu trách nhiệm hoàn toàn về tính xác thực của thông
                                tin. Hệ thống từ chối các nội dung vi phạm pháp luật hoặc thuần
                                phong mỹ tục.
                            </p>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-blue-600">02.</span>
                            <p>
                                <span className="font-semibold text-gray-900">
                                    Bản quyền mẫu (Template):
                                </span>{' '}
                                Các mẫu thiết kế thuộc quyền sở hữu trí tuệ của nền tảng. Người dùng
                                chỉ được sử dụng cho mục đích cá nhân, không sao chép để kinh doanh.
                            </p>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-blue-600">03.</span>
                            <p>
                                <span className="font-semibold text-gray-900">
                                    Lưu trữ dữ liệu:
                                </span>{' '}
                                Hệ thống hỗ trợ lưu nháp tự động. Tuy nhiên, người dùng nên chủ động
                                xuất file PDF để lưu trữ cá nhân một cách an toàn nhất.
                            </p>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-blue-600">04.</span>
                            <p>
                                <span className="font-semibold text-gray-900">
                                    Điều chỉnh dịch vụ:
                                </span>{' '}
                                Ban quản trị có quyền cập nhật các tính năng và điều khoản để nâng
                                cao trải nghiệm mà không cần thông báo trước.
                            </p>
                        </li>
                    </ul>

                    {/* Chân trang thông điệp */}
                    <div className="mt-6 pt-4 border-t border-blue-100 text-right">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                            Cập nhật: 01/02/2026
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
