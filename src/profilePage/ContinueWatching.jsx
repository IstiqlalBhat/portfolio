import React from 'react';
import { Link } from 'react-router-dom';
import './ContinueWatching.css';

// Added progress percentages for Netflix-style "Continue Watching" progress bars
const continueWatchingConfig = {
    recruiter: [
        { title: "Music", imgSrc: "https://picsum.photos/id/1025/400/225", link: "/music", progress: 75 },
        { title: "Reading", imgSrc: "https://picsum.photos/id/1026/400/225", link: "/reading", progress: 45 },
        { title: "Research Papers", imgSrc: "https://picsum.photos/id/1027/400/225", link: "/research-papers", progress: 90 },
        { title: "Contact Me", imgSrc: "https://picsum.photos/id/1029/400/225", link: "/contact-me", progress: 30 }
    ],
    developer: [
        { title: "Music", imgSrc: "https://picsum.photos/id/1025/400/225", link: "/music", progress: 60 },
        { title: "Reading", imgSrc: "https://picsum.photos/id/1026/400/225", link: "/reading", progress: 35 },
        { title: "Research Papers", imgSrc: "https://picsum.photos/id/1027/400/225", link: "/research-papers", progress: 80 },
        { title: "Research Papers", imgSrc: "https://picsum.photos/id/1028/400/225", link: "/research-papers", progress: 25 },
        { title: "Contact Me", imgSrc: "https://picsum.photos/id/1029/400/225", link: "/contact-me", progress: 50 }
    ],
    stalker: [
        { title: "Reading", imgSrc: "https://picsum.photos/id/1026/400/225", link: "/reading", progress: 70 },
        { title: "Research Papers", imgSrc: "https://picsum.photos/id/1027/400/225", link: "/research-papers", progress: 40 },
        { title: "Contact Me", imgSrc: "https://picsum.photos/id/1029/400/225", link: "/contact-me", progress: 85 }
    ],
    adventurer: [
        { title: "Music", imgSrc: "https://picsum.photos/id/1025/400/225", link: "/music", progress: 55 },
        { title: "Reading", imgSrc: "https://picsum.photos/id/1026/400/225", link: "/reading", progress: 20 },
        { title: "Research Papers", imgSrc: "https://picsum.photos/id/1028/400/225", link: "/research-papers", progress: 95 },
        { title: "Contact Me", imgSrc: "https://picsum.photos/id/1029/400/225", link: "/contact-me", progress: 40 }
    ]
};

const ContinueWatching = ({ profile }) => {
    const continueWatching = continueWatchingConfig[profile];

    return (
        <div className="continue-watching-row">
            <h2 className="row-title">Continue Watching for {profile}</h2>
            <div className="card-row">
                {continueWatching.map((pick, index) => (
                    <Link 
                        to={pick.link} 
                        key={index} 
                        className="pick-card"
                        style={{ '--progress': `${pick.progress}%` }}
                    >
                        <img
                            src={pick.imgSrc}
                            alt={pick.title}
                            className="pick-image"
                            loading={index < 2 ? 'eager' : 'lazy'}
                            decoding="async"
                            fetchpriority={index < 2 ? 'high' : 'auto'}
                        />
                        <div className="overlay">
                            <div className="pick-label">{pick.title}</div>
                        </div>
                        {/* Netflix-style progress bar */}
                        <div className="progress-container">
                            <div className="progress-bar" style={{ width: `${pick.progress}%` }}></div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ContinueWatching;
