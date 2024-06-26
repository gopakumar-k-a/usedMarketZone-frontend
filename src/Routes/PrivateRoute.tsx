import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import {useAppSelector} from '../utils/hooks/reduxHooks'
import {RootState} from '../redux/app/store'

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useAppSelector((state: RootState) => state.auth.user);

  const role = isAuthenticated && user ? user?.role : "";
  console.log('role of the user in user private route is ', role);


  if (!isAuthenticated || role !== "user") {
    return <Navigate to="/login" replace />; 
  }

  return <>{children}</>; 
};

export default PrivateRoute;