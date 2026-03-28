import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react';

const AdminRoute = ({ children }) => {
    const { loading, user } = useAuth();

    if (loading) {
        return (
            <main className='loading-screen'>
                <h1>Verifying Admin Access...</h1>
            </main>
        );
    }

    if (!user || user.role !== 'admin') {
        return <Navigate to={'/'} />;
    }

    return children;
};

export default AdminRoute;
