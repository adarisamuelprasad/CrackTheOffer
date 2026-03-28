import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { AuthContext } from '../features/auth/auth.context';
import './Layout.scss';

const Layout = () => {
    const location = useLocation();
    const isHome = location.pathname === '/' || location.pathname === '/dashboard';
    // Default to light mode, load from local storage if available
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="layout">
            <nav className="navbar">
                <div className="navbar__logo">
                    <Link to="/"><span className="highlight">Crack</span>TheOffer</Link>
                </div>
                <div className="navbar__options">
                    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
                        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                    </button>
                    {user ? (
                        <div className="navbar__links">
                            {!isHome && <Link to="/" className="history-link">Home</Link>}
                            {user.role === 'admin' && <Link to="/admin" className="history-link">Admin Panel</Link>}
                            <Link to="/history" className="history-link">History</Link>
                            <Link to="/profile" className="profile-link">Profile</Link>
                        </div>
                    ) : (
                        <div className="navbar__links">
                             <Link to="/login" className="history-link">Login</Link>
                             <Link to="/register" className="profile-link">Get Started</Link>
                        </div>
                    )}
                </div>
            </nav>
            <div className="layout__content">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
