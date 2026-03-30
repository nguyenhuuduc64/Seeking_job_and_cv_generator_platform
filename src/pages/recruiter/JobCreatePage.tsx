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
    faCircleInfo,
    faClock,
    faCalendarAlt,
    faListCheck,
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
import { Calendar } from '@/components/ui/calendar';
import React from 'react';

export default function JobCreatePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [recruitment, setRecruitment] = useState<RecruitmentType>({
        title: '',
        salary: '',
        content: '',
        categoryId: '',
        companyId: '',
        requirements: [], // List<String>
        workingDay: '', // String
        workingTime: '', // String
        expirationDate: '',
    });
    const [date, setDate] = useState<Date | undefined>(new Date());
    const editor = useEditor({
        extensions: [StarterKit, Placeholder.configure({ placeholder: 'Nội dung chi tiết...' })],
        content: recruitment.content,
        onUpdate: ({ editor }) =>
            setRecruitment((prev) => ({ ...prev, content: editor.getHTML() })),
        editorProps: {
            attributes: { class: 'min-h-[400px] focus:outline-none p-4 prose max-w-none' },
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

    const handleSave = async () => {
        if (!recruitment.title || !recruitment.content || recruitment.content === '<p></p>') return;
        setLoading(true);
        console.log('Dữ liệu gửi đi nè ông chủ:', recruitment);
        try {
            await instance.post('/recruitment', recruitment);
            navigate('/tuyen-dung/tin-da-dang');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-8 px-4 mx-auto bg-white w-full">
            <div className="flex justify-between mb-8">
                <div className="flex gap-2">
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
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-6">
                    <Card className="border-gray-200 rounded-sm shadow-none">
                        <CardHeader className="bg-gray-50/50 border-b p-4">
                            <CardTitle className="text-sm font-bold uppercase tracking-wider">
                                Nội dung chi tiết
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[11px] font-bold uppercase text-gray-400">
                                        Danh mục
                                    </Label>
                                    <SelectCustom
                                        items={categories}
                                        onValueChange={(v) =>
                                            setRecruitment({ ...recruitment, categoryId: v })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[11px] font-bold uppercase text-gray-400">
                                        Vị trí
                                    </Label>
                                    <Input
                                        value={recruitment.title}
                                        onChange={(e) =>
                                            setRecruitment({
                                                ...recruitment,
                                                title: e.target.value,
                                            })
                                        }
                                        className="rounded-sm h-10"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[11px] font-bold uppercase text-gray-400">
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
                                            className="pl-9 rounded-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[11px] font-bold uppercase text-gray-400">
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
                                            className="pl-9 rounded-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase text-gray-400">
                                    Yêu cầu nhanh (Ngăn cách bằng dấu phẩy)
                                </Label>
                                <div className="relative">
                                    <FontAwesomeIcon
                                        icon={faListCheck}
                                        className="absolute left-3 top-3 text-gray-400 text-xs"
                                    />
                                    <Input
                                        placeholder="Kinh nghiệm 2 năm, Tiếng Anh tốt..."
                                        onChange={(e) =>
                                            setRecruitment({
                                                ...recruitment,
                                                requirements: e.target.value
                                                    .split(',')
                                                    .map((s) => s.trim()),
                                            })
                                        }
                                        className="pl-9 rounded-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase text-gray-400">
                                    Mô tả chi tiết
                                </Label>
                                <div className="group relative border border-gray-300 rounded-sm">
                                    <div className="absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-md border bg-white">
                                        {editor && <Toolbar editor={editor} />}
                                    </div>
                                    <EditorContent editor={editor} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="border-gray-200 rounded-sm shadow-none">
                        <CardHeader className="bg-gray-50/50 border-b p-4">
                            <CardTitle className="text-sm font-bold uppercase tracking-wider">
                                Thông số
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase text-gray-400">
                                    Mức lương
                                </Label>
                                <div className="relative">
                                    <FontAwesomeIcon
                                        icon={faMoneyBillWave}
                                        className="absolute left-3 top-3 text-gray-400 text-xs"
                                    />
                                    <Input
                                        placeholder="Lương..."
                                        value={recruitment.salary}
                                        onChange={(e) =>
                                            setRecruitment({
                                                ...recruitment,
                                                salary: e.target.value,
                                            })
                                        }
                                        className="pl-9 rounded-sm h-10"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-1 pt-2">
                                    {['Thỏa thuận', 'Cạnh tranh', 'Tới 2000$'].map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="rounded-sm text-[10px] uppercase cursor-pointer"
                                            onClick={() =>
                                                setRecruitment({ ...recruitment, salary: tag })
                                            }
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase text-gray-400">
                                    Ngày hết hạn
                                </Label>
                                <input
                                    type="date"
                                    onChange={(e) => {
                                        const val = e.target.value;

                                        const dateObj = new Date(val);
                                        setRecruitment({
                                            ...recruitment,
                                            expirationDate: dateObj.toISOString(),
                                        });
                                    }}
                                    className="border p-2 rounded-md" // Thêm tí CSS cho đỡ xấu thưa ông chủ
                                />
                            </div>
                            <Separator />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
