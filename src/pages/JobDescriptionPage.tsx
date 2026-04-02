import { useQuery } from '@tanstack/react-query';
import instance from '@/config/axios';
import { useParams, Link } from 'react-router-dom';
import { RecruitmentType } from '@/types/RecruitmentType';
import { CompanyType } from '@/types/Company'; // Đảm bảo import đúng file thưa ông chủ
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
    Phone,
    Mail,
    Globe,
    Building2,
} from 'lucide-react';
import { format } from 'date-fns';
import ButtonCustom from '@/components/common/Button';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';

// Định nghĩa kiểu dữ liệu gộp để không bị lỗi thuộc tính thưa ông chủ
interface JobDetailType extends RecruitmentType {
    company?: CompanyType;
}

export default function JobDescriptionPage() {
    const { id } = useParams();
    const [company, setCompany] = useState<CompanyType>();
    const { data: job, isLoading } = useQuery<JobDetailType>({
        queryKey: ['job', id],
        queryFn: async () => {
            const response = await instance.get(`/recruitment/${id}`);

            return response.data.result;
        },
    });

    const handleApply = () => {
        alert('Tính năng ứng tuyển đang được phát triển thưa ông chủ!');
    };

    const getCompanyById = async () => {
        // Chặn ngay lập tức nếu ID chưa tồn tại thưa ông chủ
        if (!job?.company?.id) return;

        try {
            const response = await instance.get(`/company/${job.company.id}`);
            console.log('Thông tin công ty lấy được:', response.data.result);
            setCompany(response.data.result);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết công ty:', error);
        }
    };

    useEffect(() => {
        // Chỉ gọi hàm khi job đã thực sự có dữ liệu thưa ông chủ
        if (job?.company?.id) {
            getCompanyById();
        }
        console.log('Dữ liệu job hiện tại:', job);
    }, [job?.company?.id]); // Chỉ chạy lại khi ID công ty thay đổi thưa ông chủ

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
                    <div className="flex-1 bg-white rounded-lg shadow-sm p-8 border border-slate-200">
                        <div className="flex justify-between items-start mb-6">
                            <div
                                className="border-l-4 pl-4"
                                style={{ borderColor: 'var(--primary-color)' }}
                            >
                                <h1 className="text-2xl font-bold text-slate-800 uppercase">
                                    {job?.title || 'Chi tiết tin tuyển dụng'}
                                </h1>
                            </div>
                            <button
                                className="flex items-center gap-2 text-sm font-medium hover:underline"
                                style={{ color: 'var(--primary-color)' }}
                            >
                                <Send size={16} /> Gửi tôi việc làm tương tự
                            </button>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-3 text-sm">
                                <span className="font-semibold text-slate-700">Yêu cầu:</span>
                                {job?.requirements?.map((req, index) => (
                                    <Badge
                                        key={index}
                                        variant="secondary"
                                        className="bg-[#f2f4f5] text-slate-600 font-normal border-none"
                                    >
                                        {req}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-2 gap-y-3 text-sm">
                                <span className="font-semibold text-slate-700">Quyền lợi:</span>
                                {job?.benefits?.map((benefit, index) => (
                                    <Badge
                                        key={index}
                                        variant="secondary"
                                        className="bg-[#f2f4f5] text-slate-600 font-normal border-none"
                                    >
                                        {benefit}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-2 gap-y-3 text-sm border-b pb-6">
                                <span className="font-semibold text-slate-700">Chuyên môn:</span>
                                {job?.technologies?.map((technology, index) => (
                                    <Badge
                                        key={index}
                                        variant="secondary"
                                        className="bg-[#f2f4f5] font-normal border-none"
                                        style={{ color: 'var(--primary-color)' }}
                                    >
                                        {technology}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-10">
                            <section>
                                <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2">
                                    <MapPin size={20} style={{ color: 'var(--primary-color)' }} />{' '}
                                    Địa điểm làm việc
                                </h3>
                                <div className="flex flex-col gap-2 ml-7">
                                    {job?.workingAt && job.workingAt.length > 0 ? (
                                        job.workingAt.map((loc, index) => (
                                            <div
                                                key={index}
                                                className="text-[15px] text-slate-600 flex items-center gap-2"
                                            >
                                                <span className="h-1 w-1 rounded-full bg-slate-400" />
                                                {loc}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-slate-400 italic text-sm">
                                            Đang cập nhật địa điểm...
                                        </p>
                                    )}
                                </div>
                            </section>

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

                            <section className="bg-slate-50 p-4 rounded-lg flex items-center gap-3 text-sm text-slate-500 italic border border-slate-100">
                                <CalendarDays size={18} style={{ color: 'var(--primary-color)' }} />
                                Hạn nộp hồ sơ:{' '}
                                {job?.expirationDate
                                    ? format(new Date(job.expirationDate), 'dd/MM/yyyy')
                                    : 'Đang cập nhật'}
                            </section>
                        </div>
                    </div>

                    <div className="w-full lg:w-[350px] space-y-6">
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                            <div className="flex items-center gap-3 mb-4">
                                <Building2 size={24} style={{ color: 'var(--primary-color)' }} />
                                <h3 className="font-bold text-lg text-slate-800">
                                    Thông tin công ty
                                </h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Phone size={16} className="mt-1 text-slate-400" />
                                    <div>
                                        <p className="text-[11px] uppercase text-slate-400 font-bold">
                                            Hotline
                                        </p>
                                        <p className="text-sm font-medium text-slate-700">
                                            {company?.phoneNumber || 'Đang cập nhật'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Mail size={16} className="mt-1 text-slate-400" />
                                    <div>
                                        <p className="text-[11px] uppercase text-slate-400 font-bold">
                                            Email
                                        </p>
                                        <p className="text-sm font-medium text-slate-700">
                                            {company?.email || 'Đang cập nhật'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Globe size={16} className="mt-1 text-slate-400" />
                                    <div>
                                        <p className="text-[11px] uppercase text-slate-400 font-bold">
                                            Website
                                        </p>
                                        <a
                                            href={company?.websiteUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm font-medium text-blue-600 hover:underline break-all"
                                        >
                                            {company?.websiteUrl || 'Đang cập nhật'}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-6 h-[1px] bg-slate-100" />

                            <Link
                                to={`/cong-ty/${job?.company?.id}`}
                                className="font-bold text-sm hover:underline flex items-center justify-center w-full gap-2 mt-4"
                                style={{ color: 'var(--primary-color)' }}
                            >
                                Xem trang công ty <MapPin size={14} />
                            </Link>
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
                                            {job?.level}
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
                                            {job?.education}
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
                                            Thời gian làm việc
                                        </p>
                                        <p className="font-semibold text-sm text-slate-700">
                                            {job?.workingTime}
                                        </p>
                                        <p className="text-[11px] text-slate-400 italic">
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
                            <div className="w-full flex justify-center mt-8">
                                <ButtonCustom
                                    name="ỨNG TUYỂN NGAY"
                                    onClick={handleApply}
                                    className="w-full py-6 font-bold shadow-lg shadow-orange-200"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
