import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../utils/hooks/reduxHooks";

export default function OtpRouteGuard({ children }: { children: ReactNode }) {
  const isAuthorized = useAppSelector((state) => state.protectOtp.isAuthorized);

  if (!isAuthorized) {
    return <Navigate to="/signup" />;
  }

  return <>{children}</>;
}

