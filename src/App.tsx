import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./index.css"
import DefaultLayout from './components/layout/DefaultLayout';
import { GoogleOAuthProvider } from "@react-oauth/google";
import instance from './config/axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './features/modal/userSlice';
import { publicRoutes } from './router';
function App() {
    const dispatch = useDispatch();
    const getMyInfo = async () => {
      const token = localStorage.getItem("accessToken")
      if (token){
        const userInfo = await instance.get('/users/my-info')
        console.log(userInfo)
        if (userInfo){
          dispatch(setUser(userInfo.data.result))
        }
      }
    }
    useEffect(() => {
      getMyInfo();
    },[])
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <Routes>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={<DefaultLayout><route.element /></DefaultLayout>} />
            ))}
          </Routes>
        </GoogleOAuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
