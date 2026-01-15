import React, { useEffect, useState } from 'react';
import { getGithubUserData, getGithubEvents } from '../../queries/getGithubData';
import GithubStatsCard from './GithubStatsCard';
import CommitHistory from './CommitHistory';
import ContributionGraph from './ContributionGraph';
import './Github.css';

const GithubSection = () => {
    const [userData, setUserData] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [user, userEvents] = await Promise.all([
                    getGithubUserData(),
                    getGithubEvents()
                ]);
                setUserData(user);
                setEvents(userEvents);
            } catch (error) {
            }
        };
        fetchData();
    }, []);

    return (
        <section className="gh-section-wrapper">
            <div className="gh-section-shell">
                <div className="gh-section-header">
                    <div className="gh-heading">
                        <span className="gh-kicker">Live from GitHub</span>
                        <div className="gh-title-row">
                            <h2 className="gh-section-title">GitHub Activity</h2>
                        </div>
                    </div>
                </div>

                <div className="gh-layout">
                    {/* Top: Stats across full width */}
                    <div className="gh-col-top">
                        <GithubStatsCard userData={userData} events={events} />
                    </div>

                    {/* Bottom Left: Commits */}
                    <div className="gh-col-left">
                        <div className="gh-card gh-commit-card">
                            <div className="gh-header">
                                <h3 className="gh-title-icon">Recent Commits</h3>
                            </div>
                            <CommitHistory events={events} />
                        </div>
                    </div>

                    {/* Bottom Right: Graph */}
                    <div className="gh-col-right">
                        <ContributionGraph />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GithubSection;
