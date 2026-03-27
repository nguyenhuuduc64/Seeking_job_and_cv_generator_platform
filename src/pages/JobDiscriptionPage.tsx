import { useQuery } from "@tanstack/react-query";
import instance from "@/config/axios";
import { useParams } from "react-router-dom";
import { JobType } from "@/types/JobType";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, Users, Clock, MapPin } from "lucide-react";

export default function JobDescriptionPage() {
    const { id } = useParams();

    const { data: job, isLoading } = useQuery<JobType>({
        queryKey: ["job", id],
        queryFn: async () => {
            const response = await instance.get(`/recruitment/${id}`);
            return response.data.result;
        },
    });

    if (isLoading) return <div className="p-10"><Skeleton className="h-[500px] w-full" /></div>;

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* --- CỘT TRÁI: CHI TIẾT TIN TUYỂN DỤNG (75%) --- */}
                    <div className="flex-1 bg-white rounded-lg shadow-sm p-8">
                        <div className="border-l-4 border-green-600 pl-4 mb-6">
                            <h1 className="text-2xl font-bold text-gray-800 uppercase">Chi tiết tin tuyển dụng</h1>
                        </div>

                        {/* Tóm tắt nhanh */}
                        <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-600">
                            <p><strong>Yêu cầu:</strong> 3 năm kinh nghiệm</p>
                            <p><strong>Bằng cấp:</strong> Đại học trở lên</p>
                            <p><strong>Quyền lợi:</strong> Nghỉ thứ 7, CN</p>
                        </div>

                        {/* Chuyên môn Tags */}
                        <div className="flex gap-2 mb-8">
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600">Data Scientist</Badge>
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600">IT - Phần mềm</Badge>
                        </div>

                        {/* Nội dung chi tiết */}
                        <div className="space-y-8">
                            <section>
                                <h3 className="font-bold text-lg mb-3">Mô tả công việc</h3>
                                <div className="text-gray-600 whitespace-pre-line text-sm leading-relaxed">
                                    {job?.content || "Nội dung mô tả công việc đang được cập nhật thưa ông chủ..."}
                                </div>
                            </section>

                            <section>
                                <h3 className="font-bold text-lg mb-3">Yêu cầu ứng viên</h3>
                                <div className="h-32 bg-gray-50 rounded-md border border-dashed border-gray-200 flex items-center justify-center text-gray-400 italic">
                                    Vùng trắng: Yêu cầu ứng viên thưa ông chủ
                                </div>
                            </section>

                            <section>
                                <h3 className="font-bold text-lg mb-3">Quyền lợi</h3>
                                <div className="h-24 bg-gray-50 rounded-md border border-dashed border-gray-200 flex items-center justify-center text-gray-400 italic">
                                    Vùng trắng: Quyền lợi thưa ông chủ
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* --- CỘT PHẢI: THÔNG TIN CHUNG & WIDGET (25%) --- */}
                    <div className="w-full lg:w-[350px] space-y-6">

                        {/* Box 1: Xem trang công ty */}
                        <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                            <button className="text-green-600 font-bold text-sm hover:underline">
                                Xem trang công ty ↗
                            </button>
                        </div>

                        {/* Box 2: Thông tin chung */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="font-bold text-lg mb-6 border-b pb-2">Thông tin chung</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-green-600 p-2 rounded-full text-white"><Briefcase size={18} /></div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase">Cấp bậc</p>
                                        <p className="font-bold text-sm">Nhân viên</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-green-600 p-2 rounded-full text-white"><GraduationCap size={18} /></div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase">Học vấn</p>
                                        <p className="font-bold text-sm">Đại học trở lên</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-green-600 p-2 rounded-full text-white"><Users size={18} /></div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase">Số lượng tuyển</p>
                                        <p className="font-bold text-sm">3 người</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-green-600 p-2 rounded-full text-white"><Clock size={18} /></div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase">Hình thức làm việc</p>
                                        <p className="font-bold text-sm">Toàn thời gian</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Box 3: Danh mục/Kỹ năng (Vùng trắng) */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="font-bold text-sm mb-4 text-gray-500 uppercase">Danh mục nghề liên quan</h3>
                            <div className="h-20 bg-gray-50 rounded border border-dashed flex items-center justify-center text-[10px] text-gray-400">
                                Vùng trắng: Danh mục thưa ông chủ
                            </div>
                        </div>

                        {/* Box 4: Tìm việc theo khu vực */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="font-bold text-sm mb-4 text-gray-500 uppercase">Kỹ năng cần có</h3>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="border-green-200 text-green-700">Python</Badge>
                                <Badge variant="outline" className="border-green-200 text-green-700">Machine Learning</Badge>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}