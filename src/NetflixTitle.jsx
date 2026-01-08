import React, { useEffect, useState } from 'react';
import './NetflixTitle.css';
import netflixSound from './netflix-sound.mp3';
import { useNavigate } from 'react-router-dom';
import logoImage from './images/logo-2.png'; // Update with the path to your logo
import NetflixWebGLBackground from './components/NetflixWebGLBackground';
import { shouldPrefetch } from './utils/performance';

const NetflixTitle = () => {
    const [animate, setAnimate] = useState(false);
    const navigate = useNavigate();

    const handleStart = () => {
        if (animate) return; // Prevent double clicks

        if (shouldPrefetch()) {
            import('./browse/browse');
        }

        const audio = new Audio(netflixSound);
        audio.play().catch(e => console.error("Audio play error", e));

        setAnimate(true);

        // Wait for sound to play full (approx 4s for standard intro) before navigating
        const navTimer = setTimeout(() => {
            navigate('/browse');
        }, 4000);

        return () => clearTimeout(navTimer);
    };

    return (
        <div className="netflix-container" onClick={handleStart}>
            <NetflixWebGLBackground />
            <img
                src={logoImage}
                alt="Custom Logo"
                decoding="async"
                fetchpriority="high"
                className={`netflix-logo ${animate ? 'animate' : ''}`}
            />

            {!animate && (
                <div className="click-hint-intro">
                    <span className="tap-icon-intro">👆</span>
                    <span>Click to enter</span>
                </div>
            )}
        </div>
    );
};

export default NetflixTitle;
