import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSave,
    faXmark,
    faMoneyBillWave,
    faClock,
    faCalendarAlt,
    faListCheck,
    faGraduationCap,
    faLayerGroup,
    faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';

import ButtonCustom from '@/components/common/Button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SelectCustom } from '@/components/common/SelectCustom';
import Toolbar from '@/components/common/toolbar/Toolbar';
import instance from '@/config/axios';
import { RecruitmentType } from '@/types/RecruitmentType';
import { useSelector } from 'react-redux';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { CompanyType } from '@/features/modal/companySlice';

export default function JobCreatePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const user = useSelector((state: any) => state.user.user);

    const [recruitment, setRecruitment] = useState<RecruitmentType>({
        id: '',
        title: '',
        salary: '',
        content: '',
        categoryId: '',
        companyId: '',
        requirements: [],
        workingDay: '',
        workingTime: '',
        expirationDate: '',
        benefits: [],
        technologies: [],
        level: '',
        education: '',
        workingAt: [],
    });

    const { data: company } = useQuery<CompanyType>({
        queryKey: ['company', user?.id],
        queryFn: async () => {
            const response = await instance.get(`/company/user/${user.id}`);
            return response.data.result;
        },
        enabled: !!user?.id,
    });

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({ placeholder: 'Nội dung chi tiết công việc...' }),
        ],
        content: recruitment.content,
        onUpdate: ({ editor }) =>
            setRecruitment((prev) => ({ ...prev, content: editor.getHTML() })),
        editorProps: {
            attributes: { class: 'min-h-[300px] focus:outline-none p-4 prose max-w-none' },
        },
    });

    useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await instance.get('/job-category');
            setCategories(res.data.result);
            return res.data.result;
        },
    });

    const handleAddLocation = (location: string) => {
        if (!recruitment.workingAt.includes(location)) {
            setRecruitment({
                ...recruitment,
                workingAt: [...recruitment.workingAt, location],
            });
        }
    };

    const handleRemoveLocation = (location: string) => {
        setRecruitment({
            ...recruitment,
            workingAt: recruitment.workingAt.filter((item) => item !== location),
        });
    };

    const handleSave = async () => {
        if (!recruitment.title || !recruitment.content || recruitment.content === '<p></p>') return;
        if (!company?.id) {
            alert('Lỗi: Không tìm thấy thông tin công ty thưa ông chủ!');
            return;
        }

        setLoading(true);
        try {
            const payload = { ...recruitment, companyId: company.id };
            await instance.post(`/recruitment`, payload);
            navigate('/tuyen-dung/tin-da-dang');
        } catch (error) {
            console.error(error);
            alert('Lưu thất bại, ông chủ kiểm tra lại dữ liệu nhé!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-sm shadow-sm border border-gray-200">
                <h1 className="text-xl font-bold text-gray-800">Tạo tin tuyển dụng mới</h1>
                <div className="flex gap-3">
                    <ButtonCustom
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        name="Hủy"
                        icon={faXmark}
                    />
                    <ButtonCustom
                        onClick={handleSave}
                        name={loading ? 'Đang lưu...' : 'Lưu tin đăng'}
                        icon={faSave}
                        className="bg-[var(--primary-color)] hover:opacity-90"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-6">
                    <Card className="border-gray-200 rounded-sm shadow-sm overflow-hidden">
                        <CardHeader className="bg-gray-50 border-b p-4">
                            <CardTitle className="text-xs font-bold uppercase">
                                Thông tin cơ bản
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[11px] font-bold uppercase text-gray-500">
                                        Tiêu đề vị trí <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        placeholder="VD: Senior Java Developer"
                                        value={recruitment.title}
                                        onChange={(e) =>
                                            setRecruitment({
                                                ...recruitment,
                                                title: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[11px] font-bold uppercase text-gray-500">
                                        Danh mục ngành nghề
                                    </Label>
                                    <SelectCustom
                                        items={categories}
                                        onValueChange={(v) =>
                                            setRecruitment({ ...recruitment, categoryId: v })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[11px] font-bold uppercase text-gray-500">
                                        Ngày làm việc
                                    </Label>
                                    <div className="relative">
                                        <FontAwesomeIcon
                                            icon={faCalendarAlt}
                                            className="absolute left-3 top-3 text-gray-400 text-xs"
                                        />
                                        <Input
                                            placeholder="Thứ 2 - Thứ 6"
                                            value={recruitment.workingDay}
                                            onChange={(e) =>
                                                setRecruitment({
                                                    ...recruitment,
                                                    workingDay: e.target.value,
                                                })
                                            }
                                            className="pl-9"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[11px] font-bold uppercase text-gray-500">
                                        Giờ làm việc
                                    </Label>
                                    <div className="relative">
                                        <FontAwesomeIcon
                                            icon={faClock}
                                            className="absolute left-3 top-3 text-gray-400 text-xs"
                                        />
                                        <Input
                                            placeholder="08:00 - 17:30"
                                            value={recruitment.workingTime}
                                            onChange={(e) =>
                                                setRecruitment({
                                                    ...recruitment,
                                                    workingTime: e.target.value,
                                                })
                                            }
                                            className="pl-9"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-[11px] font-bold uppercase text-gray-500 flex items-center gap-2">
                                    <FontAwesomeIcon
                                        icon={faMapMarkerAlt}
                                        className="text-[var(--primary-color)]"
                                    />
                                    Địa điểm làm việc
                                </Label>
                                <Select onValueChange={handleAddLocation}>
                                    <SelectTrigger className="w-full rounded-sm h-10">
                                        <SelectValue placeholder="Chọn địa điểm từ danh sách công ty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {company?.address?.map((addr, index) => (
                                            <SelectItem key={index} value={addr}>
                                                {addr}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {recruitment.workingAt.map((loc, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="flex items-center gap-2 py-1.5 bg-blue-50 text-blue-700"
                                        >
                                            <span className="text-[12px]">{loc}</span>
                                            <FontAwesomeIcon
                                                icon={faXmark}
                                                className="cursor-pointer"
                                                onClick={() => handleRemoveLocation(loc)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200 rounded-sm shadow-sm overflow-hidden">
                        <CardHeader className="bg-gray-50 border-b p-4">
                            <CardTitle className="text-xs font-bold uppercase">
                                Yêu cầu & Kỹ năng
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold">Yêu cầu ứng viên</Label>
                                    <Input
                                        placeholder="Kinh nghiệm, Ngoại ngữ..."
                                        onChange={(e) =>
                                            setRecruitment({
                                                ...recruitment,
                                                requirements: e.target.value
                                                    .split(',')
                                                    .map((s) => s.trim()),
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold">Quyền lợi</Label>
                                    <Input
                                        placeholder="BHXH, Du lịch..."
                                        onChange={(e) =>
                                            setRecruitment({
                                                ...recruitment,
                                                benefits: e.target.value
                                                    .split(',')
                                                    .map((s) => s.trim()),
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold">Tags Công nghệ</Label>
                                    <Input
                                        placeholder="Java, ReactJS..."
                                        onChange={(e) =>
                                            setRecruitment({
                                                ...recruitment,
                                                technologies: e.target.value
                                                    .split(',')
                                                    .map((s) => s.trim()),
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200 rounded-sm shadow-sm">
                        <CardHeader className="bg-gray-50 border-b p-4">
                            <CardTitle className="text-xs font-bold uppercase">
                                Mô tả chi tiết
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="group relative">
                                <div className="border-b bg-gray-50 p-2">
                                    {editor && <Toolbar editor={editor} />}
                                </div>
                                <EditorContent editor={editor} className="min-h-[300px]" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="border-gray-200 rounded-sm shadow-sm sticky top-6">
                        <CardHeader className="bg-gray-50 border-b p-4">
                            <CardTitle className="text-xs font-bold uppercase">Thông số</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-5">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase text-gray-400 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faMoneyBillWave} /> Mức lương
                                </Label>
                                <Input
                                    placeholder="VD: 15 - 20 triệu"
                                    value={recruitment.salary}
                                    onChange={(e) =>
                                        setRecruitment({ ...recruitment, salary: e.target.value })
                                    }
                                />
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {['Thỏa thuận', 'Cạnh tranh'].map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="text-[9px] cursor-pointer"
                                            onClick={() =>
                                                setRecruitment({ ...recruitment, salary: tag })
                                            }
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase text-gray-400 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faLayerGroup} /> Cấp bậc
                                </Label>
                                <Input
                                    placeholder="VD: Nhân viên, Senior"
                                    value={recruitment.level}
                                    onChange={(e) =>
                                        setRecruitment({ ...recruitment, level: e.target.value })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase text-gray-400 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faGraduationCap} /> Học vấn
                                </Label>
                                <Input
                                    placeholder="VD: Đại học"
                                    value={recruitment.education}
                                    onChange={(e) =>
                                        setRecruitment({
                                            ...recruitment,
                                            education: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase text-gray-400 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faCalendarAlt} /> Hạn nộp
                                </Label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-200 p-2 rounded-sm text-sm"
                                    onChange={(e) =>
                                        setRecruitment({
                                            ...recruitment,
                                            expirationDate: new Date(e.target.value).toISOString(),
                                        })
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
