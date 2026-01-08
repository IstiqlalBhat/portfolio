import React from 'react';
import { GitCommit, Star, GitFork, Book, MessageSquare, GitPullRequest, GitBranch } from 'lucide-react';
import './Github.css';

const trimMessage = (message = '') => message.split('\n')[0].trim();
const formatDate = (dateString) => new Date(dateString).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
});

const buildCommitUrl = (repoFullName, commit) => {
    if (!commit?.sha) return null;
    return `https://github.com/${repoFullName}/commit/${commit.sha}`;
};

const CommitHistory = ({ events }) => {
    // Show all events but limit to 10
    const githubActivity = events.slice(0, 10);

    if (githubActivity.length === 0) {
        return (
            <div className="gh-empty">
                No recent activity detected.
                <br />
                <span style={{ fontSize: '0.6rem', marginTop: '10px', display: 'block', opacity: 0.5 }}>
                    (Check browser console for API errors)
                </span>
            </div>
        );
    }

    const getEventDisplay = (event) => {
        const repoFullName = event.repo?.name || '';
        const repo = repoFullName.split('/')[1] || repoFullName;
        const repoUrl = `https://github.com/${repoFullName}`;
        const branchName = event.payload?.ref?.replace('refs/heads/', '') || event.payload?.ref || 'main';

        switch (event.type) {
            case 'PushEvent': {
                const commits = event.payload?.commits || [];
                const primaryCommit = commits[commits.length - 1] || commits[0];
                const message = trimMessage(primaryCommit?.message) || `Pushed to ${repo}`;
                const meta = `${branchName} • ${commits.length || event.payload?.size || 1} commit${(commits.length || event.payload?.size || 1) > 1 ? 's' : ''}`;
                return {
                    icon: <GitCommit size={14} className="gh-icon" />,
                    message,
                    url: buildCommitUrl(repoFullName, primaryCommit) || repoUrl,
                    meta
                };
            }
            case 'PullRequestEvent': {
                const pr = event.payload?.pull_request;
                return {
                    icon: <GitPullRequest size={14} className="gh-icon" />,
                    message: pr?.title || `Pull request in ${repo}`,
                    url: pr?.html_url || repoUrl,
                    meta: pr ? `PR #${pr.number} • ${pr.state}` : 'Pull request'
                };
            }
            case 'CreateEvent':
                return {
                    icon: <Book size={14} className="gh-icon" />,
                    message: `Created ${event.payload?.ref_type || 'repository'} ${event.payload?.ref || ''}`,
                    url: repoUrl,
                    meta: `in ${repo}`
                };
            case 'WatchEvent':
                return {
                    icon: <Star size={14} className="gh-icon" />,
                    message: `Starred ${repo}`,
                    url: repoUrl,
                    meta: 'Watch'
                };
            case 'ForkEvent':
                return {
                    icon: <GitFork size={14} className="gh-icon" />,
                    message: `Forked ${repo}`,
                    url: repoUrl,
                    meta: 'Fork'
                };
            case 'DeleteEvent':
                return {
                    icon: <GitBranch size={14} className="gh-icon" />,
                    message: `Deleted ${event.payload?.ref_type || 'ref'} ${event.payload?.ref || ''}`,
                    url: repoUrl,
                    meta: `from ${repo}`
                };
            default:
                return {
                    icon: <MessageSquare size={14} className="gh-icon" />,
                    message: `${event.type.replace('Event', '')} in ${repo}`,
                    url: repoUrl,
                    meta: repo
                };
        }
    };

    return (
        <div className="gh-commits gh-scroll">
            {githubActivity.map((event) => {
                const repoFullName = event.repo?.name || '';
                const display = getEventDisplay(event);

                return (
                    <div key={event.id} className="gh-commit-item">
                        <div className="gh-icon-wrap">{display.icon}</div>
                        <div style={{ flexGrow: 1, minWidth: 0 }}>
                            <a
                                href={display.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="gh-commit-msg"
                                title={display.message}
                            >
                                {display.message}
                            </a>
                            <div className="gh-footer" style={{ border: 'none', padding: '0', marginTop: '6px' }}>
                                <span className="gh-repo-tag">{repoFullName}</span>
                                {display.meta && <span className="gh-meta-line">{display.meta}</span>}
                                <span>{formatDate(event.created_at)}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CommitHistory;
