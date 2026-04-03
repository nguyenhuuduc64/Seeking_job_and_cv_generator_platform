import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import instance from '@/config/axios';
import { CompanyType } from '@/types/Company';
import { RecruitmentType } from '@/types/RecruitmentType';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Building2,
    Globe,
    Users,
    Heart,
    Plus,
    MapPin,
    Search,
    DollarSign,
    Clock3,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ButtonCustom from '@/components/common/Button';
import JobCard from '@/components/common/JobCard';
import bannerImg from '../assets/banner.jpg';

export default function CompanyPage() {
    const { companyId } = useParams<{ companyId: string }>();

    // 1. Lấy thông tin chi tiết công ty thưa ông chủ
    const { data: company, isLoading: isCompanyLoading } = useQuery<CompanyType>({
        queryKey: ['company', companyId],
        queryFn: async () => {
            const response = await instance.get(`/company/${companyId}`);
            return response.data.result;
        },
        enabled: !!companyId,
    });

    const { data: jobs, isLoading: isJobsLoading } = useQuery<RecruitmentType[]>({
        queryKey: ['company-jobs', companyId],
        queryFn: async () => {
            const response = await instance.get(`/recruitment/company/${companyId}`);
            console.log('thong tin danh sach job', response.data.result);
            return response.data.result;
        },
        enabled: !!companyId,
    });

    if (isCompanyLoading) {
        return (
            <div className="max-w-[1280px] mx-auto p-8 space-y-6">
                <Skeleton className="h-[200px] w-full rounded-2xl" />
                <Skeleton className="h-[500px] w-full" />
            </div>
        );
    }

    return (
        <div className="bg-[#F2F4F7] min-h-screen py-8">
            <div className="max-w-[1280px] mx-auto px-6">
                {/* 1. Header Công ty (Giống mẫu thưa ông chủ) */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-100 mb-8 overflow-hidden">
                    <div className="h-[180px]  relative">
                        <img src={bannerImg} alt="Banner" className="w-full h-full object-cover" />
                    </div>

                    <div className="p-8 relative flex flex-col md:flex-row gap-8 items-start -mt-16">
                        {/* Logo công ty thưa ông chủ */}
                        <div className="h-[140px] w-[140px] bg-white rounded-lg border-4 border-white shadow-lg flex items-center justify-center overflow-hidden shrink-0 z-10 p-2">
                            {company?.logoUrl ? (
                                <img
                                    src={company.logoUrl}
                                    alt={company.name}
                                    className="object-contain w-full h-full"
                                />
                            ) : (
                                <Building2 size={70} className="text-slate-300" />
                            )}
                        </div>

                        {/* Thông tin chính thưa ông chủ */}
                        <div className="flex-1 mt-4 md:mt-0 pt-10">
                            <h1 className="text-3xl font-extrabold text-slate-900 uppercase leading-tight tracking-tight">
                                {company?.name || 'CÔNG TY TNHH ESTELLE VIỆT NAM'}
                            </h1>
                            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-4 text-slate-600 text-[15px]">
                                <span className="flex items-center gap-2 group">
                                    <Globe
                                        size={18}
                                        className="text-slate-400 group-hover:text-emerald-500"
                                    />
                                    <a
                                        href={company?.websiteUrl}
                                        target="_blank"
                                        className="hover:text-emerald-600 hover:underline"
                                    >
                                        {company?.websiteUrl || 'https://estelle.vn'}
                                    </a>
                                </span>
                                <span className="flex items-center gap-2">
                                    <Users size={18} className="text-slate-400" />
                                    100-499 nhân viên
                                </span>
                                <span className="flex items-center gap-2 text-slate-500 italic">
                                    <Heart size={18} className="text-emerald-400" />
                                    45 người theo dõi
                                </span>
                            </div>
                        </div>

                        {/* Nút theo dõi thưa ông chủ */}
                        <div className="mt-6 md:mt-0 pt-10">
                            <ButtonCustom name="Theo dõi" />
                        </div>
                    </div>
                </div>

                {/* 2. Phần nội dung chính (2 cột thưa ông chủ) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    {/* Cột Trái thưa ông chủ */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Khối Giới thiệu công ty thưa ông chủ */}
                        <div className="bg-white rounded-lg p-8 border border-slate-100 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <span className="h-6 w-1.5 bg-[var(--primary-color)] rounded-lg" />
                                Giới thiệu công ty
                            </h3>
                            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-[15px]">
                                {company?.description ? (
                                    <div
                                        dangerouslySetInnerHTML={{ __html: company.description }}
                                    />
                                ) : (
                                    <p>
                                        Công ty TNHH ESTELLE Việt Nam là công ty 100% vốn đầu tư
                                        Nhật Bản, Chuyên sản xuất, gia công, bán các đồ trang sức
                                        bạc, vàng, bạch kim và đá quý các loại...
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Khối Tin tuyển dụng (Khối mới thưa ông chủ) */}
                        <div className="bg-white rounded-lg p-8 border border-slate-100 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <span className="h-6 w-1.5 bg-[var(--primary-color)] rounded-lg" />
                                Tuyển dụng
                            </h3>

                            {/* Thanh tìm kiếm tin tuyển dụng thưa ông chủ */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <div className="relative flex-1">
                                    <Search
                                        size={18}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <Input
                                        placeholder="Tên công việc, vị trí ứng tuyển..."
                                        className="pl-10 h-11 bg-white"
                                    />
                                </div>
                                <div className="relative w-full sm:w-[220px]">
                                    <MapPin
                                        size={18}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <Input
                                        placeholder="Tất cả tỉnh/thành phố..."
                                        className="pl-10 h-11 bg-white"
                                    />
                                </div>
                                <Button className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] h-11 px-8 font-bold text-[15px]">
                                    Tìm kiếm
                                </Button>
                            </div>

                            {/* Danh sách tin tuyển dụng thưa ông chủ */}
                            {isJobsLoading ? (
                                <div className="space-y-4">
                                    <Skeleton className="h-32 w-full rounded-lg" />
                                    <Skeleton className="h-32 w-full rounded-lg" />
                                </div>
                            ) : jobs && jobs.length > 0 ? (
                                <div className="space-y-4">
                                    {jobs.map((job) => (
                                        <JobCard job={job} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-slate-500 border-2 border-dashed border-slate-100 rounded-lg bg-slate-50">
                                    <Building2 size={40} className="mx-auto text-slate-300 mb-4" />
                                    Hiện tại công ty chưa có tin tuyển dụng nào
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Cột Phải thưa ông chủ */}
                    <div className="space-y-8">
                        {/* Khối Thông tin liên hệ (Giống mẫu thưa ông chủ) */}
                        <div className="bg-white rounded-lg p-6 border border-slate-100 shadow-sm sticky top-6">
                            <h3 className="text-[17px] font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <span className="h-6 w-1.5 bg-[var(--primary-color)] rounded-lg" />
                                Thông tin liên hệ
                            </h3>
                            <div className="space-y-5 text-[15px]">
                                <p className="flex items-start gap-3 text-slate-700">
                                    <MapPin
                                        size={20}
                                        className="text-[var(--primary-color)] mt-0.5 shrink-0"
                                    />
                                    <span>
                                        <span className="font-bold text-slate-800 block mb-1">
                                            Địa chỉ công ty
                                        </span>
                                        {company?.address?.[0] ||
                                            'Hải Phòng - Hà Nội - Hồ Chí Minh'}
                                    </span>
                                </p>

                                <Separator className="bg-slate-100" />

                                <div className="flex items-center gap-2.5">
                                    <img
                                        src="/google_maps_icon.png"
                                        alt="Map"
                                        className="h-5 w-5"
                                    />
                                    <span className="font-bold text-slate-800">Xem bản đồ</span>
                                </div>
                                <img
                                    src="/map_estelle.png"
                                    alt="Bản đồ"
                                    className="w-full rounded-lg border border-slate-100 mt-3 shadow-inner"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
