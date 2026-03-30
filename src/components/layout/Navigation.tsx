import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/redux';
import { removeUser } from '../../features/modal/userSlice';
import type { RootState } from '../../app/store';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ButtonCustom from '../common/Button';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'; // Import Sheet thưa ông chủ
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Menu as MenuIcon } from 'lucide-react'; // Icon 3 gạch

export function Navigation() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentUser = useSelector((state: RootState) => state.user.user);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        dispatch(removeUser());
        navigate('/');
    };

    const getMenuItems = () => {
        const role = currentUser?.roles?.name;
        const base = [{ name: 'Hồ sơ cá nhân', onClick: () => navigate('/profile') }];
        if (role === 'admin')
            return [...base, { name: 'Quản trị hệ thống', onClick: () => navigate('/admin') }];
        if (role === 'recruiter')
            return [
                ...base,
                { name: 'Quản lý tuyển dụng', onClick: () => navigate('/tuyen-dung') },
            ];
        return [...base, { name: 'Việc làm của tôi', onClick: () => navigate('/my-jobs') }];
    };

    const menuItems = getMenuItems();

    return (
        <header className="lg:px-20 sticky top-0 z-50 w-full border-b bg-white shadow-sm font-sans h-[var(--header-height)]">
            <div className="w-full container flex h-[var(--header-height)] items-center justify-between px-4 md:px-8">
                <div className="flex">
                    {/* --- TRÁI: LOGO --- */}
                    <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                        <div className="text-blue-600 text-3xl">
                            <h5 className="text-4xl font-bold tracking-tighter">
                                <span className="text-blue-600">Viec</span>
                                <span className="text-orange-500">S</span>
                            </h5>
                        </div>
                    </div>

                    {/* --- GIỮA: MENU CHÍNH (ẨN TRÊN MOBILE) --- */}
                    <div className="rounded-0 hidden lg:flex">
                        <NavigationMenu>
                            <div className="rounded-0 hidden lg:flex flex-1 ml-10">
                                <NavigationMenu>
                                    <NavigationMenuList>
                                        <NavigationMenuItem className="!rounded-none">
                                            <NavigationMenuTrigger className="w-full justify-center uppercase text-xs tracking-widest h-[var(--header-height)] !rounded-none bg-transparent">
                                                Việc làm
                                            </NavigationMenuTrigger>

                                            {/* Ông chủ PHẢI có thẻ Content này để điều khiển việc ẩn hiện thưa ông chủ */}
                                            <NavigationMenuContent className="!rounded-none">
                                                <ul className="flex flex-col w-max min-w-[200px] !rounded-none p-2">
                                                    <ListItem href="/jobs" title="Tìm việc làm">
                                                        Cơ hội mới đang chờ ông chủ.
                                                    </ListItem>
                                                    <ListItem href="/categories" title="Ngành nghề">
                                                        Lọc theo chuyên môn.
                                                    </ListItem>
                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>

                                        {/* ITEM 2: CÔNG TY */}
                                        <NavigationMenuItem className="flex-1 min-w-[120px]">
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    to="/companies"
                                                    className={`${navigationMenuTriggerStyle()} !w-full !justify-center !h-[var(--header-height)] !rounded-none uppercase font-bold text-xs tracking-widest bg-transparent`}
                                                >
                                                    Công ty
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>

                                        {/* ITEM 3: CV */}
                                        <NavigationMenuItem className="flex-1 min-w-[120px]">
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    to="/cv"
                                                    className={`${navigationMenuTriggerStyle()} !w-full !justify-center !h-[var(--header-height)] !rounded-none uppercase font-bold text-xs tracking-widest bg-transparent`}
                                                >
                                                    CV
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </div>
                        </NavigationMenu>
                    </div>
                </div>

                {/* --- PHẢI: USER & MOBILE TOGGLE --- */}
                <div className="flex items-center gap-2 lg:gap-6">
                    {/* Desktop User Section */}
                    <div className="hidden lg:flex items-center gap-6">
                        {!currentUser ? (
                            <div className="flex items-center gap-6">
                                <ButtonCustom
                                    name="Đăng ký"
                                    variant="outline"
                                    onClick={() => navigate('/register')}
                                />
                                <ButtonCustom
                                    name="Đăng nhập"
                                    variant="primary"
                                    onClick={() => navigate('/login')}
                                />
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="flex items-center gap-2 px-2 focus-visible:ring-0"
                                        >
                                            <span className="font-bold text-gray-800 uppercase text-sm">
                                                {currentUser.fullName}
                                            </span>
                                            <FontAwesomeIcon
                                                icon={faAngleDown}
                                                className="text-gray-500"
                                            />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-56 mt-2 rounded-sm "
                                        align="end"
                                    >
                                        <DropdownMenuLabel className="uppercase text-[10px] font-bold text-gray-400">
                                            Tài khoản
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {menuItems.map((item, index) => (
                                            <DropdownMenuItem
                                                key={index}
                                                onClick={item.onClick}
                                                className="cursor-pointer font-bold text-xs uppercase py-2"
                                            >
                                                {item.name}
                                            </DropdownMenuItem>
                                        ))}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={handleLogout}
                                            className="cursor-pointer font-bold text-xs uppercase py-2 text-red-600 focus:text-red-600"
                                        >
                                            Đăng xuất
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <div className="flex items-center space-x-3 border-l-2 border-gray-200 pl-4 ml-2">
                                    <div className="flex flex-col">
                                        <p className="text-gray-500 text-[10px] font-light italic leading-none">
                                            Nhà tuyển dụng?
                                        </p>
                                        <a
                                            href="/dang-ky-tuyen-dung"
                                            className="font-bold text-[12px] hover:text-green-600 mt-1"
                                            style={{ color: 'var(--primary-color)' }}
                                        >
                                            Đăng ký ngay
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* MOBILE MENU TOGGLE (CHỈ HIỆN TRÊN MOBILE/TABLET) */}
                    <div>
                        <Sheet>
                            <SheetTrigger asChild className="lg:hidden">
                                <Button variant="ghost" size="icon" className="text-gray-700">
                                    <MenuIcon className="h-8 w-8" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-[300px] sm:w-[400px] overflow-y-auto z-5000"
                            >
                                <SheetHeader className="border-b pb-4"></SheetHeader>

                                <div className="flex flex-col gap-2 mt-6">
                                    {/* 1. DROPDOWN CHO VIỆC LÀM TRÊN MOBILE */}
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="jobs" className="border-none">
                                            <AccordionTrigger className="text-lg font-bold uppercase hover:no-underline py-3 px-0">
                                                Việc làm
                                            </AccordionTrigger>
                                            <AccordionContent className="flex flex-col gap-4 pl-4 pt-2 pb-4">
                                                <Link
                                                    to="/jobs"
                                                    className="text-blue-600 font-bold uppercase text-sm border-l-2 border-blue-600 pl-3"
                                                >
                                                    Tất cả việc làm
                                                </Link>
                                                <Link
                                                    to="/categories"
                                                    className="text-gray-600 font-bold uppercase text-sm border-l-2 border-gray-200 pl-3"
                                                >
                                                    Ngành nghề
                                                </Link>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* 2. CÁC LINK ĐƠN GIẢN KHÁC */}
                                        <div className="py-3 border-b">
                                            <Link
                                                to="/companies"
                                                className="text-lg font-bold uppercase block"
                                            >
                                                Công ty
                                            </Link>
                                        </div>

                                        <div className="py-3 border-b">
                                            <Link
                                                to="/candidates"
                                                className="text-lg font-bold uppercase block"
                                            >
                                                Ứng viên
                                            </Link>
                                        </div>
                                    </Accordion>

                                    {/* 3. PHẦN USER / AUTH SECTION */}
                                    <div className="mt-8">
                                        {!currentUser ? (
                                            <div className="flex flex-col gap-4">
                                                <Button
                                                    variant="outline"
                                                    className="w-full rounded-full font-bold h-12 border-2"
                                                    onClick={() => navigate('/login')}
                                                >
                                                    ĐĂNG NHẬP
                                                </Button>
                                                <Button
                                                    className="w-full bg-[#3498db] rounded-full font-bold h-12 shadow-lg"
                                                    onClick={() => navigate('/register')}
                                                >
                                                    ĐĂNG KÝ
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                <div className="flex flex-col mb-2">
                                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                                                        Xin chào thưa ông chủ
                                                    </p>
                                                    <p className="font-black text-blue-600 uppercase italic text-xl truncate">
                                                        {currentUser.fullName}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col gap-4 mt-2">
                                                    {menuItems.map((item, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={item.onClick}
                                                            className="text-left text-sm font-bold uppercase text-gray-700 hover:text-blue-600 flex items-center gap-2"
                                                        >
                                                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                                                            {item.name}
                                                        </button>
                                                    ))}
                                                </div>

                                                <DropdownMenuSeparator className="bg-gray-200 my-2" />

                                                <button
                                                    onClick={handleLogout}
                                                    className="text-left text-sm font-black uppercase text-red-600 mt-2 flex items-center gap-2"
                                                >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                                                    Đăng xuất hệ thống
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* 4. PHẦN DÀNH CHO NHÀ TUYỂN DỤNG (MOBILE) */}
                                    <div className="mt-10 p-6 bg-blue-50 rounded-xl border-2 border-dashed border-blue-200 text-center">
                                        <p className="text-gray-600 text-xs font-medium mb-2">
                                            Bạn là nhà tuyển dụng?
                                        </p>
                                        <a
                                            href="/dang-ky-tuyen-dung"
                                            className="font-black text-blue-600 uppercase text-sm underline decoration-2 underline-offset-4"
                                        >
                                            Đăng ký ngay thưa ông chủ
                                        </a>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}

function ListItem({ title, children, href }: { title: string; children: string; href: string }) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    to={href}
                    className="block select-none space-y-1 rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100"
                >
                    <div className="text-sm font-bold uppercase text-blue-600 tracking-tight">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1 italic">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}
