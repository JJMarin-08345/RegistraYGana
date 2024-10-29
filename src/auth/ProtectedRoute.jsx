import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const ProtectedRoute = () => {
    const { isAuth, role } = useAuth();

    if (isAuth && role === 'client' || role === 'admin') {
        return <Outlet />;
    }

    return <Navigate to="/login" />;
}

export const ProtectedRouteAdmin = () => {
    const { isAuth, role } = useAuth();

    if (isAuth && role === 'admin') {
        return <Outlet />;
    }

    return <Navigate to="/login" />;
}