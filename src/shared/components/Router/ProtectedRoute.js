import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAuthenticated = sessionStorage.getItem('token');

    // Redirect to landing page based on the authentication
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }
    // Render the protected route if the authentication match
    return <Outlet />;
};

export default ProtectedRoute;
