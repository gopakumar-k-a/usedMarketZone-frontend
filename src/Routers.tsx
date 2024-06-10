import { createBrowserRouter, Link, Navigate } from "react-router-dom";
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
  OtpRouteGuard,
  //admin
  AdminPageLayout,
  AdminDashboard,
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
        path:"/edit-profile",
        element:(
          <Suspense fallback={<Loading/>}>
            <EditProfile/>
          </Suspense>
        )
      }
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
  //   {
  //     path: "admin",
  //     element: <AdminPageLayout />,
  //     children: [

  //       {
  //         path: "dashboard",
  //         element: <AdminDashboard />,
  //       },
  //     ],
  //   },
]);
