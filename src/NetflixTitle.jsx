import React, { useEffect, useState } from 'react';
import './NetflixTitle.css';
// import netflixSound from './netflix-sound.mp3'; // TODO: Add sound file
import { useNavigate } from 'react-router-dom';
// import logoImage from '../src/images/logo-2.png'; // TODO: Add logo image

const NetflixTitle = () => {
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();

    const handlePlaySound = () => {
        // const audio = new Audio(netflixSound);
        // audio.play().catch(error => console.error("Audio play error:", error));
        setIsClicked(true); // Starts animation after clicking
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
            {/* <img 
        src={logoImage} 
        alt="Custom Logo" 
        className={`netflix-logo ${isClicked ? 'animate' : ''}`} 
      /> */}
            <h1 className={`netflix-logo ${isClicked ? 'animate' : ''}`} style={{ color: 'red', fontSize: '4rem' }}>PORTFOLIO</h1>
        </div>
    );
};

export default NetflixTitle;
