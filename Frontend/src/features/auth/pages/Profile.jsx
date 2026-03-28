import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import '../../interview/style/home.scss';

const Profile = () => {
    const { user, handleLogout: logoutSession } = useAuth();
    const [showLogout, setShowLogout] = useState(false);
    const [resumes, setResumes] = useState([
        { id: 1, name: 'Frontend Engineer Resume', date: '2026-03-20', filename: 'frontend_resume.pdf' }
    ]);
    const [newResumeName, setNewResumeName] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileUpload = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setUploadedFile(e.target.files[0]);
        }
    };

    const handleSaveResume = (e) => {
        e.preventDefault();
        if (newResumeName && uploadedFile) {
            setResumes([...resumes, {
                id: Date.now(),
                name: newResumeName,
                date: new Date().toISOString().split('T')[0],
                filename: uploadedFile.name,
                previewUrl: URL.createObjectURL(uploadedFile)
            }]);
            setNewResumeName('');
            setUploadedFile(null);
        }
    };

    const handlePreview = (resume) => {
        if (resume.previewUrl) {
            window.open(resume.previewUrl, "_blank");
        } else {
            alert("This is a demo resume. Please upload a real resume to preview it!");
        }
    };

    const handleLogout = async () => {
        await logoutSession();
        setShowLogout(false);
    };

    return (
        <div className="home-page" style={{ justifyContent: 'flex-start', paddingTop: '4rem' }}>
            <header className='page-header' style={{ marginBottom: '2rem' }}>
                <h1>My <span className='highlight'>Profile</span></h1>
                <p>Manage your account settings and stored resumes.</p>
            </header>

            <div className='interview-card' style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column' }}>
                <div className='panel' style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <div className='panel__header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2>Account Details</h2>
                        <button onClick={() => setShowLogout(true)} className='generate-btn' style={{ background: '#ef4444', border: '1px solid #dc2626', padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Logout</button>
                    </div>
                    <div className='input-group' style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label className='section-label'>Email Address</label>
                        <input className='panel__textarea panel__textarea--short' style={{ height: 'auto', padding: '0.75rem' }} disabled value={user?.email || 'user@example.com'} />
                    </div>
                    <div className='panel__header' style={{ marginTop: '1rem' }}>
                        <h2>Change Password</h2>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <input type='password' placeholder='New Password' className='panel__textarea panel__textarea--short' style={{ height: 'auto', padding: '0.75rem', flex: 1, minWidth: '200px' }} />
                        <input type='password' placeholder='Confirm Password' className='panel__textarea panel__textarea--short' style={{ height: 'auto', padding: '0.75rem', flex: 1, minWidth: '200px' }} />
                        <button className='generate-btn' style={{ padding: '0.5rem 1.5rem', borderRadius: '0.5rem' }}>Update</button>
                    </div>
                </div>

                <div className='panel'>
                    <div className='panel__header'>
                        <h2>Stored Resumes</h2>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                        {resumes.map(r => (
                            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--input-bg)', borderRadius: '0.5rem', border: '1px solid var(--glass-border)' }}>
                                <div>
                                    <h4 style={{ margin: 0, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{r.name}</h4>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.filename} • Uploaded {r.date}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button style={{ background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '0.4rem 0.8rem', borderRadius: '0.4rem', cursor: 'pointer', transition: 'all 0.2s ease' }}
                                        onMouseOver={(e) => {e.target.style.background='var(--accent)'; e.target.style.color='#fff'}}
                                        onMouseOut={(e) => {e.target.style.background='transparent'; e.target.style.color='var(--accent)'}}
                                        onClick={() => handlePreview(r)}>
                                        Preview
                                    </button>
                                    <button style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '0.4rem 0.8rem', borderRadius: '0.4rem', cursor: 'pointer', transition: 'all 0.2s ease' }} 
                                        onMouseOver={(e) => {e.target.style.background='#ef4444'; e.target.style.color='#fff'}}
                                        onMouseOut={(e) => {e.target.style.background='transparent'; e.target.style.color='#ef4444'}}
                                        onClick={() => setResumes(resumes.filter(res => res.id !== r.id))}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                        {resumes.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No resumes stored. Add one below!</p>}
                    </div>

                    <form onSubmit={handleSaveResume} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--input-bg)', padding: '1.5rem', borderRadius: '0.5rem', border: '1px dashed var(--glass-border)' }}>
                        <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>Add New Resume</h3>
                        <input 
                            type='text' 
                            required 
                            placeholder='Resume Name (e.g. Frontend 2026)' 
                            value={newResumeName}
                            onChange={(e) => setNewResumeName(e.target.value)}
                            className='panel__textarea panel__textarea--short' 
                            style={{ height: 'auto', padding: '0.75rem', width: '100%' }} 
                        />
                        <div className="upload-section">
                            <label className={`dropzone ${uploadedFile ? 'dropzone--uploaded' : ''}`} htmlFor='profileResume' style={{ padding: '1rem' }}>
                                <p className='dropzone__title' style={{ color: uploadedFile ? '#22c55e' : '' }}>
                                    {uploadedFile ? uploadedFile.name : 'Click to Upload Resume (PDF/DOCX)'}
                                </p>
                                <input required onChange={handleFileUpload} hidden type='file' id='profileResume' accept='.pdf,.docx' />
                            </label>
                        </div>
                        <button type='submit' className='generate-btn' style={{ alignSelf: 'flex-start', padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}>Save to Profile</button>
                    </form>
                </div>
            </div>

            {showLogout && (
                <div className="custom-modal-overlay" onClick={() => setShowLogout(false)}>
                    <div className="custom-modal" onClick={e => e.stopPropagation()}>
                        <div className="custom-modal__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        </div>
                        <h3>Confirm Logout</h3>
                        <p>Are you sure you want to log out of your account?</p>
                        <div className="custom-modal__buttons">
                            <button className="btn-cancel" onClick={() => setShowLogout(false)}>Cancel</button>
                            <button className="btn-confirm" onClick={handleLogout}>Log Out</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
