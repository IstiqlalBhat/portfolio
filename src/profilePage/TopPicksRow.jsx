import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopPicksRow.css';
import { FaPassport, FaCode, FaBriefcase, FaCertificate, FaHandsHelping, FaProjectDiagram, FaEnvelope, FaMusic, FaBook } from 'react-icons/fa';

const topPicksConfig = {
    recruiter: [
        { title: "Van Gogh Grad", image: "https://picsum.photos/seed/vangogh/250/200", route: "/latest-project", github: "https://github.com/IstiqlalBhat/van-gogh", isNew: true },
        { title: "Work Permit", imgSrc: "https://picsum.photos/seed/workpermit/250/200", icon: <FaPassport />, route: "/work-permit" },
        { title: "Skills", imgSrc: "https://picsum.photos/seed/skills/250/200", icon: <FaCode />, route: "/skills" },
        { title: "Experience", imgSrc: "https://picsum.photos/seed/workexperience/250/200", icon: <FaBriefcase />, route: "/work-experience" },
        { title: "Research Papers", imgSrc: "https://picsum.photos/seed/certifications/250/200", icon: <FaCertificate />, route: "/research-papers" },
        { title: "Recommendations", imgSrc: "https://picsum.photos/seed/recommendations/250/200", icon: <FaHandsHelping />, route: "/recommendations" },
        { title: "Projects", imgSrc: "https://picsum.photos/seed/projects/250/200", icon: <FaProjectDiagram />, route: "/projects" },
        { title: "Contact Me", imgSrc: "https://picsum.photos/seed/contact/250/200", icon: <FaEnvelope />, route: "/contact-me" }
    ],
    developer: [
        { title: "Van Gogh Grad", image: "https://picsum.photos/seed/vangogh/250/200", route: "/latest-project", github: "https://github.com/IstiqlalBhat/van-gogh", isNew: true },
        { title: "Skills", imgSrc: "https://picsum.photos/seed/coding/250/200", route: "/skills", icon: <FaCode /> },
        { title: "Projects", imgSrc: "https://picsum.photos/seed/development/250/200", route: "/projects", icon: <FaProjectDiagram /> },
        { title: "Research Papers", imgSrc: "https://picsum.photos/seed/badge/250/200", route: "/research-papers", icon: <FaCertificate /> },
        { title: "Experience", imgSrc: "https://picsum.photos/seed/work/250/200", route: "/work-experience", icon: <FaBriefcase /> },
        { title: "Recommendations", imgSrc: "https://picsum.photos/seed/networking/250/200", route: "/recommendations", icon: <FaHandsHelping /> },
        { title: "Contact Me", imgSrc: "https://picsum.photos/seed/connect/250/200", route: "/contact-me", icon: <FaEnvelope /> }
    ],
    stalker: [
        { title: "Van Gogh Grad", image: "https://picsum.photos/seed/vangogh/250/200", route: "/latest-project", github: "https://github.com/IstiqlalBhat/van-gogh", isNew: true },
        { title: "Recommendations", imgSrc: "https://picsum.photos/seed/networking/250/200", route: "/recommendations", icon: <FaHandsHelping /> },
        { title: "Contact Me", imgSrc: "https://picsum.photos/seed/call/250/200", route: "/contact-me", icon: <FaEnvelope /> },
        { title: "Projects", imgSrc: "https://picsum.photos/seed/planning/250/200", route: "/projects", icon: <FaProjectDiagram /> },
        { title: "Experience", imgSrc: "https://picsum.photos/seed/resume/250/200", route: "/work-experience", icon: <FaBriefcase /> },
        { title: "Research Papers", imgSrc: "https://picsum.photos/seed/achievements/250/200", route: "/research-papers", icon: <FaCertificate /> },
    ],
    adventure: [
        { title: "Van Gogh Grad", image: "https://picsum.photos/seed/vangogh/250/200", route: "/latest-project", github: "https://github.com/IstiqlalBhat/van-gogh", isNew: true },
        { title: "Music", imgSrc: "https://picsum.photos/seed/music/250/200", route: "/music" },
        { title: "Projects", imgSrc: "https://picsum.photos/seed/innovation/250/200", route: "/projects", icon: <FaProjectDiagram /> },
        { title: "Reading", imgSrc: "https://picsum.photos/seed/books/250/200", route: "/reading", icon: <FaBook /> },
        { title: "Contact Me", imgSrc: "https://picsum.photos/seed/connect/250/200", route: "/contact-me", icon: <FaEnvelope /> },
        { title: "Research Papers", imgSrc: "https://picsum.photos/seed/medal/250/200", route: "/research-papers", icon: <FaCertificate /> }
    ]
};


const TopPicksRow = ({ profile }) => {
    const navigate = useNavigate();
    const topPicks = topPicksConfig[profile];

    const handleCardClick = (pick) => {
        if (pick.route?.startsWith('http')) {
            window.open(pick.route, '_blank');
        } else if (pick.route) {
            navigate(pick.route);
        }
    };

    return (
        <div className="top-picks-row">
            <h2 className="row-title">Today's Top Picks for {profile}</h2>
            <div className="card-row">
                {topPicks.map((pick, index) => (
                    <div
                        key={index}
                        className="pick-card"
                        onClick={() => handleCardClick(pick)}
                        style={{ animationDelay: `${index * 0.2}s` }}
                    >
                        {pick.isNew && <div className="new-badge">New</div>}
                        <img src={pick.imgSrc || pick.image} alt={pick.title} className="pick-image" />
                        <div className="overlay">
                            <div className="pick-label">{pick.title}</div>
                            {pick.isNew && (pick.github || pick.link) && (
                                <div className="pick-links">
                                    {pick.github && (
                                        <div
                                            className="pick-action-btn"
                                            onClick={(e) => { e.stopPropagation(); window.open(pick.github, '_blank'); }}
                                            title="GitHub"
                                        >
                                            <FaCode />
                                        </div>
                                    )}
                                    {pick.link && (
                                        <div
                                            className="pick-action-btn filled"
                                            onClick={(e) => { e.stopPropagation(); window.open(pick.link, '_blank'); }}
                                            title="Live Demo"
                                        >
                                            <FaProjectDiagram />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopPicksRow;
