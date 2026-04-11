export interface RecruitmentType {
    id: string;
    title: string;
    salary: string;
    content: string;
    categoryId: string;
    companyId: string;

    requirements: string[];
    workingDay: string;
    workingTime: string;
    expirationDate: string;
    benefits: string[];
    technologies: string[];
    level: string;
    education: string;
    workingAt: string[];
}

export interface LikeStoreType {
    recruitments: RecruitmentType[];
}
import { FieldConfig } from '@/types/SchemaFormTypes';

export const recruitmentSchema: FieldConfig[] = [
    {
        name: 'title',
        label: 'Tiêu đề tuyển dụng',
        type: 'text',
        placeholder: 'VD: Senior Frontend Developer',
        validation: { required: 'Không được để trống tiêu đề thưa ông chủ' },
    },
    {
        name: 'salary',
        label: 'Mức lương',
        type: 'text',
        placeholder: 'VD: 15 - 20 triệu hoặc Thỏa thuận',
        validation: { required: 'Nhập mức lương để thu hút ứng viên thưa ông chủ' },
    },
    {
        name: 'categoryId',
        label: 'Danh mục công việc',
        type: 'select',
        placeholder: 'Chọn ngành nghề...',
        options: [
            { label: 'Công nghệ thông tin', value: 'it' },
            { label: 'Marketing', value: 'marketing' },
            // Sau này ông chủ truyền categories từ API vào đây thưa ông chủ
        ],
        validation: { required: 'Chọn danh mục thưa ông chủ' },
    },
    {
        name: 'level',
        label: 'Cấp bậc',
        type: 'text',
        placeholder: 'Nhập cấp bậc ',
    },
    {
        name: 'workingDay',
        label: 'Ngày làm việc',
        type: 'text',
        placeholder: 'Thứ 2 - Thứ 6',
    },
    {
        name: 'workingTime',
        label: 'Giờ làm việc',
        type: 'text',
        placeholder: '08:00 - 17:30',
    },
    {
        name: 'expirationDate',
        label: 'Ngày hết hạn',
        type: 'text', // Hoặc ông chủ thêm type 'date' vào FieldType thưa ông chủ
        placeholder: 'YYYY-MM-DD',
    },
    {
        name: 'content',
        label: 'Mô tả chi tiết',
        type: 'editor',
        placeholder: 'Nhập mô tả công việc...',
        className: 'md:col-span-2', // Nếu ông chủ dùng grid
    },
];
