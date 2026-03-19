import { RoleService } from "@/services/roleService";
import type { FieldConfig } from "./SchemaFormTypes";
export interface CVType {
    id?: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export type UserRole = {
    name: string
    description: string
}

export type UserType = {
    id: number | string
    fullName: string
    email: string
    roles: UserRole // Đây là mảng role như ông chủ vừa gửi
}



export const getUserFields = async (): Promise<FieldConfig[]> => {
    const roles = await RoleService.getRoles();
    console.log(roles, 'roles');

    return [
        {
            name: "fullName",
            label: "Họ và Tên",
            type: "text",
            placeholder: "Nhập họ và tên ứng viên...",
            validation: {
                required: "Họ tên không được để trống thưa ông chủ",
                minLength: { value: 2, message: "Tên quá ngắn ạ" }
            }
        },
        {
            name: "email",
            label: "Địa chỉ Email",
            type: "email",
            placeholder: "example@viecs.com",
            validation: {
                required: "Email là bắt buộc",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email không đúng định dạng"
                }
            }
        },
        {
            name: 'username',
            label: 'Tên đăng nhập',
            type: 'text',
            placeholder: 'Nhập tên đăng nhập...',
            validation: {
                required: 'Tên đăng nhập là bắt buộc',
                minLength: { value: 6, message: 'Tên đăng nhập quá ngắn' }
            }
        },
        {
            name: "password",
            label: "Mật khẩu",
            type: "password",
            placeholder: "Ít nhất 6 ký tự",
            validation: {
                required: "Ông chủ cần đặt mật khẩu cho người này",
                minLength: { value: 6, message: "Mật khẩu phải từ 6 ký tự" }
            }
        },
        {
            name: "roles",
            label: "Vai trò hệ thống",
            type: "select", // Giả định FieldType của ông chủ có hỗ trợ select
            options: roles,
            defaultValue: "candidate",
            validation: { required: "Vui lòng chọn ít nhất một vai trò" }
        }
    ]
};

export const addRoleField: FieldConfig[] = [
    {
        name: "name",
        label: "Tên vai trò",
        type: "text",
        placeholder: "Nhập tên vai trò...",
        validation: {
            required: "Tên vai trò không được để trống thưa ông chủ",
            minLength: { value: 2, message: "Tên vai trò quá ngắn ạ" }
        }
    },
    {
        name: "description",
        label: "Mô tả vai trò",
        type: "text",
        placeholder: "Nhập mô tả vai trò...",
        validation: {
            required: "Mô tả vai trò không được để trống thưa ông chủ",
            minLength: { value: 2, message: "Mô tả vai trò quá ngắn ạ" }
        }
    }
];

export interface RecruiterRegistrationResponse {
    id: string;                // ID của yêu cầu (thường là UUID)
    businessLicenseUrl: string; // Link ảnh giấy phép từ Cloudinary
    status: 'PENDING' | 'APPROVED' | 'REJECTED'; // Trạng thái dùng kiểu String Enum
    userId: string;            // ID của người gửi
    userFullName: string;      // Tên đầy đủ để hiển thị lên bảng
    userEmail: string;         // Email để Admin liên hệ nếu cần
    createdAt: string;         // Ngày gửi (Dạng ISO string từ Backend)
    processedAt?: string;      // Ngày xử lý (có thể null nếu chưa duyệt)
    note?: string;             // Ghi chú của người dùng
}