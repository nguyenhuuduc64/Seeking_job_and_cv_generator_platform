import { useState } from "react";
import ButtonCustom from "@/components/common/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
// Font Awesome Icons
import { RecruitmentType } from "@/types/RecruitmentType";
import { useQuery } from "@tanstack/react-query";
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
import { SelectCustom } from "@/components/common/SelectCustom";
import { setPointerCapture } from "konva/lib/PointerEvents";

export default function JobCreatePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [recruitment, setRecruitment] = useState<RecruitmentType>({
        title: "",
        salary: "",
        content: "",
        categoryId: "",
        companyId: ""
    });
    const { data, isLoading, isError } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await instance.get("/job-category");
            setCategories(response.data.result);
        }
    });
    const handleSave = async () => {
        if (!recruitment.title || !recruitment.content) return;
        setLoading(true);
        console.log("noi dung tin tuyen dung: ", recruitment)
        try {
            await instance.post("/recruitment", recruitment);
            navigate("/tuyen-dung/tin-da-dang");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-8 px-4 mx-auto bg-white w-full">
            {/* Header: Phẳng và Góc cạnh */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">

                <div className="flex items-center gap-2">
                    <ButtonCustom
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        name="Hủy"
                        icon={faXmark}
                    />

                    <ButtonCustom
                        onClick={handleSave}
                        name="Lưu tin đăng"
                        icon={faSave}
                    />

                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* CỘT CHÍNH: CHIẾM 3/4 */}
                <div className="lg:col-span-3 space-y-6">
                    <Card className="border border-gray-200 rounded-sm shadow-none">
                        <CardHeader className="bg-gray-50/50 border-b p-4">
                            <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider">
                                Nội dung chi tiết
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-[11px] font-bold uppercase text-gray-400">
                                    Thiết lập danh mục
                                </Label>
                                <SelectCustom items={categories} classNames="w-full max-w-48" onValueChange={(value) => setRecruitment({ ...recruitment, categoryId: value })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-[11px] font-bold uppercase text-gray-400">
                                    Vị trí công việc
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Ví dụ: LẬP TRÌNH VIÊN BACKEND (JAVA/SPRING)..."
                                    value={recruitment.title}
                                    onChange={(e) => setRecruitment({ ...recruitment, title: e.target.value })}
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
                                    value={recruitment.content}
                                    onChange={(e) => setRecruitment({ ...recruitment, content: e.target.value })}
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
                                        value={recruitment.salary}
                                        onChange={(e) => setRecruitment({ ...recruitment, salary: e.target.value })}
                                        className="pl-9 rounded-sm border-gray-300 h-10 text-sm"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-1 pt-2">
                                    {['Thỏa thuận', 'Cạnh tranh', 'Tới 2000$'].map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="rounded-sm text-[10px] font-bold uppercase cursor-pointer hover:bg-gray-200"
                                            onClick={() => setRecruitment({ ...recruitment, salary: tag })}
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


                </div>
            </div>
        </div>
    );
}