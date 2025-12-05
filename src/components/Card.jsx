import React, { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import './Card.css';

const Card = ({ item, type }) => {
    const [isHovered, setIsHovered] = useState(false);

    const renderContent = () => {
        if (type === 'skills') {
            return (
                <div className="card-content skill-card">
                    <h3>{item}</h3>
                </div>
            );
        }

        return (
            <>
                <div className="card-image-placeholder" style={{ backgroundImage: `url(${item.image || '/assets/project_tech_bg.png'})`, backgroundSize: 'cover' }}>
                    <span className="card-title-overlay">{item.title || item.role || item.company}</span>
                </div>
                <div className="card-info">
                    <div className="card-icons">
                        <div className="left-icons">
                            {item.link && (
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="icon-btn filled" title="Live Demo">
                                    <Play size={12} fill="currentColor" />
                                </a>
                            )}
                            {item.github && (
                                <a href={item.github} target="_blank" rel="noopener noreferrer" className="icon-btn" title="GitHub Repo">
                                    <Code size={12} />
                                </a>
                            )}
                            <button className="icon-btn"><ThumbsUp size={12} /></button>
                        </div>
                        <button className="icon-btn"><ChevronDown size={12} /></button>
                    </div>
                    <div className="card-meta">
                        <span className="match-score">98% Match</span>
                        <span className="age-rating">{item.date || item.duration}</span>
                        <span className="hd-badge">HD</span>
                    </div>
                    <div className="card-genres">
                        <ul>
                            {item.subtitle && <li>{item.subtitle}</li>}
                            {item.location && <li>{item.location}</li>}
                        </ul>
                    </div>
                </div>
            </>
        );
    };

    return (
        <motion.div
            className="card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.4, zIndex: 99, transition: { duration: 0.3, delay: 0.2 } }}
            layout
        >
            {renderContent()}
        </motion.div>
    );
};

export default Card;
