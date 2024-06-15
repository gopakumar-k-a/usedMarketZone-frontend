import { createBrowserRouter, Link, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import { Suspense } from "react";
import {
  //user
  App,
  Home,
  Profile,
  EditProfile,

  //auth
  ErrorPage,
  AuthenticationPage,
  Otp,
  PublicRoute,
  PrivateRoute,
  AdminPrivateRoute,
  OtpRouteGuard,
  //admin
  AdminPageLayout,
  AdminDashboard,
  UserManagement,
} from "./lazyComponents";

const Loading = () => <div>Loading...</div>;

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <PrivateRoute>
          <App />
        </PrivateRoute>
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loading />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<Loading />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "/edit-profile",
        element: (
          <Suspense fallback={<Loading />}>
            <EditProfile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "login",
    element: (
      <Suspense fallback={<Loading />}>
        <PublicRoute>
          <AuthenticationPage />
        </PublicRoute>
      </Suspense>
    ),
  },
  {
    path: "signup",
    element: (
      <Suspense fallback={<Loading />}>
        <PublicRoute>
          <AuthenticationPage />
        </PublicRoute>
      </Suspense>
    ),
  },
  {
    path: "forgot-password",
    element: (
      <Suspense fallback={<Loading />}>
        <PublicRoute>
          <AuthenticationPage />
        </PublicRoute>
      </Suspense>
    ),
  },
  {
    path: "otp",
    element: (
      <Suspense fallback={<Loading />}>
        <OtpRouteGuard>
          <Otp />
        </OtpRouteGuard>
      </Suspense>
    ),
  },
  {
    path: "admin",
    element: (
      <Suspense fallback={<Loading />}>
        <AdminPrivateRoute>
          <QueryClientProvider client={queryClient}>
            <AdminPageLayout />
          </QueryClientProvider>
        </AdminPrivateRoute>
      </Suspense>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "user-management",
        element: <UserManagement />,
      },
    ],
  },
]);
