import React from "react";

// import Temp from './components/home/Home'
const App = React.lazy(() => import("./App"));
const Home = React.lazy(() => import("./components/home/Home"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const AuthenticationPage = React.lazy(
  () => import("./pages/AuthenticationPage")
);
const Otp = React.lazy(() => import("./components/auth/Otp"));
const PublicRoute = React.lazy(() => import("./routes/PublicRoute"));
const PrivateRoute = React.lazy(() => import("./routes/PrivateRoute"));
const OtpRouteGuard = React.lazy(() => import("./routes/otpRouteProtect"));

//admin
const AdminPageLayout = React.lazy(() => import("./components/admin/AdminPageLayout"));
const AdminDashboard = React.lazy(
  () => import("./components/admin/AdminDashboard")
);

export {
  //user
  App,
  Home,
  ErrorPage,
  AuthenticationPage,
  Otp,
  PublicRoute,
  PrivateRoute,
  OtpRouteGuard,
  //admin
  AdminPageLayout,
  AdminDashboard,
};
