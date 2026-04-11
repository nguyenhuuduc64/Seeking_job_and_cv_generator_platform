import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Send, Paperclip, Smile } from 'lucide-react';

export default function ChatPage() {
    return (
        <div className="flex h-screen bg-white border rounded-lg overflow-hidden">
            {/* --- SIDEBAR: Danh sách hội thoại --- */}
            <div className="w-[350px] border-r flex flex-col">
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Tin nhắn</h2>
                    </div>
                    <Input placeholder="Tìm kiếm nhà tuyển dụng..." className="bg-gray-50" />
                </div>

                <ScrollArea className="flex-1">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div
                            key={item}
                            className="flex items-center gap-3 p-4 hover:bg-gray-100 cursor-pointer transition-colors"
                        >
                            <Avatar>
                                <AvatarImage src={`https://avatar.iran.liara.run/public/${item}`} />
                                <AvatarFallback>HR</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold truncate">Công ty Tech ABC</span>
                                    <span className="text-[10px] text-gray-500">10 giờ</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">
                                    Chào bạn, bên mình đã nhận được CV...
                                </p>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </div>

            {/* --- MAIN CHAT: Nội dung nhắn tin --- */}
            <div className="flex-1 flex flex-col bg-gray-50">
                {/* Header nhà tuyển dụng */}
                <div className="p-4 bg-white border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src="https://avatar.iran.liara.run/public/1" />
                        </Avatar>
                        <div>
                            <p className="font-bold text-sm">KTX Hòa An</p>
                            <p className="text-[11px] text-green-500">
                                8 thành viên • Đang hoạt động
                            </p>
                        </div>
                    </div>
                </div>

                {/* Vùng tin nhắn */}
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                        {/* Tin nhắn bên trái (Nhà tuyển dụng) */}
                        <div className="flex gap-2 max-w-[80%]">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://avatar.iran.liara.run/public/2" />
                            </Avatar>
                            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm">
                                Báo cáo LV trong khi không có mặt GVHD thưa ông chủ
                            </div>
                        </div>

                        {/* Tin nhắn bên phải (Ông chủ gửi) thưa ông chủ */}
                        <div className="flex flex-row-reverse gap-2">
                            <div className="bg-[var(--primary-color)] text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm max-w-[80%]">
                                Chào anh, em đã chuẩn bị xong file rồi ạ!
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                {/* Ô nhập liệu (Input Area) */}
                <div className="p-4 bg-white border-t">
                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border">
                        <Button variant="ghost" size="icon" className="text-gray-500">
                            <Smile size={20} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-500">
                            <Paperclip size={20} />
                        </Button>
                        <Input
                            className="border-none bg-transparent focus-visible:ring-0"
                            placeholder="Nhập tin nhắn tới nhà tuyển dụng..."
                        />
                        <Button size="icon" style={{ backgroundColor: 'var(--primary-color)' }}>
                            <Send size={18} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
