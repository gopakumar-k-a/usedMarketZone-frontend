import { createBrowserRouter, Link, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import { Suspense } from "react";
import {
  //user
  App,
  Home,
  Profile,
  OwnerPosts,
  OwnerBookmarks,
  EditProfile,
  ShowPostDetails,
  UserProfile,
  Chat,
  SettingsPage,
  SearchPage,
  OwnerBidStatus,
  NotificationPage,
  OwnerParticipatingBids,
  BidClaimPage,
  BidResultPageOwner,
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
  BidHistoryAdmin,
  KycRequestPage,
  ViewBidProductPageAdmin,
  ViewProductPageAdmin,
  BidTransactionPage,
  AdminBidReportPage,
} from "./lazyComponents";
// import ForgotPass from "./components/auth/ForgotPass";

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
        children: [
          { path: "my-posts", element: <OwnerPosts /> },
          {
            path: "my-bookmarks",
            element: <OwnerBookmarks />,
          },
          {
            path: "my-bids",
            element: <OwnerBidStatus />,
          },
          {
            path: "my-participating-bids",
            element: <OwnerParticipatingBids />,
          },
        ],
      },
      {
        path: "claim-bid",
        element: <BidClaimPage />,
      },
      {
        path: "bid-result",
        element: <BidResultPageOwner />,
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
            <ShowPostDetails />
          </Suspense>
        ),
      },
      {
        path: "/user-profile",
        element: (
          <Suspense fallback={<Loading />}>
            <UserProfile />
          </Suspense>
        ),
      },
      {
        path: "/messages",
        element: (
          <Suspense fallback={<Loading />}>
            <Chat />
          </Suspense>
        ),
      },
      {
        path: "/settings",
        element: (
          <Suspense fallback={<Loading />}>
            <SettingsPage />
          </Suspense>
        ),
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<Loading />}>
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: "/notifications",
        element: (
          <Suspense fallback={<Loading />}>
            <NotificationPage />
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
      {
        path: "bid-history",
        element: <BidHistoryAdmin />,
      },
      {
        path: "kyc-requests",
        element: <KycRequestPage />,
      },
      {
        path: "view-bid-product",
        element: <ViewBidProductPageAdmin />,
      },
      {
        path: "view-product",
        element: <ViewProductPageAdmin />,
      },
      {
        path: "bid-transaction",
        element: <BidTransactionPage />,
      },
      {
        path: "transaction-report",
        element: <AdminBidReportPage />,
      },
    ],
  },
]);
