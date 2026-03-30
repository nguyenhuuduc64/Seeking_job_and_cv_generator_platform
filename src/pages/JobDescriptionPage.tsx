import { useQuery } from '@tanstack/react-query';
import instance from '@/config/axios';
import { useParams } from 'react-router-dom';
import { RecruitmentType } from '@/types/RecruitmentType';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
    Briefcase,
    GraduationCap,
    Clock,
    CalendarDays,
    DollarSign,
    MapPin,
    Send,
} from 'lucide-react';
import { format } from 'date-fns';

export default function JobDescriptionPage() {
    const { id } = useParams();

    const { data: job, isLoading } = useQuery<RecruitmentType>({
        queryKey: ['job', id],
        queryFn: async () => {
            const response = await instance.get(`/recruitment/${id}`);
            return response.data.result;
        },
    });

    if (isLoading)
        return (
            <div className="max-w-7xl mx-auto p-10 space-y-4">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-[600px] w-full" />
            </div>
        );

    return (
        <div className="bg-[#f4f5f5] min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* --- CỘT TRÁI: CHI TIẾT (75%) --- */}
                    <div className="flex-1 bg-white rounded-lg shadow-sm p-8 border border-slate-200">
                        {/* Tiêu đề chính thưa ông chủ */}
                        <div className="flex justify-between items-start mb-6">
                            <div
                                className="border-l-4 pl-4"
                                style={{ borderColor: 'var(--primary-color)' }}
                            >
                                <h1 className="text-2xl font-bold text-slate-800 uppercase">
                                    Chi tiết tin tuyển dụng
                                </h1>
                            </div>
                            <button
                                className="flex items-center gap-2 text-sm font-medium hover:underline"
                                style={{ color: 'var(--primary-color)' }}
                            >
                                <Send size={16} /> Gửi tôi việc làm tương tự
                            </button>
                        </div>

                        {/* Nhóm Badge tóm tắt thưa ông chủ */}
                        <div className="space-y-4 mb-8">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-3 text-sm">
                                <span className="font-semibold text-slate-700">Yêu cầu:</span>
                                <Badge
                                    variant="secondary"
                                    className="bg-[#f2f4f5] text-slate-600 font-normal border-none"
                                >
                                    Không yêu cầu kinh nghiệm
                                </Badge>
                                <Badge
                                    variant="secondary"
                                    className="bg-[#f2f4f5] text-slate-600 font-normal border-none"
                                >
                                    Đại học trở lên
                                </Badge>
                                <button
                                    className="hover:underline ml-1"
                                    style={{ color: 'var(--primary-color)' }}
                                >
                                    Xem chi tiết Yêu cầu
                                </button>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-2 gap-y-3 text-sm">
                                <span className="font-semibold text-slate-700">Quyền lợi:</span>
                                <Badge
                                    variant="secondary"
                                    className="bg-[#f2f4f5] text-slate-600 font-normal border-none"
                                >
                                    Bảo hiểm xã hội
                                </Badge>
                                <Badge
                                    variant="secondary"
                                    className="bg-[#f2f4f5] text-slate-600 font-normal border-none"
                                >
                                    Team building
                                </Badge>
                                <button
                                    className="hover:underline ml-1"
                                    style={{ color: 'var(--primary-color)' }}
                                >
                                    Xem chi tiết Quyền lợi
                                </button>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-2 gap-y-3 text-sm border-b pb-6">
                                <span className="font-semibold text-slate-700">Chuyên môn:</span>
                                <Badge
                                    variant="secondary"
                                    className="bg-[#f2f4f5] font-normal border-none"
                                    style={{ color: 'var(--primary-color)' }}
                                >
                                    IT - Phần mềm
                                </Badge>
                                <Badge
                                    variant="secondary"
                                    className="bg-[#f2f4f5] font-normal border-none"
                                    style={{ color: 'var(--primary-color)' }}
                                >
                                    ReactJS / Spring Boot
                                </Badge>
                            </div>
                        </div>

                        {/* Nội dung chi tiết thưa ông chủ */}
                        <div className="space-y-10">
                            <section>
                                <h3 className="font-bold text-lg mb-4 text-slate-800">
                                    Mô tả công việc
                                </h3>
                                <div
                                    className="prose prose-slate max-w-none text-[15px] leading-relaxed text-slate-600"
                                    dangerouslySetInnerHTML={{
                                        __html: job?.content || '<p>Đang cập nhật...</p>',
                                    }}
                                />
                            </section>

                            {job?.requirements && (
                                <section>
                                    <h3 className="font-bold text-lg mb-4 text-slate-800">
                                        Yêu cầu ứng viên
                                    </h3>
                                    <ul className="space-y-3">
                                        {job.requirements.map((req, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start gap-2 text-[15px] text-slate-600"
                                            >
                                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            <section className="bg-slate-50 p-4 rounded-lg flex items-center gap-3 text-sm text-slate-500 italic border border-slate-100">
                                <CalendarDays size={18} style={{ color: 'var(--primary-color)' }} />
                                Hạn nộp hồ sơ:{' '}
                                {job?.expirationDate
                                    ? format(new Date(job.expirationDate), 'dd/MM/yyyy')
                                    : 'Đang cập nhật'}
                            </section>
                        </div>
                    </div>

                    {/* --- CỘT PHẢI: WIDGET (25%) --- */}
                    <div className="w-full lg:w-[350px] space-y-6">
                        <div className="bg-white rounded-lg shadow-sm p-4 text-center border border-slate-200">
                            <button
                                className="font-bold text-sm hover:underline flex items-center justify-center w-full gap-2"
                                style={{ color: 'var(--primary-color)' }}
                            >
                                Xem trang công ty <MapPin size={14} />
                            </button>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                            <h3 className="font-bold text-lg mb-6 text-slate-800">
                                Thông tin chung
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="p-2 rounded-full text-white"
                                        style={{ backgroundColor: 'var(--primary-color)' }}
                                    >
                                        <Briefcase size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase">Cấp bậc</p>
                                        <p className="font-semibold text-sm text-slate-700">
                                            Nhân viên / Senior
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div
                                        className="p-2 rounded-full text-white"
                                        style={{ backgroundColor: 'var(--primary-color)' }}
                                    >
                                        <GraduationCap size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase">Học vấn</p>
                                        <p className="font-semibold text-sm text-slate-700">
                                            Đại học trở lên
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div
                                        className="p-2 rounded-full text-white"
                                        style={{ backgroundColor: 'var(--primary-color)' }}
                                    >
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase">
                                            Hình thức làm việc
                                        </p>
                                        <p className="font-semibold text-sm text-slate-700">
                                            {job?.workingTime}
                                        </p>
                                        <p className="text-[11px] text-slate-400">
                                            ({job?.workingDay})
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div
                                        className="p-2 rounded-full text-white"
                                        style={{ backgroundColor: 'var(--primary-color)' }}
                                    >
                                        <DollarSign size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase">
                                            Mức lương
                                        </p>
                                        <p
                                            className="font-semibold text-sm"
                                            style={{ color: 'var(--primary-color)' }}
                                        >
                                            {job?.salary}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="w-full mt-8 text-white font-bold py-3 rounded-md transition-opacity hover:opacity-90 shadow-lg shadow-emerald-100"
                                style={{ backgroundColor: 'var(--primary-color)' }}
                            >
                                ỨNG TUYỂN NGAY
                            </button>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                            <h3 className="font-bold text-[13px] mb-4 text-slate-500 uppercase tracking-tight">
                                Danh mục Nghề liên quan
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <Badge
                                    variant="outline"
                                    className="bg-[#f4f5f5] border-none text-slate-600 font-normal"
                                >
                                    IT / Phần mềm
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-[#f4f5f5] border-none text-slate-600 font-normal"
                                >
                                    Full-stack
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
