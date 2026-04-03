import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { setCompanytoStore } from '@/features/modal/companySlice';
// Import Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencil,
    faSave,
    faXmark,
    faBuilding,
    faGlobe,
    faMapMarkerAlt,
    faEnvelope,
    faPhone,
    faCamera,
    faFileLines,
    faHashtag,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Placeholder from '@tiptap/extension-placeholder';
import Toolbar from '@/components/common/toolbar/Toolbar';
import uploadToCloudinary from '@/utils/uploadToCloudinary';
import instance from '@/config/axios';
import { useDispatch, useSelector } from 'react-redux';
import bannerImg from '../../assets/banner.jpg';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const initialData = {
    id: '',
    name: '',
    taxCode: '',
    email: '',
    phoneNumber: '',
    websiteUrl: '',
    address: [''],
    logoUrl: '',
    banner: '',
    description: '',
};

export default function CompanyDetailPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [company, setCompany] = useState(initialData);
    const user = useSelector((state: any) => state.user.user);
    const dispatch = useDispatch();

    const handleGetCompany = async () => {
        if (!user?.id) return;
        try {
            const response = await instance.get(`/company/user/${user.id}`);
            console.log('cong ty hien tai: ', response.data.result);
            setCompany(response.data.result);
        } catch (error) {
            console.error('Lỗi lấy dữ liệu:', error);
        }
    };

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({ placeholder: 'Nội dung chi tiết công việc...' }),
        ],
        content: company.description,
        onUpdate: ({ editor }) =>
            setCompany((prev) => ({ ...prev, description: editor.getHTML() })),
        editorProps: {
            attributes: { class: 'min-h-[300px] focus:outline-none p-4 prose max-w-none' },
        },
    });

    useEffect(() => {
        handleGetCompany();
    }, [user?.id]);

    const handleSave = async () => {
        try {
            const response = await instance.put(`/company/${company.id}`, company);
            if (response.data) {
                setCompany(response.data.result);
                setIsEditing(false);
                dispatch(setCompanytoStore(response.data.result));
                alert('Cập nhật thành công thưa ông chủ!');
            }
        } catch (error) {
            console.error('Lỗi lưu dữ liệu:', error);
            alert('Lỗi rồi, ông chủ kiểm tra lại nhé!');
        }
    };

    const handleUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        field: 'logoUrl' | 'banner'
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const uploadedUrl = await uploadToCloudinary(file);
            setCompany((prev) => ({ ...prev, [field]: uploadedUrl }));
        } catch (error) {
            alert('Upload ảnh thất bại!');
        }
    };

    return (
        <div className="p-4 max-w-5xl mx-auto space-y-6 font-sans text-gray-800">
            {/* PHẦN BANNER & LOGO */}
            <Card className="rounded-sm border-none shadow-md overflow-hidden bg-white">
                <div
                    className="h-48 w-full relative bg-gray-200"
                    style={{
                        backgroundImage: `url(${bannerImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {isEditing && (
                        <label className="absolute bottom-2 right-2 bg-black/60 p-2 px-3 text-white cursor-pointer rounded-sm hover:bg-black/80 transition-all text-sm flex items-center gap-2">
                            <FontAwesomeIcon icon={faCamera} /> Thay đổi Banner
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => handleUpload(e, 'banner')}
                            />
                        </label>
                    )}

                    <div className="absolute -bottom-10 left-8 flex items-end gap-4">
                        <div className="w-32 h-32 bg-white border-4 border-white shadow-md rounded-sm overflow-hidden relative group">
                            <img
                                src={company.logoUrl || 'https://via.placeholder.com/150'}
                                className="w-full h-full object-contain"
                                alt="Logo"
                            />
                            {isEditing && (
                                <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                                    <FontAwesomeIcon
                                        icon={faCamera}
                                        className="text-white text-2xl"
                                    />
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => handleUpload(e, 'logoUrl')}
                                    />
                                </label>
                            )}
                        </div>
                        <div className="mb-2 bg-white/90 p-1 px-4 rounded-sm shadow-sm border border-gray-100">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {company.name || 'Tên công ty'}
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="pt-14 pb-6 px-8 flex justify-end gap-2 bg-white">
                    {!isEditing ? (
                        <Button
                            onClick={() => setIsEditing(true)}
                            style={{ backgroundColor: 'var(--primary-color)' }}
                            className="rounded-sm text-white px-6 shadow-sm"
                        >
                            <FontAwesomeIcon icon={faPencil} className="mr-2" /> Chỉnh sửa
                        </Button>
                    ) : (
                        <>
                            <Button
                                onClick={handleSave}
                                style={{ backgroundColor: 'var(--primary-color)' }}
                                className="rounded-sm text-white px-6 shadow-sm"
                            >
                                <FontAwesomeIcon icon={faSave} className="mr-2" /> Lưu thay đổi
                            </Button>
                            <Button
                                onClick={() => setIsEditing(false)}
                                variant="outline"
                                className="rounded-sm border-gray-300 px-6"
                            >
                                <FontAwesomeIcon icon={faXmark} className="mr-2" /> Hủy
                            </Button>
                        </>
                    )}
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* CỘT TRÁI: LIÊN HỆ */}
                <div className="space-y-6">
                    <Card className="rounded-sm shadow-sm border-gray-100">
                        <CardHeader className="p-4 border-b bg-gray-50/50">
                            <CardTitle
                                className="text-base flex items-center gap-2 font-bold"
                                style={{ color: 'var(--primary-color)' }}
                            >
                                <FontAwesomeIcon icon={faPhone} /> Liên hệ & Pháp lý
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            <div className="space-y-1.5">
                                <Label className="text-gray-500 flex items-center gap-2 text-xs uppercase tracking-wider">
                                    <FontAwesomeIcon icon={faHashtag} size="xs" /> Mã số thuế
                                </Label>
                                <Input
                                    disabled={!isEditing}
                                    value={company.taxCode}
                                    onChange={(e) =>
                                        setCompany({ ...company, taxCode: e.target.value })
                                    }
                                    className="rounded-sm focus-visible:ring-[var(--primary-color)] bg-white"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-gray-500 flex items-center gap-2 text-xs uppercase tracking-wider">
                                    <FontAwesomeIcon icon={faEnvelope} size="xs" /> Email
                                </Label>
                                <Input
                                    disabled={!isEditing}
                                    value={company.email}
                                    onChange={(e) =>
                                        setCompany({ ...company, email: e.target.value })
                                    }
                                    className="rounded-sm bg-white"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-gray-500 flex items-center gap-2 text-xs uppercase tracking-wider">
                                    <FontAwesomeIcon icon={faPhone} size="xs" /> Hotline
                                </Label>
                                <Input
                                    disabled={!isEditing}
                                    value={company.phoneNumber}
                                    onChange={(e) =>
                                        setCompany({ ...company, phoneNumber: e.target.value })
                                    }
                                    className="rounded-sm bg-white"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-gray-500 flex items-center gap-2 text-xs uppercase tracking-wider">
                                    <FontAwesomeIcon icon={faGlobe} size="xs" /> Website
                                </Label>
                                <Input
                                    disabled={!isEditing}
                                    value={company.websiteUrl}
                                    onChange={(e) =>
                                        setCompany({ ...company, websiteUrl: e.target.value })
                                    }
                                    className="rounded-sm bg-white"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* CỘT PHẢI: THÔNG TIN CHI TIẾT */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="rounded-sm shadow-sm border-gray-100">
                        <CardHeader className="p-4 border-b bg-gray-50/50">
                            <CardTitle
                                className="text-base flex items-center gap-2 font-bold"
                                style={{ color: 'var(--primary-color)' }}
                            >
                                <FontAwesomeIcon icon={faBuilding} /> Thông tin doanh nghiệp
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 bg-white">
                            <div className="space-y-2">
                                <Label className="font-bold text-sm text-gray-700">
                                    Tên doanh nghiệp chính thức
                                </Label>
                                <Input
                                    disabled={!isEditing}
                                    value={company.name}
                                    onChange={(e) =>
                                        setCompany({ ...company, name: e.target.value })
                                    }
                                    className="rounded-sm text-lg font-bold border-gray-200 focus:border-[var(--primary-color)]"
                                />
                            </div>

                            <div className="space-y-3">
                                <Label className="flex items-center gap-2 font-bold text-sm text-gray-700">
                                    <FontAwesomeIcon
                                        icon={faMapMarkerAlt}
                                        style={{ color: 'var(--primary-color)' }}
                                    />
                                    Địa chỉ các trụ sở ({company.address?.length || 0})
                                </Label>

                                <div className="space-y-2">
                                    {company.address?.map((addr, index) => (
                                        <div key={index} className="flex gap-2 items-center">
                                            <Input
                                                disabled={!isEditing}
                                                value={addr}
                                                placeholder={`Địa chỉ trụ sở ${index + 1}`}
                                                onChange={(e) => {
                                                    const newAddresses = [...company.address];
                                                    newAddresses[index] = e.target.value;
                                                    setCompany({
                                                        ...company,
                                                        address: newAddresses,
                                                    });
                                                }}
                                                className="rounded-sm border-gray-200 flex-1"
                                            />

                                            {isEditing && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    type="button"
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 h-9 w-9"
                                                    onClick={() => {
                                                        const newAddresses = company.address.filter(
                                                            (_, i) => i !== index
                                                        );
                                                        setCompany({
                                                            ...company,
                                                            address: newAddresses,
                                                        });
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                        className="text-sm"
                                                    />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {isEditing && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        type="button"
                                        className="w-full border-dashed border-gray-300 text-gray-600 hover:text-[var(--primary-color)] hover:border-[var(--primary-color)]"
                                        onClick={() => {
                                            setCompany({
                                                ...company,
                                                address: [...(company.address || []), ''],
                                            });
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPlus} className="mr-2 text-xs" />{' '}
                                        Thêm trụ sở mới
                                    </Button>
                                )}
                            </div>

                            <Separator className="bg-gray-100" />

                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 font-bold text-sm text-gray-700">
                                    <FontAwesomeIcon
                                        icon={faFileLines}
                                        style={{ color: 'var(--primary-color)' }}
                                    />{' '}
                                    Hồ sơ năng lực / Giới thiệu
                                </Label>
                                <CardContent className="p-0">
                                    <div className="group relative">
                                        <div className="border-b bg-gray-50 p-2">
                                            {editor && <Toolbar editor={editor} />}
                                        </div>
                                        <EditorContent editor={editor} className="min-h-[300px]" />
                                    </div>
                                </CardContent>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
