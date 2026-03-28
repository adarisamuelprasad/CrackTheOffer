import React from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth.js';
import '../style/home.scss';

const Landing = () => {
    const { user, loading } = useAuth();
    if (loading) return null; // Prevent flicker during auth check
    return (
        <div className="home-page landing-page" style={{ justifyContent: 'flex-start', padding: 0 }}>
            {/* Hero Section */}
            <section className="hero-section" style={{ 
                width: '100%', 
                padding: '6rem 2rem', 
                textAlign: 'center',
                background: 'radial-gradient(circle at 50% 50%, rgba(255, 46, 147, 0.05) 0%, transparent 70%)',
                borderBottom: '1px solid var(--glass-border)'
            }}>
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
                    AI-Powered Career Success 🚀
                </div>
                <h1 style={{ fontSize: '3.5rem', maxWidth: '900px', margin: '0 auto 1.5rem' }}>
                    Don't just apply. <br/> <span className="highlight">Crack The Offer.</span>
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 2.5rem', lineHeight: '1.8' }}>
                    Our advanced AI analyzes your unique profile against any job description to generate a winning interview strategy in seconds.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                    {user ? (
                         <Link to="/dashboard" className="generate-btn" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', textDecoration: 'none' }}>Open Dashboard</Link>
                    ) : (
                        <>
                            <Link to="/register" className="generate-btn" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', textDecoration: 'none' }}>Get Started Free</Link>
                            <Link to="/login" className="history-link" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>View Demo</Link>
                        </>
                    )}
                </div>
            </section>

            {!user && (
                <>
                    {/* Features Section */}
                    <section style={{ width: '100%', maxWidth: '1200px', padding: '6rem 2rem', margin: '0 auto' }}>
                        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>Everything you need to <span className="highlight">Dominate</span> your next interview</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {[
                                { title: 'AI Match Analysis', desc: 'Get a precise Match Score showing exactly how well your resume fits the role requirements.', icon: '🎯' },
                                { title: 'Custom Question Sets', desc: 'AI-generated technical and behavioral questions based on your specific background and the target JD.', icon: '📋' },
                                { title: 'Winning Strategy', desc: 'Step-by-step guidance on how to position your experience and handle "tough" interview moments.', icon: '🏆' },
                                { title: 'Resume Hub', desc: 'Store and manage multiple resumes for different target roles in one centralized dashboard.', icon: '📁' },
                                { title: 'Interview History', desc: 'Keep track of every plan you generate. Revisit your strategies anytime, anywhere.', icon: '🔄' },
                                { title: 'Real-time Edge', desc: 'Powered by the latest LLMs to give you insights that traditional mock interviews miss.', icon: '⚡' }
                            ].map((feature, i) => (
                                <div key={i} className="interview-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <span style={{ fontSize: '2.5rem' }}>{feature.icon}</span>
                                    <h3 style={{ fontSize: '1.3rem', margin: 0 }}>{feature.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Guide Section */}
                    <section style={{ width: '100%', background: 'var(--glass-bg)', padding: '6rem 2rem', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
                        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem' }}>How it <span className="highlight">Works</span></h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                {[
                                    { step: '01', title: 'Upload Your Resume', desc: 'Simply upload your latest PDF or DOCX resume to our secure hub.' },
                                    { step: '02', title: 'Paste Job details', desc: 'Drop the job description of the role you are targeting into the platform.' },
                                    { step: '03', title: 'AI Generation', desc: 'Our AI cross-references your profile with the job requirements and company culture.' },
                                    { step: '04', title: 'Review Your Plan', desc: 'Get a custom strategy, match analysis, and mock questions in seconds.' }
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                                        <span style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--accent)', opacity: '0.2', lineHeight: '1' }}>{item.step}</span>
                                        <div>
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: 0 }}>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </>
            )}

            {/* Roadmap Section */}
            <section style={{ width: '100%', maxWidth: '1200px', padding: '6rem 2rem', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}>Platform <span className="highlight">Roadmap</span></h2>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '4rem' }}>We are constantly evolving to help you stay ahead.</p>
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ position: 'absolute', left: '20px', top: '0', bottom: '0', width: '2px', background: 'linear-gradient(to bottom, var(--accent), transparent)' }}></div>
                    {[
                        { time: 'Q1 2026', title: 'Audio Mock Interviews', desc: 'Interactive voice-based mock interviews with real-time feedback on your tone and confidence.', status: 'Coming Soon' },
                        { time: 'Q2 2026', title: 'Salary Negotiation AI', desc: 'Expert guidance on how to negotiate your compensation package based on market data.', status: 'Planned' },
                        { time: 'Q3 2026', title: 'Referral Network', desc: 'Connect with mentors and employees in your target companies automatically.', status: 'Future' }
                    ].map((item, i) => (
                        <div key={i} style={{ paddingLeft: '3.5rem', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '13px', top: '5px', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}></div>
                            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase' }}>{item.time}</span>
                            <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>{item.title} <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '1rem', background: 'rgba(255, 46, 147, 0.1)', marginLeft: '1rem' }}>{item.status}</span></h3>
                            <p style={{ color: 'var(--text-muted)', maxWidth: '600px' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ width: '100%', padding: '8rem 2rem', textAlign: 'center', borderTop: '1px solid var(--glass-border)' }}>
                <div style={{ 
                    maxWidth: '800px', 
                    margin: '0 auto', 
                    padding: '4rem', 
                    background: 'var(--glass-bg)', 
                    borderRadius: '2.5rem', 
                    border: '1px solid var(--glass-border)',
                    boxShadow: 'var(--glass-shadow)'
                }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to <span className="highlight">Win?</span></h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Join thousands of users who have cracked their dream offers with AI.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {user ? (
                            <Link to="/dashboard" className="generate-btn" style={{ padding: '1rem 3rem', textDecoration: 'none' }}>Explore Your Dashboard</Link>
                        ) : (
                            <>
                                <Link to="/register" className="generate-btn" style={{ padding: '1rem 3rem', textDecoration: 'none' }}>Create My Account</Link>
                                <Link to="/login" className="history-link" style={{ padding: '1rem 3rem' }}>Login to Dashboard</Link>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
