import React from 'react';
import { Link } from 'react-router-dom';
import resumeData from '../data/resume.json';
import { PERSON_NAME, PERSON_ROLE, SOCIAL_LINKS } from '../content/siteMeta';
import './HomeSeoContent.css';

const focusAreas = [
    {
        title: 'AI systems',
        description: 'Applied machine learning, document extraction, semantic search, and research software for production-style workflows.',
        href: '/projects',
    },
    {
        title: 'Blockchain engineering',
        description: 'Smart contracts, emissions ledgers, procurement systems, and on-chain analytics connected to real-world research.',
        href: '/research-papers',
    },
    {
        title: 'Full-stack products',
        description: 'React, Next.js, FastAPI, Node.js, cloud deployment, and high-polish interactive web experiences.',
        href: '/skills',
    },
];

const highlightPoints = [
    'Research Software Developer at Clemson University',
    'Published in Automation in Construction',
    'Portfolio spanning AI, blockchain, and full-stack development',
];

const skillHighlights = [
    ...resumeData.skills.Programming_Languages,
    ...resumeData.skills.Frontend,
    ...resumeData.skills.Backend,
    ...resumeData.skills.Blockchain_Web3,
].slice(0, 12);

const featuredProjects = resumeData.projects.slice(0, 3);
const featuredPublications = resumeData.publications.slice(0, 2);

const HomeSeoContent = () => {
    return (
        <main id="home-overview" className="home-seo-content">
            <section className="home-seo-hero">
                <p className="home-seo-kicker">Official portfolio</p>
                <h1 className="home-seo-title">{PERSON_NAME}</h1>
                <p className="home-seo-summary">
                    {PERSON_ROLE} building AI products, blockchain systems, and full-stack web experiences with a research-driven approach.
                </p>

                <div className="home-seo-actions">
                    <Link className="home-seo-primary" to="/profile/recruiter">Open recruiter view</Link>
                    <Link className="home-seo-secondary" to="/projects">See projects</Link>
                    <a
                        className="home-seo-secondary"
                        href="/assets/docs/Istiqlal_Aurangzeb_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download resume
                    </a>
                </div>

                <ul className="home-seo-proof-list">
                    {highlightPoints.map((point) => (
                        <li key={point}>{point}</li>
                    ))}
                </ul>
            </section>

            <section className="home-seo-section">
                <div className="home-seo-section-head">
                    <h2>What I build</h2>
                    <Link to="/browse">Browse the portfolio</Link>
                </div>
                <div className="home-seo-card-grid">
                    {focusAreas.map((area) => (
                        <article key={area.title} className="home-seo-card">
                            <h3>{area.title}</h3>
                            <p>{area.description}</p>
                            <Link to={area.href}>Explore</Link>
                        </article>
                    ))}
                </div>
            </section>

            <section className="home-seo-section">
                <div className="home-seo-section-head">
                    <h2>Selected projects</h2>
                    <Link to="/projects">View all projects</Link>
                </div>
                <div className="home-seo-card-grid">
                    {featuredProjects.map((project) => (
                        <article key={project.title} className="home-seo-card">
                            <p className="home-seo-meta">{project.date} | {project.subtitle}</p>
                            <h3>{project.title}</h3>
                            <p>{project.details?.[0]}</p>
                            <div className="home-seo-inline-links">
                                <Link to="/projects">Portfolio details</Link>
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer">Live demo</a>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="home-seo-section home-seo-two-column">
                <article className="home-seo-panel">
                    <div className="home-seo-section-head">
                        <h2>Publications</h2>
                        <Link to="/research-papers">Research page</Link>
                    </div>
                    <ul className="home-seo-list">
                        {featuredPublications.map((publication) => (
                            <li key={publication.link}>
                                <a href={publication.link} target="_blank" rel="noopener noreferrer">
                                    {publication.citation}
                                </a>
                            </li>
                        ))}
                    </ul>
                </article>

                <article className="home-seo-panel">
                    <div className="home-seo-section-head">
                        <h2>Core skills</h2>
                        <Link to="/skills">Skills page</Link>
                    </div>
                    <div className="home-seo-skill-cloud">
                        {skillHighlights.map((skill) => (
                            <span key={skill}>{skill}</span>
                        ))}
                    </div>
                </article>
            </section>

            <section className="home-seo-section home-seo-contact">
                <div className="home-seo-section-head">
                    <h2>Find me online</h2>
                    <Link to="/contact-me">Contact page</Link>
                </div>
                <div className="home-seo-inline-links">
                    <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href={SOCIAL_LINKS.scholar} target="_blank" rel="noopener noreferrer">Google Scholar</a>
                    <a href={`mailto:${resumeData.profile.contact.email}`}>{resumeData.profile.contact.email}</a>
                </div>
            </section>
        </main>
    );
};

export default HomeSeoContent;
