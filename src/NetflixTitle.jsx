import React, { useEffect, useRef, useState } from 'react';
import './NetflixTitle.css';
import netflixSound from './netflix-sound.mp3';
import { useLocation, useNavigate } from 'react-router-dom';
import logoImage from './images/logo-2.png'; // Update with the path to your logo
import NetflixWebGLBackground from './components/NetflixWebGLBackground';
import SEO from './components/SEO';
import { prefersReducedMotion } from './utils/performance';
import { getSeoForPath } from './utils/seo';

const NetflixTitle = () => {
    const [animate, setAnimate] = useState(false);
    const { pathname } = useLocation();
    const seo = getSeoForPath(pathname);
    const navigate = useNavigate();
    const startedRef = useRef(false);
    const navigatedRef = useRef(false);
    const navTimerRef = useRef(null);
    const audioRef = useRef(null);

    const goBrowse = () => {
        if (navigatedRef.current) return;
        navigatedRef.current = true;
        if (navTimerRef.current) {
            clearTimeout(navTimerRef.current);
            navTimerRef.current = null;
        }
        navigate('/browse');
    };

    useEffect(() => {
        return () => {
            if (navTimerRef.current) clearTimeout(navTimerRef.current);
            if (audioRef.current) audioRef.current.pause();
        };
    }, []);

    const handleStart = () => {
        if (startedRef.current) return;
        startedRef.current = true;

        const reducedMotion = prefersReducedMotion();

        audioRef.current = new Audio(netflixSound);
        audioRef.current.play().catch(() => { });

        setAnimate(true);

        // Prefer anim end; keep a fallback in case animations are blocked.
        const fallbackDelayMs = reducedMotion ? 500 : 4500;
        navTimerRef.current = setTimeout(goBrowse, fallbackDelayMs);
    };

    return (
        <div
            className="netflix-container"
            role="button"
            tabIndex={0}
            onPointerDown={handleStart}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleStart();
                }
            }}
        >
            <SEO {...seo} />
            <NetflixWebGLBackground />
            <img
                src={logoImage}
                alt="Custom Logo"
                decoding="async"
                fetchpriority="high"
                className={`netflix-logo ${animate ? 'animate' : ''}`}
                onAnimationEnd={() => {
                    if (!animate) return;
                    goBrowse();
                }}
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
