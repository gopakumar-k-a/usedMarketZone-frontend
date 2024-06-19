import React from "react";

// import Temp from './components/home/Home'
const ErrorPage = React.lazy(() => import("./pages/auth/ErrorPage"));

//user
const App = React.lazy(() => import("./App")); //user page layout
const Home = React.lazy(() => import("./components/home/Home"));
const Profile = React.lazy(() => import("./pages/user/profile/ProfilePage"));
const EditProfile = React.lazy(
  () => import("./pages/user/profile/editProfile/EditProfile")
);
//auth
const AuthenticationPage = React.lazy(
  () => import("./pages/auth/AuthenticationPage")
);
const Otp = React.lazy(() => import("./components/auth/Otp"));
const PublicRoute = React.lazy(() => import("./routes/PublicRoute"));
const PrivateRoute = React.lazy(() => import("./routes/PrivateRoute"));
const OtpRouteGuard = React.lazy(() => import("./routes/otpRouteProtect"));
const AdminPrivateRoute = React.lazy(
  () => import("./routes/AdminPrivateRoute")
);
const ResetPassword=React.lazy(()=>import("./components/auth/ResetPassword"))
const ResetPassModal=React.lazy(()=>import("./components/auth/ResetPasswModal"))
//admin
const AdminPageLayout = React.lazy(
  () => import("./pages/admin/AdminPageLayout")
);
const AdminDashboard = React.lazy(
  () => import("./components/admin/AdminDashboard")
);
const UserManagement=React.lazy(()=>import("./pages/admin/UserManagement"))
export {
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
  ResetPassword,
  ResetPassModal,
  //admin
  AdminPageLayout,
  AdminDashboard,
  UserManagement
};
