import Home from '../pages/Home';
import Resume from '../pages/ResumeGeneratePage';
import Profile from '../pages/Profile';
import LoginPage from '../pages/LoginPage';
import LoginPageTest from '@/pages/LoginPageTest';
import RegisterPage from '../pages/RegisterPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '@/pages/admin/UserManagement';
import DetailUser from '@/pages/admin/DetailUser';
import CVDesigner from '@/components/template/CVDesigner';
import RoleManagermentPage from '@/pages/admin/RoleManagermentPage';
import RecruiterPage from '@/pages/recruiter/RecruiterPage';
import RecruiterRegistrationpage from '@/pages/RecruiterRegistrationpage';
import ConfirmPage from '@/pages/admin/ConfirmPage';
import CompanyDetailPage from '@/pages/recruiter/CompanyDetailPage';
import JobManagementPage from '@/pages/recruiter/JobManagementPage';
import JobCreatePage from '@/pages/recruiter/JobCreatePage';
import JobCategoryPage from '@/pages/admin/JobCategoryPage';

export const publicRoutes = [
    {
        path: '/',
        element: Home,
    },

    {
        path: '/login',
        element: LoginPage,
    },
    {
        path: '/register',
        element: RegisterPage,
    },
    {
        path: '/test',
        element: CVDesigner,
    },
    {
        path: '/dang-ky-tuyen-dung',
        element: RecruiterRegistrationpage,
    }
];

export const privateRoutes = [
    {
        path: '/tao-cv',
        element: Resume,
    },
    {
        path: '/profile',
        element: Profile,
    },
    {
        path: '/tao-cv/:id',
        element: Resume,
    },
];

export const adminRoutes = [
    {
        path: '/admin/dashboard',
        element: AdminDashboard,
    },
    {
        path: '/admin/nguoi-dung',
        element: UserManagement,
    },
    {
        path: '/admin/nguoi-dung/:id',
        element: DetailUser,
    },
    {
        path: '/admin/phan-quyen',
        element: RoleManagermentPage,
    },
    {
        path: '/admin/xac-nhan/nha-tuyen-dung',
        element: ConfirmPage,
    },
    {
        path: '/admin/danh-muc/nganh-nghe',
        element: JobCategoryPage,
    }
];

export const recruiterRoutes = [
    {
        path: '/tuyen-dung',
        element: RecruiterPage,
    },
    {
        path: '/tuyen-dung/thong-tin-cong-ty',
        element: CompanyDetailPage,
    },
    {
        path: '/tuyen-dung/cong-viec',
        element: JobManagementPage,
    },
    {
        path: '/tuyen-dung/cong-viec/tao-tin-tuyen-dung',
        element: JobCreatePage,
    }
];

export const userRoutes = [
    {
        path: '/',
        element: Home,
    },
]