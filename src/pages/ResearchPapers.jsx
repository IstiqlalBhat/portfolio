import React, { useEffect, useState } from 'react';
import './ResearchPapers.css';
import { FaBookOpen, FaExternalLinkAlt } from 'react-icons/fa';
import { getResearchPapers } from '../queries/getResearchPapers';

const ResearchPapers = () => {
    const [papers, setPapers] = useState([]);

    useEffect(() => {
        async function fetchPapers() {
            try {
                const data = await getResearchPapers();
                setPapers(data);
            } catch (error) {
            }
        }
        fetchPapers();
    }, []);

    if (papers.length === 0) return <div>Loading...</div>;

    return (
        <div className="papers-container">
            <h2 className="papers-title">📄 Research Papers</h2>
            <p className="papers-intro">Selected publications in Automation in Construction.</p>
            <div className="papers-grid">
                {papers.map((paper, index) => (
                    <a href={paper.link} key={index} target="_blank" rel="noopener noreferrer" className="paper-card" style={{ '--delay': `${index * 0.2}s` }}>
                        <div className="paper-icon animated-icon"><FaBookOpen /></div>
                        <div className="paper-info animated-text">
                            <h3 className="paper-title">{paper.title}</h3>
                            <p className="paper-citation">{paper.citation}</p>
                            <span className="paper-journal">{paper.journal} • {paper.year}</span>
                        </div>
                        <div className="paper-link-icon">
                            <FaExternalLinkAlt />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ResearchPapers;
