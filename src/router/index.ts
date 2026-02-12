import Home from '../pages/Home';
import Resume from '../pages/ResumeGeneratePage';
import Profile from '../pages/Profile';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '@/pages/admin/UserManagement';
import DetailUser from '@/pages/admin/DetailUser';
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
        path: '/admin',
        element: AdminDashboard,
    },
    {
        path: '/admin/nguoi-dung',
        element: UserManagement,
    },
    {
        path: '/admin/nguoi-dung/:id',
        element: DetailUser,
    }
]; 