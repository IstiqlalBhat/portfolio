import React, { useState, useEffect, useMemo } from 'react';
import { Calendar } from 'lucide-react';
import { getGithubContributions } from '../../queries/getGithubData';
import './Github.css';

const formatMonthLabel = (monthKey) => {
    if (!monthKey) return 'This month';
    const [year, month] = monthKey.split('-').map(Number);
    if (!year || !month) return 'This month';
    return new Date(year, month - 1, 1).toLocaleString(undefined, { month: 'short', year: 'numeric' });
};

const ContributionGraph = () => {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;

    const [year, setYear] = useState(currentYear.toString()); // 'last' or specific year
    const [contributionData, setContributionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hoveredMonthKey, setHoveredMonthKey] = useState(null);

    useEffect(() => {
        const fetchContributions = async () => {
            setLoading(true);
            const data = await getGithubContributions('IstiqlalBhat', year);
            setContributionData(data);
            setLoading(false);
        };
        fetchContributions();
    }, [year]);

    const contributions = contributionData?.contributions || [];

    const monthTotals = useMemo(() => {
        if (!contributions.length) return {};
        const totals = {};
        contributions.forEach((day) => {
            const monthKey = day.date.slice(0, 7);
            totals[monthKey] = (totals[monthKey] || 0) + day.count;
        });
        return totals;
    }, [contributions]);

    const defaultMonthKey = useMemo(() => {
        if (!contributions.length) return null;
        const now = new Date();
        const currentKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        if (monthTotals[currentKey] !== undefined) return currentKey;
        return contributions[contributions.length - 1].date.slice(0, 7);
    }, [contributions, monthTotals]);

    useEffect(() => {
        setHoveredMonthKey(defaultMonthKey);
    }, [defaultMonthKey]);

    if (loading) return (
        <div className="gh-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
            <div style={{ color: '#666', fontSize: '0.8rem' }}>Loading activity...</div>
        </div>
    );

    if (!contributions.length) return null;

    const getLevel = (count) => {
        if (count === 0) return 0;
        if (count <= 3) return 1;
        if (count <= 6) return 2;
        if (count <= 9) return 3;
        return 4;
    };

    // Calculate columns (weeks)
    const columns = [];
    let col = [];
    contributions.forEach((day) => {
        col.push(day);
        if (col.length === 7) {
            columns.push(col);
            col = [];
        }
    });
    if (col.length > 0) columns.push(col);

    const activeMonthKey = hoveredMonthKey || defaultMonthKey;
    const hoveredMonthCount = activeMonthKey ? (monthTotals[activeMonthKey] || 0) : 0;
    const hoveredMonthLabel = formatMonthLabel(activeMonthKey);

    return (
        <div className="gh-card gh-graph-card">
            <div className="gh-header">
                <h3 className="gh-title-icon">
                    <Calendar size={16} className="gh-icon" />
                    Activity
                </h3>

                <div className="gh-header-actions">
                    <div className="gh-month-chip" aria-live="polite">
                        {hoveredMonthLabel} &middot; {hoveredMonthCount} contributions
                    </div>
                    <div className="gh-toggles">
                        <button
                            className={`gh-btn ${year === 'last' ? 'active' : ''}`}
                            onClick={() => setYear('last')}
                        >
                            Last Year
                        </button>
                        <button
                            className={`gh-btn ${year === currentYear.toString() ? 'active' : ''}`}
                            onClick={() => setYear(currentYear.toString())}
                        >
                            {currentYear}
                        </button>
                        <button
                            className={`gh-btn ${year === lastYear.toString() ? 'active' : ''}`}
                            onClick={() => setYear(lastYear.toString())}
                        >
                            {lastYear}
                        </button>
                    </div>
                </div>
            </div>

            <div className="gh-graph-scroll gh-scroll">
                <div
                    className="gh-graph"
                    style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(10px, 1fr))` }}
                    onMouseLeave={() => setHoveredMonthKey(defaultMonthKey)}
                >
                    {columns.map((week, wIndex) => (
                        <div key={wIndex} className="gh-week">
                            {week.map((day, dIndex) => {
                                const monthKey = day.date.slice(0, 7);

                                return (
                                    <div
                                        key={`${wIndex}-${dIndex}`}
                                        className="gh-cell"
                                        data-level={getLevel(day.count)}
                                        title={`${day.date}: ${day.count} contributions`}
                                        onMouseEnter={() => setHoveredMonthKey(monthKey)}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            <div className="gh-graph-footer">
                <div className="gh-legend" aria-label="Contribution intensity legend">
                    <span className="gh-legend-label">Less</span>
                    <div className="gh-legend-boxes" aria-hidden="true">
                        {[0, 1, 2, 3, 4].map((level) => (
                            <span key={level} className="gh-legend-box" data-level={level} />
                        ))}
                    </div>
                    <span className="gh-legend-label">More</span>
                </div>
            </div>
        </div>
    );
};

export default ContributionGraph;
