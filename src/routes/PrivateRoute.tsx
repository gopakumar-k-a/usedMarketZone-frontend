import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../utils/hooks/reduxHooks";
import { RootState } from "../redux/app/store";


export default function PrivateRoute({
  children,
}: {
  children: ReactNode;
}) {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useAppSelector((state: RootState) => state.auth.user);

  const role = isAuthenticated && user ? user?.role : "";

  if (!isAuthenticated || role !== "user") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
