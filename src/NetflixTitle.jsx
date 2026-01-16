import React, { useEffect, useRef, useState } from 'react';
import './NetflixTitle.css';
import netflixSound from './netflix-sound.mp3';
import { useLocation, useNavigate } from 'react-router-dom';
import logoImage from './images/logo-2.png'; // Update with the path to your logo
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

    // Preload audio on mount for better desktop playback
    useEffect(() => {
        audioRef.current = new Audio(netflixSound);
        audioRef.current.preload = 'auto';
        // Load the audio buffer
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

        // Play preloaded audio - reset to start in case it was already played
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => { });
        }

        setAnimate(true);
        animStartTimeRef.current = Date.now();

        // Fallback timeout only if onAnimationEnd doesn't fire (e.g., animations blocked)
        // Always use full duration to let the animation complete
        navTimerRef.current = setTimeout(goBrowse, 4000);
    };

    return (
        <div
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
        >
            <SEO {...seo} />
            <NetflixWebGLBackground />
            <img
                src={logoImage}
                alt="Custom Logo"
                decoding="async"
                fetchpriority="high"
                className={`netflix-logo ${animate ? 'animate' : ''}`}
                onAnimationEnd={(e) => {
                    if (!animate) return;
                    // Only navigate when the zoomOut animation ends, not fadeIn
                    if (e.animationName !== 'zoomOut') return;
                    // Ensure animation has actually run (at least 3s of the 3.5s animation)
                    const elapsed = Date.now() - animStartTimeRef.current;
                    if (elapsed < 3000) return;
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
