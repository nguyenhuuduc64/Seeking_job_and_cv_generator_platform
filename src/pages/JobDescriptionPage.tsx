import { useQuery } from '@tanstack/react-query';
import instance from '@/config/axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { RecruitmentType } from '@/types/RecruitmentType';
import { CompanyType } from '@/types/Company';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import ButtonCustom from '@/components/common/Button';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';

// Import FontAwesome thưa ông chủ
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPaperPlane,
    faLocationDot,
    faCalendarCheck,
    faPhone,
    faEnvelope,
    faGlobe,
    faBriefcase,
    faUserGraduate,
    faClock,
    faCircleDollarToSlot,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-regular-svg-icons';

interface JobDetailType extends RecruitmentType {
    company?: CompanyType;
}

export default function JobDescriptionPage() {
    const { id } = useParams();
    const [company, setCompany] = useState<CompanyType>();
    const navigate = useNavigate();
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
        if (!job?.company?.id) return;
        try {
            const response = await instance.get(`/company/${job.company.id}`);
            setCompany(response.data.result);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết công ty:', error);
        }
    };

    useEffect(() => {
        if (job?.company?.id) {
            getCompanyById();
        }
    }, [job?.company?.id]);

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
                                className="flex items-center gap-2 text-sm font-medium hover:underline cursor-pointer"
                                style={{ color: 'var(--primary-color)' }}
                                onClick={() => navigate(`/chat/tin-tuyen-dung/${job?.id}`)}
                            >
                                <FontAwesomeIcon icon={faMessage} /> Chat với nhà tuyển dụng
                            </button>
                        </div>

                        {/* Yêu cầu, Quyền lợi, Chuyên môn thưa ông chủ */}
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
                            {/* ... (Các phần Badge khác giữ nguyên thưa ông chủ) */}
                        </div>

                        <div className="space-y-10">
                            <section>
                                <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2">
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        style={{ color: 'var(--primary-color)' }}
                                    />{' '}
                                    Địa điểm làm việc
                                </h3>
                                <div className="flex flex-col gap-2 ml-7">
                                    {job?.workingAt?.map((loc, index) => (
                                        <div
                                            key={index}
                                            className="text-[15px] text-slate-600 flex items-center gap-2"
                                        >
                                            <span className="h-1 w-1 rounded-full bg-slate-400" />
                                            {loc}
                                        </div>
                                    ))}
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
                                <FontAwesomeIcon
                                    icon={faCalendarCheck}
                                    style={{ color: 'var(--primary-color)' }}
                                />
                                Hạn nộp hồ sơ:{' '}
                                {job?.expirationDate
                                    ? format(new Date(job.expirationDate), 'dd/MM/yyyy')
                                    : 'Đang cập nhật'}
                            </section>
                        </div>
                    </div>

                    {/* Cột phải thưa ông chủ */}
                    <div className="w-full lg:w-[350px] space-y-6">
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                            <h3 className="font-bold text-lg text-slate-800 mb-4">
                                Thông tin công ty
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <FontAwesomeIcon
                                        icon={faPhone}
                                        className="mt-1 text-slate-400 w-4"
                                    />
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
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                        className="mt-1 text-slate-400 w-4"
                                    />
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
                                    <FontAwesomeIcon
                                        icon={faGlobe}
                                        className="mt-1 text-slate-400 w-4"
                                    />
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
                                Xem trang công ty{' '}
                                <FontAwesomeIcon icon={faChevronRight} size="sm" />
                            </Link>
                        </div>

                        {/* Thông tin chung thưa ông chủ */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                            <h3 className="font-bold text-lg mb-6 text-slate-800">
                                Thông tin chung
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-9 h-9 flex items-center justify-center rounded-full text-white text-sm"
                                        style={{ backgroundColor: 'var(--primary-color)' }}
                                    >
                                        <FontAwesomeIcon icon={faBriefcase} />
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
                                        className="w-9 h-9 flex items-center justify-center rounded-full text-white text-sm"
                                        style={{ backgroundColor: 'var(--primary-color)' }}
                                    >
                                        <FontAwesomeIcon icon={faUserGraduate} />
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
                                        className="w-9 h-9 flex items-center justify-center rounded-full text-white text-sm"
                                        style={{ backgroundColor: 'var(--primary-color)' }}
                                    >
                                        <FontAwesomeIcon icon={faClock} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase">
                                            Thời gian
                                        </p>
                                        <p className="font-semibold text-sm text-slate-700">
                                            {job?.workingTime}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-9 h-9 flex items-center justify-center rounded-full text-white text-sm"
                                        style={{ backgroundColor: 'var(--primary-color)' }}
                                    >
                                        <FontAwesomeIcon icon={faCircleDollarToSlot} />
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
                            <ButtonCustom
                                name="ỨNG TUYỂN NGAY"
                                onClick={handleApply}
                                className="w-full mt-8 py-6 font-bold shadow-lg shadow-orange-200"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
