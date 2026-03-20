import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './NetflixTitle.css';
import netflixSound from './netflix-sound.mp3';
import logoImage from './images/logo-2.png';
import HomeSeoContent from './components/HomeSeoContent';
import NetflixWebGLBackground from './components/NetflixWebGLBackground';
import SEO from './components/SEO';
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
    const animStartTimeRef = useRef(0);

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
        audioRef.current = new Audio(netflixSound);
        audioRef.current.preload = 'auto';
        audioRef.current.load();

        return () => {
            if (navTimerRef.current) clearTimeout(navTimerRef.current);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const handleStart = () => {
        if (startedRef.current) return;
        startedRef.current = true;

        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => { });
        }

        setAnimate(true);
        animStartTimeRef.current = Date.now();
        navTimerRef.current = setTimeout(goBrowse, 4000);
    };

    return (
        <div className="netflix-page">
            <SEO {...seo} />
            <section
                className="netflix-container"
                role="button"
                tabIndex={0}
                onPointerDown={handleStart}
                onClick={handleStart}
                onTouchStart={handleStart}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        handleStart();
                    }
                }}
                aria-label="Open the portfolio experience"
            >
                <NetflixWebGLBackground />
                <p className="sr-only">Launch the interactive portfolio experience for Istiqlal Aurangzeb.</p>
                <img
                    src={logoImage}
                    alt="Istiqlal Aurangzeb Portfolio"
                    decoding="async"
                    fetchPriority="high"
                    className={`netflix-logo ${animate ? 'animate' : ''}`}
                    onAnimationEnd={(event) => {
                        if (!animate) return;
                        if (event.animationName !== 'zoomOut') return;

                        const elapsed = Date.now() - animStartTimeRef.current;
                        if (elapsed < 3000) return;

                        goBrowse();
                    }}
                />

                {!animate && (
                    <div className="click-hint-intro">
                        <span className="tap-icon-intro">Start</span>
                        <span>Click to enter</span>
                    </div>
                )}
            </section>

            <HomeSeoContent />
        </div>
    );
};

export default NetflixTitle;
