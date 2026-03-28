import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Landing from "./features/interview/pages/Landing";
import Interview from "./features/interview/pages/Interview";
import History from "./features/interview/pages/History";
import Profile from "./features/auth/pages/Profile";
import Admin from "./features/interview/pages/Admin";
import Layout from "./components/Layout";
import { useAuth } from "./features/auth/hooks/useAuth";
import AdminRoute from "./features/auth/components/AdminRoute";

const HomeOrLanding = () => {
    const { user, loading } = useAuth();
    if (loading) return null;
    return user ? <Home /> : <Landing />;
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                index: true,
                element: <HomeOrLanding />
            },
            {
                path: "dashboard",
                element: <Protected><Home /></Protected>
            },
            {
                path: "history",
                element: <Protected><History /></Protected>
            },
            {
                path: "profile",
                element: <Protected><Profile /></Protected>
            },
            {
                path: "interview/:interviewId",
                element: <Protected><Interview /></Protected>
            },
            {
                path: "admin",
                element: <AdminRoute><Admin /></AdminRoute>
            }
        ]
    }
])