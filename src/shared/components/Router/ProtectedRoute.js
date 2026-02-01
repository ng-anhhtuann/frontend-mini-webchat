import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAuthenticated = sessionStorage.getItem('token');

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
