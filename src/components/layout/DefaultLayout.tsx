import NavBar from "./NavBar";
import PrivateRoute from "../common/AppRoutes";

export default function DefaultLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <NavBar />
            <PrivateRoute>
                {children}
            </PrivateRoute>
        </div>
    )
}