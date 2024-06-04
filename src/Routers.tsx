import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense } from "react";

//imports from Pages
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import Otp from "./components/auth/Otp";
import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute";

export const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: (
            <PrivateRoute>
                <App />
            </PrivateRoute>),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Navigate to="/home" />
            },
            {
                path: '/home',
                element: <App />
            },

        ]
    },
    {
        path: 'login',
        element: (
            <PublicRoute>
                <AuthenticationPage />
            </PublicRoute>)
    },
    {
        path: 'signup',
        element: (
            <PublicRoute>
                <AuthenticationPage />
            </PublicRoute>)
    },
    {
        path: 'forgot-password',
        element: (
            <PublicRoute>
                <AuthenticationPage />
            </PublicRoute>)
    },
    {
        path: 'otp',
        element: <Otp />

    }
])