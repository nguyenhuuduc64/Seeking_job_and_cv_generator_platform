import Home from '../pages/Home';
import Resume from '../pages/Resume';
import Profile from '../pages/Profile';
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
];
