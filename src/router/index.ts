import Home from '../pages/Home';
import Resume from '../pages/ResumeGeneratePage';
import Profile from '../pages/Profile';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
export const publicRoutes = [
    {
        path: '/',
        element: Home,
    },
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
    {
        path: '/login',
        element: LoginPage,
    },
    {
        path: '/register',
        element: RegisterPage,
    },
];
