import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
    const location = useLocation();
    const isLogin = useSelector(({ auth }) => auth.isAuthenticated);

    if (isLogin === null) {
        return null;
    }

    return isLogin ? (
        <>{children}</>
    ) : (
        <Navigate to="/" replace state={{ from: location }} />
    );
};

export default PrivateRoutes;
