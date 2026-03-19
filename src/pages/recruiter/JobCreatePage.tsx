import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSave,
    faXmark,
    faHeading,
    faMoneyBillWave,
    faPenNib,
    faCircleInfo,
    faBriefcase,
    faLayerGroup
} from "@fortawesome/free-solid-svg-icons";

import instance from "@/config/axios";
import { useNavigate } from "react-router-dom";

export default function JobCreatePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [jobData, setJobData] = useState({
        title: "",
        salary: "",
        content: ""
    });

    const handleSave = async () => {
        if (!jobData.title || !jobData.content) return;
        setLoading(true);
        try {
            await instance.post("/recruitment", jobData);
            navigate("/tuyen-dung/danh-sach");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container max-w-6xl py-8 px-4 mx-auto font-sans">
            {/* Header: Phẳng và Góc cạnh */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-l-4 border-[var(--primary-color)] pl-6">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900">
                        Thiết lập tin tuyển dụng
                    </h1>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                        <FontAwesomeIcon icon={faLayerGroup} className="text-gray-400" />
                        Hệ thống quản trị nội dung tuyển dụng tập trung
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="rounded-sm px-5 border-gray-300 hover:bg-gray-100 uppercase text-xs font-bold"
                    >
                        <FontAwesomeIcon icon={faXmark} className="mr-2" /> Hủy
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={loading}
                        style={{ backgroundColor: 'var(--primary-color)' }}
                        className="rounded-sm px-8 text-white shadow-sm hover:brightness-90 transition-all uppercase text-xs font-bold"
                    >
                        <FontAwesomeIcon icon={faSave} className="mr-2" />
                        {loading ? "Đang xử lý..." : "Lưu tin đăng"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* CỘT CHÍNH: CHIẾM 3/4 */}
                <div className="lg:col-span-3 space-y-6">
                    <Card className="border border-gray-200 rounded-sm shadow-none">
                        <CardHeader className="bg-gray-50/50 border-b p-4">
                            <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider">
                                <FontAwesomeIcon icon={faPenNib} style={{ color: 'var(--primary-color)' }} />
                                Nội dung chi tiết
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-[11px] font-bold uppercase text-gray-400">
                                    Vị trí công việc
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Ví dụ: LẬP TRÌNH VIÊN BACKEND (JAVA/SPRING)..."
                                    value={jobData.title}
                                    onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                                    className="rounded-sm border-gray-300 focus-visible:ring-1 focus-visible:ring-[var(--primary-color)] h-12 font-bold text-gray-800"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content" className="text-[11px] font-bold uppercase text-gray-400">
                                    Mô tả & Yêu cầu chi tiết
                                </Label>
                                <Textarea
                                    id="content"
                                    placeholder="Nhập nội dung công việc tại đây..."
                                    value={jobData.content}
                                    onChange={(e) => setJobData({ ...jobData, content: e.target.value })}
                                    className="min-h-[500px] text-base rounded-sm border-gray-300 focus-visible:ring-1 focus-visible:ring-[var(--primary-color)] resize-none p-4 leading-relaxed"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* CỘT PHỤ: CHIẾM 1/4 */}
                <div className="space-y-6">
                    <Card className="border border-gray-200 rounded-sm shadow-none">
                        <CardHeader className="bg-gray-50/50 border-b p-4">
                            <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider">
                                <FontAwesomeIcon icon={faBriefcase} style={{ color: 'var(--primary-color)' }} />
                                Thông số
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-6">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase text-gray-400">Mức lương</Label>
                                <div className="relative">
                                    <FontAwesomeIcon
                                        icon={faMoneyBillWave}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
                                    />
                                    <Input
                                        placeholder="15 - 20 triệu..."
                                        value={jobData.salary}
                                        onChange={(e) => setJobData({ ...jobData, salary: e.target.value })}
                                        className="pl-9 rounded-sm border-gray-300 h-10 text-sm"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-1 pt-2">
                                    {['Thỏa thuận', 'Cạnh tranh', 'Tới 2000$'].map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="rounded-sm text-[10px] font-bold uppercase cursor-pointer hover:bg-gray-200"
                                            onClick={() => setJobData({ ...jobData, salary: tag })}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            <div className="p-3 bg-gray-900 text-white rounded-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <FontAwesomeIcon icon={faCircleInfo} className="text-[var(--primary-color)] text-xs" />
                                    <span className="text-[11px] font-bold uppercase tracking-widest">Ghi chú</span>
                                </div>
                                <p className="text-[11px] text-gray-400 leading-normal italic">
                                    Tin đăng sẽ được lưu dưới dạng nháp. Ông chủ có thể thay đổi trạng thái trong trang quản lý.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="border border-dashed border-gray-300 p-4 rounded-sm">
                        <p className="text-[10px] text-gray-400 text-center uppercase font-bold">
                            Powered by PiPi System
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}