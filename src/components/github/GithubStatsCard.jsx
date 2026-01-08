import React, { useMemo } from 'react';
import './Github.css';

const GithubStatsCard = ({ userData, events = [] }) => {
    if (!userData) return null;

    const commitsThisMonth = useMemo(() => {
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();
        let total = 0;

        events.forEach((event) => {
            if (event.type !== 'PushEvent') return;
            const eventDate = new Date(event.created_at);
            if (eventDate.getMonth() !== month || eventDate.getFullYear() !== year) return;
            const commitCount = event.payload?.commits?.length ?? event.payload?.size ?? 0;
            total += commitCount > 0 ? commitCount : 1;
        });

        return total;
    }, [events]);

    return (
        <div className="gh-card">
            <div className="gh-stats-card">
                <img
                    src={userData.avatar_url}
                    alt={userData.login}
                    className="gh-avatar"
                    onError={(e) => {
                        e.target.src = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
                    }}
                />

                <div className="gh-profile-info">
                    <h3 className="gh-username">{userData.login}</h3>
                    <p className="gh-bio">{userData.bio || 'Technology agnostic developer'}</p>
                </div>

                <div className="gh-metrics">
                    <div className="gh-metric-item">
                        <span className="gh-metric-value">{userData.public_repos}</span>
                        <span className="gh-metric-label">Repos</span>
                    </div>
                    <div className="gh-metric-item gh-metric-highlight">
                        <span className="gh-metric-value">{commitsThisMonth}</span>
                        <span className="gh-metric-label">Commits this month</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GithubStatsCard;
