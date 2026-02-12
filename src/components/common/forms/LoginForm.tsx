import { SchemaForm } from './SchemaForm';
import { loginSchema } from '../../../features/modal/types';
import instance from '../../../config/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../features/modal/userSlice';
function LoginForm() {
    const dispatch = useDispatch();

    const handleSubmitLogin = async (data: Record<string, unknown>) => {
        try {
            const response = await instance.post('/auth/log-in', data);
            const accessToken = response.data.result.token;
            localStorage.setItem('accessToken', accessToken);
            dispatch(setUser(response.data.result));
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const response = await instance.post('/auth/log-in/google', {
                    code: tokenResponse.code,
                });

                if (response.data && response.data.result) {
                    const accessToken = response.data.result.token;
                    if (accessToken) {
                        localStorage.setItem('accessToken', accessToken);
                    }
                }
                window.location.reload();
            } catch (error: any) {
                console.error(error.response?.data || error.message);
            }
        },
        flow: 'auth-code',
        onError: (error) => console.error('Google Login Failed:', error),
    });

    return (
        <div>
            <SchemaForm name="loginForm" schema={loginSchema} onSubmit={handleSubmitLogin}>
                <p>Hoặc đăng nhập bằng cách khác</p>
                <div className="flex gap-2" onClick={loginWithGoogle}>
                    <p>Google</p>
                    <FontAwesomeIcon icon={faStar} />
                </div>
            </SchemaForm>
        </div>
    );
}

export default LoginForm;
