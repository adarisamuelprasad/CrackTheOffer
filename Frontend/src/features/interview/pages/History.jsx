import React from 'react';
import { useInterview } from '../hooks/useInterview.js';
import { useNavigate } from 'react-router';
import '../style/home.scss';

const History = () => {
    const { reports } = useInterview();
    const navigate = useNavigate();

    return (
        <div className="home-page" style={{ justifyContent: 'flex-start', paddingTop: '4rem' }}>
            <header className='page-header' style={{ marginBottom: '2rem' }}>
                <h1>My Interview <span className='highlight'>History</span></h1>
                <p>Review and revisit your previously generated interview plans.</p>
            </header>

            {reports && reports.length > 0 ? (
                <section className='recent-reports'>
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3>{report.title || 'Untitled Position'}</h3>
                                <p className='report-meta' style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`} style={{ marginTop: '0.5rem' }}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
            ) : (
                 <div className="info-box" style={{ maxWidth: '600px', width: '100%', margin: '0 auto', justifyContent: 'center' }}>
                     <span className='info-box__icon'>
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                     </span>
                     <p style={{ textAlign: 'center' }}>You haven't generated any interview plans yet. Head to the dashboard to create one!</p>
                 </div>
            )}
        </div>
    );
};

export default History;
