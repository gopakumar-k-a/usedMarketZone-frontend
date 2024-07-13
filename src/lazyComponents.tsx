import React from "react";

// import Temp from './components/home/Home'
const ErrorPage = React.lazy(() => import("./pages/auth/ErrorPage"));

//user
const App = React.lazy(() => import("./App")); //user page layout
const Home = React.lazy(() => import("./pages/user/home/HomePage"));
const Profile = React.lazy(() => import("./pages/user/profile/MyProfilePage"));
const EditProfile = React.lazy(
  () => import("./pages/user/profile/editProfile/EditProfile")
);
const Chat=React.lazy(()=>import ("./pages/user/chat/ChatPage"))
const UserProfile=React.lazy(()=>import("./pages/user/profile/UserProfilePage"))
const OwnerPosts=React.lazy(()=>import("./components/user/profilePage/myPosts"))
const OwnerBookmarks=React.lazy(()=>import("./components/user/profilePage/myBookmarks"))
//product
const SellProductPost=React.lazy(()=>import("./pages/user/post/SellProductPost"))
const AuctionProductPost=React.lazy(()=>import('./pages/user/post/BidProductPost'))
const ShowPostDetails=React.lazy(()=>import('./pages/user/post/ShowPostDetails'))
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
const PostMangement=React.lazy(()=>import("./pages/admin/PostManagementPage"))
const BidVerfication=React.lazy(()=>import("./pages/admin/BidVerificationPage"))
const UserProfileAdmin=React.lazy(()=>import("./pages/admin/UserProfileAdmin"))
const PostIncidents=React.lazy(()=>import("./pages/admin/PostIncidentsPage"))
export {
  //user
  App,
  Home,
  Profile,
  EditProfile,
  SellProductPost,
  AuctionProductPost,
  ShowPostDetails,
  UserProfile,
  Chat,
  OwnerPosts,
  OwnerBookmarks,

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
  UserManagement,
  PostMangement,
  UserProfileAdmin,
  BidVerfication,
  PostIncidents
  
};
