export const loadingState = `
    <span class="ai-loading-placeholder" contenteditable="false" style="
        display: inline-flex;
        align-items: center;
        background: #f0f7ff;
        color: #0369a1;
        border: 1px solid #bae6fd;
        border-radius: 20px;
        padding: 2px 12px;
        font-size: 13px;
        margin-left: 8px;
        vertical-align: middle;
    ">
        <span style="margin-right: 6px;">⌛</span>
        Đang phân tích kỹ thuật...
    </span>
`;

export const dataCv = [
    {
        id: 'edu-1',
        type: 'EDUCATION',
        data: {
            period: '2020 - 2024',
            school: 'Đại học Bách Khoa',
            major: 'Công nghệ thông tin',
            description: 'Tốt nghiệp loại Giỏi, GPA 3.6/4.0',
        },
    },

    {
        id: 'per-1',
        type: 'PERSONAL_INFO',
        data: {
            fullName: 'Nguyễn Hữu Đức',
            gender: 'Nam',
            email: 'duc.nguyen@example.com',
            phone: '0123456789',
            address: 'Cần Thơ, Việt Nam',
        },
    },

    {
        id: 'obj-1',
        type: 'OBJECTIVE',
        data: {
            content:
                'Mục tiêu của tôi là trở thành một Fullstack Developer chuyên nghiệp, đóng góp giá trị cho dự án và không ngừng học hỏi công nghệ mới.',
        },
    },

    {
        id: 'exp-1',
        type: 'EXPERIENCE',
        data: {
            title: 'KINH NGHIỆM LÀM VIỆC',
            // Chuyển về dạng list để ExperienceInputBlock không bị lỗi .map()
            list: [
                {
                    period: '2024 - Hiện tại',
                    company: 'Công ty Công nghệ ABC',
                    position: 'Junior Web Developer',
                    description:
                        'Phát triển các tính năng phía Frontend bằng React.js và tối ưu hóa hiệu suất API bằng Spring Boot.',
                },
            ],
        },
    },
    {
        id: 'cert-1',
        type: 'CERTIFICATE',
        data: {
            title: 'CHỨNG CHỈ',
            list: [
                { time: '2024', name: 'Chứng chỉ AWS Certified Developer' },
                { time: '2023', name: 'TOEIC 750' },
            ],
        },
    },
    {
        id: 'skill-1',
        type: 'SKILLS',
        data: {
            title: 'KỸ NĂNG',
            list: [
                { name: 'ReactJS', level: '80%' },
                { name: 'Java Spring Boot', level: '75%' },
            ],
        },
    },
];
