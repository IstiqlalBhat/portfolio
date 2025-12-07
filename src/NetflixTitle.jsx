import React, { useEffect, useState } from 'react';
import './NetflixTitle.css';
import netflixSound from '../sound/error.mp3';
import { useNavigate } from 'react-router-dom';

const NetflixTitle = () => {
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();

    const handlePlaySound = () => {
        const audio = new Audio(netflixSound);
        audio.play().catch(error => console.error("Audio play error:", error));
        setIsClicked(true);
    };

    useEffect(() => {
        if (isClicked) {
            const timer = setTimeout(() => {
                navigate('/browse');
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [isClicked, navigate]);

    return (
        <div className="netflix-container" onClick={handlePlaySound}>
            {/* Netflix-style Logo */}
            <h1 className={`netflix-logo ${isClicked ? 'animate' : ''}`}>
                PORTFOLIO
            </h1>
            
            {!isClicked && (
                <div className="click-hint-intro">
                    <span className="tap-icon-intro">👆</span>
                    <span>Click to enter</span>
                </div>
            )}
        </div>
    );
};

export default NetflixTitle;
