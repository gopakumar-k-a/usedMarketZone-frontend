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
  ShowPostDetails,

  //auth
  ErrorPage,
  AuthenticationPage,
  Otp,
  PublicRoute,
  PrivateRoute,
  AdminPrivateRoute,
  OtpRouteGuard,
  AuctionProductPost,
  SellProductPost,
  //admin
  AdminPageLayout,
  AdminDashboard,
  UserManagement,
  PostMangement,
  UserProfileAdmin,
  BidVerfication,
  PostIncidents,
} from "./lazyComponents";
import ForgotPass from "./components/auth/ForgotPass";

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
      {
        path: "/post/sell-product",
        element: (
          <Suspense fallback={<Loading />}>
            <SellProductPost />
          </Suspense>
        ),
      },
      {
        path: "/post/auction-product",
        element: (
          <Suspense fallback={<Loading />}>
            <AuctionProductPost />
          </Suspense>
        ),
      },
      {
        path: "/post/post-details",
        element: (
          <Suspense fallback={<Loading />}>
            <ShowPostDetails/>
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
        {/* <OtpRouteGuard> */}
        <Otp />
        {/* </OtpRouteGuard> */}
      </Suspense>
    ),
  },
  //   {
  //     path: "/reset-password",
  //     element: (
  //       <Suspense fallback={<Loading />}>
  //         <ResetPassword />
  //       </Suspense>
  //     ),
  //   },
  //   {
  // path:'/reset-pass-modal',
  // element:(
  //   <Suspense>
  //     <ResetPassModal/>
  //   </Suspense>
  // )
  //   },
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
      {
        path: "user-profile",
        element: <UserProfileAdmin />,
      },
      {
        path: "post-management",
        element: <PostMangement />,
      },
      {
        path: "bid-verification",
        element: <BidVerfication />,
      },
      {
        path: "post-incidents",
        element: <PostIncidents />,
      },
    ],
  },
]);
