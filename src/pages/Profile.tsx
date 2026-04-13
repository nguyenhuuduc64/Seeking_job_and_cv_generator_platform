import { useEffect } from 'react';
import instance from '../config/axios';
import { type CVType } from '../types';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import DocItem from '../components/common/DocItem';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Badge } from '@/components/ui/badge';
import { Mail, ShieldCheck, User } from 'lucide-react';
import { ArrowUpCircle, CheckCircle2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
export default function Profile() {
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user.user);

    //ham lay danh sach cv
    const { data, isError, error } = useQuery({
        queryKey: ['cvs'], // Key duy nhất để định danh dữ liệu này trong bộ nhớ đệm
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
        console.log('user', user);
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
                        className="lg:w-[200px] lg:h-[283px] md:w-[200px] md:h-[283px] w-[150px] h-[212px] border border-gray-300 shadow-sm overflow-hidden bg-white relative group"
                    />
                ))}
                <div
                    className="p-2 border-[2px] cursor-pointer flex items-center justify-center lg:w-[200px] lg:h-[300px] md:w-[200px] md:h-[300px]"
                    style={{
                        backgroundColor: 'var(--background-default-color)',
                        borderImageSource:
                            'linear-gradient(to bottom right, rgba(37, 99, 235, 1), rgba(249, 115, 22, 0.5))',
                        borderImageSlice: 1,
                    }}
                    onClick={() => navigate('/tao-cv')}
                >
                    <FontAwesomeIcon icon={faPlus} className="text-2xl text-blue-600" />
                </div>
            </div>

            {/* Vùng bên phải: Thông tin & Quy định (Chiếm 1 phần) */}
            <div className="flex flex-col gap-8 flex-1 h-100vh">
                <Card className="w-full h-full max-w-md border-none shadow-md bg-white overflow-hidden">
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                        <div className="relative">
                            <Avatar className="h-20 w-20 border-2 border-gray-100">
                                <AvatarImage
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                                />
                                <AvatarFallback>{user.fullName?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <Badge className="absolute -top-2 -right-2 bg-gray-500 text-[10px] text-white py-0 px-1">
                                VERIFIED
                            </Badge>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm text-gray-500">Chào bạn trở lại,</p>
                            <h3 className="text-xl font-bold text-gray-900">{user.fullName}</h3>
                            <Badge className="w-fit bg-gray-100 text-gray-600 hover:bg-gray-200 border-none text-[11px]">
                                Tài khoản đã xác thực
                            </Badge>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="h-8 mt-1 text-xs bg-gray-100 hover:bg-gray-200"
                            >
                                <ArrowUpCircle className="w-3 h-3 mr-1" /> Nâng cấp tài khoản
                            </Button>
                        </div>
                    </CardHeader>

                    <Separator className="my-2" />

                    <CardContent className="grid gap-6 pt-4">
                        {/* Phần Switch Tìm việc thưa ông chủ */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Switch id="job-status" />
                                    <label htmlFor="job-status" className="font-bold text-gray-600">
                                        Đang Tắt tìm việc
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-3 px-1">
                                <p className="text-xs text-gray-400 font-medium uppercase">
                                    Khi bật tìm việc:
                                </p>
                                <div className="flex gap-2 items-start">
                                    <CheckCircle2 className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" />
                                    <p className="text-xs text-gray-500">
                                        Nhà tuyển dụng có thể{' '}
                                        <span className="font-bold text-gray-700">tìm thấy</span> và
                                        mang đến cho bạn những cơ hội hấp dẫn.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Phần Switch cho phép NTD tìm kiếm thưa ông chủ */}
                        <div className="flex flex-col gap-3 bg-green-50/50 p-3 rounded-lg border border-green-100">
                            <div className="flex items-center gap-3">
                                <Switch
                                    id="allow-search"
                                    defaultChecked
                                    className="data-[state=checked]:bg-[var(--primary-color)]"
                                />
                                <label
                                    htmlFor="allow-search"
                                    className="font-bold text-[var(--primary-color)]"
                                >
                                    Cho phép NTD tìm kiếm hồ sơ
                                </label>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Bạn đang cho phép Nhà tuyển dụng (NTD) tìm kiếm hồ sơ để tiếp cận
                                thông tin kinh nghiệm, kỹ năng... trên CV của bạn.
                            </p>
                        </div>

                        {/* Thông tin liên hệ cũ thưa ông chủ */}
                        <div className="grid gap-2 pt-2">
                            <div className="flex items-center text-sm text-gray-600">
                                <Mail className="w-4 h-4 mr-3 text-gray-400" />
                                {user.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-500 italic">
                                <ShieldCheck className="w-4 h-4 mr-3 text-blue-400" />
                                {user.roles?.description}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
