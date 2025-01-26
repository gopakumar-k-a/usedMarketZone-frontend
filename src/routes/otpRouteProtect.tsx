
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../utils/hooks/reduxHooks';

interface RouteGuardProps {
    children: ReactNode;
}

const OtpRouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
    const isAuthorized = useAppSelector((state) => state.protectOtp.isAuthorized);

    if (!isAuthorized) {
        return <Navigate to="/signup" />;
    }

    return <>{children}</>;
};

export default OtpRouteGuard;

