import { Outlet, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { verifyUserCookie } from './NetworkCalls';
import { useEffect, useState } from 'react';

export const verifyCookie = async (project: string) => {
    const res = await verifyUserCookie(project);
    return res.success;
};

function ProtectedRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
    const location = useLocation();

    const verifyAuth = async () => {
        const project =
            location.pathname === '/administrator-panel' ? 'GG' : 'TB';
        const cookieSet = await verifyCookie(project);
        setIsAuthenticated(cookieSet);
    };

    useEffect(() => {
        verifyAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isAuthenticated === undefined)
        return (
            <div
                id="login-container"
                className="flex flex-col justify-center items-center py-12 h-screen bg-white xs:px-16 md:px-20 xl:px-36"
            >
                <h2 className="font-omnes xs:text-xl md:text-4xl font-bold text-center mb-10 text-primaryBlueDark">
                    Loading...
                </h2>
            </div>
        );
    else if (isAuthenticated) {
        return <Outlet />;
    } else
        return (
            <Navigate
                to="/login"
                replace={true}
            />
        );
}

export default ProtectedRoute;
