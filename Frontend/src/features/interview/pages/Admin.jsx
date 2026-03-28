import React, { useEffect, useState } from 'react';
import { fetchAllUsers, fetchAllReports, deleteUser } from '../services/admin.api';
import { Link } from 'react-router';
import '../style/home.scss';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [reports, setReports] = useState([]);
    const [activeTab, setActiveTab] = useState('users');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async () => {
        try {
            const usersData = await fetchAllUsers();
            const reportsData = await fetchAllReports();
            setUsers(usersData.users);
            setReports(reportsData.reports);
        } catch (err) {
            console.error("Error loading admin data:", err);
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user? All their data will be lost.")) {
            try {
                await deleteUser(userId);
                setUsers(users.filter(u => u._id !== userId));
            } catch (err) {
                alert("Failed to delete user.");
            }
        }
    };

    if (loading) {
        return (
            <main className='loading-screen'>
                <h1>Loading Admin Panel...</h1>
            </main>
        );
    }

    if (error) {
        return (
            <main className='loading-screen'>
                <h1 style={{ color: '#ef4444' }}>Admin Access Error</h1>
                <p style={{ color: 'var(--text-muted)' }}>{error}</p>
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                     <p>Tip: You might need to <strong>Log Out and Log back in</strong> after promoting your account to Admin!</p>
                     <button onClick={() => window.location.reload()} className='generate-btn' style={{ marginTop: '1rem' }}>Retry Access</button>
                    <Link to="/profile" style={{ display: 'block', marginTop: '1rem', color: 'var(--accent)' }}>Go to Logout</Link>
                </div>
            </main>
        );
    }

    return (
        <div className="home-page admin-page" style={{ justifyContent: 'flex-start', paddingTop: '4rem' }}>
            <header className='page-header' style={{ marginBottom: '3rem' }}>
                <div className="greeting" style={{ 
                    display: 'inline-block',
                    padding: '0.4rem 1rem', 
                    backgroundColor: 'rgba(255, 46, 147, 0.1)', 
                    color: 'var(--accent)', 
                    borderRadius: '2rem',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(255, 46, 147, 0.2)'
                }}>
                    Platform Administration 🛡️
                </div>
                <h1>System <span className='highlight'>Dashboard</span></h1>
                <p>Powerful analytics and control for the CrashTheOffer platform.</p>
            </header>

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', width: '100%', maxWidth: '1200px', marginBottom: '3rem' }}>
                <div className='interview-card' style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Total Users</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent)', margin: '0.5rem 0' }}>{users.length}</p>
                </div>
                <div className='interview-card' style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Total Reports</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent)', margin: '0.5rem 0' }}>{reports.length}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className='interview-card' style={{ width: '100%', maxWidth: '1200px', padding: 0 }}>
                <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', padding: '0.5rem' }}>
                    <button 
                        onClick={() => setActiveTab('users')}
                        style={{ background: activeTab === 'users' ? 'var(--accent)' : 'transparent', color: activeTab === 'users' ? 'white' : 'var(--text-primary)', border: 'none', padding: '0.8rem 2rem', borderRadius: '0.5rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                        User Directory
                    </button>
                    <button 
                         onClick={() => setActiveTab('reports')}
                        style={{ background: activeTab === 'reports' ? 'var(--accent)' : 'transparent', color: activeTab === 'reports' ? 'white' : 'var(--text-primary)', border: 'none', padding: '0.8rem 2rem', borderRadius: '0.5rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                        Master Search History
                    </button>
                </div>

                <div style={{ padding: '2rem' }}>
                    {activeTab === 'users' ? (
                        <div style={{ overflowX: 'auto' }}>
                             <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead style={{ borderBottom: '2px solid var(--glass-border)' }}>
                                    <tr>
                                        <th style={{ padding: '1rem' }}>Username</th>
                                        <th style={{ padding: '1rem' }}>Email</th>
                                        <th style={{ padding: '1rem' }}>Role</th>
                                        <th style={{ padding: '1rem' }}>Joined Date</th>
                                        <th style={{ padding: '1rem' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr key={u._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                            <td style={{ padding: '1rem' }}>{u.username}</td>
                                            <td style={{ padding: '1rem' }}>{u.email}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{ padding: '0.2rem 0.6rem', background: u.role === 'admin' ? 'rgba(255, 46, 147, 0.2)' : 'rgba(255,255,255,0.1)', color: u.role === 'admin' ? 'var(--accent)' : 'inherit', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700' }}>
                                                    {u.role.toUpperCase()}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>{new Date(u.createdAt || Date.now()).toLocaleDateString()}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <button 
                                                    disabled={u.role === 'admin'}
                                                    onClick={() => handleDeleteUser(u._id)}
                                                    style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '0.4rem 0.8rem', borderRadius: '0.4rem', cursor: u.role === 'admin' ? 'not-allowed' : 'pointer', opacity: u.role === 'admin' ? 0.3 : 1 }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead style={{ borderBottom: '2px solid var(--glass-border)' }}>
                                    <tr>
                                        <th style={{ padding: '1rem' }}>User</th>
                                        <th style={{ padding: '1rem' }}>Matches</th>
                                        <th style={{ padding: '1rem' }}>Status</th>
                                        <th style={{ padding: '1rem' }}>Date</th>
                                        <th style={{ padding: '1rem' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reports.map(r => (
                                        <tr key={r._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontWeight: '600' }}>{r.user?.username}</span>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.user?.email}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <span style={{ padding: '0.2rem 0.5rem', background: '#22c55e', color: 'white', fontSize: '0.7rem', borderRadius: '0.3rem' }}>{r.technicalScore}% Tech</span>
                                                    <span style={{ padding: '0.2rem 0.5rem', background: '#3b82f6', color: 'white', fontSize: '0.7rem', borderRadius: '0.3rem' }}>{r.behavioralScore}% Beh</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{ color: r.isHired ? '#22c55e' : 'var(--text-muted)', fontSize: '0.85rem' }}>{r.isHired ? 'PROBABLE HIRED' : 'ANALYZED'}</span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>{new Date(r.createdAt || Date.now()).toLocaleDateString()}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <Link to={`/interview/${r._id}`} className='history-link' style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                                                    View Report
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
