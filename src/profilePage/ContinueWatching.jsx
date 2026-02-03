import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ContinueWatching.css';
import LiquidGlassScrollButton, { useScrollState } from '../components/LiquidGlassScrollButton';

const MotionLink = motion(Link);

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 40,
            damping: 20,
            mass: 1
        }
    }
};

const viewportConfig = { once: true, margin: "0px" };

const hoverAnimation = {
    scale: 1.05,
    zIndex: 10,
    boxShadow: "0 20px 50px -12px rgba(229, 9, 20, 0.7)",
    borderColor: "rgba(229, 9, 20, 0.5)"
};
const noHover = {};
const isHoverable = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

// Added progress percentages for Netflix-style "Continue Watching" progress bars
const continueWatchingConfig = {
    recruiter: [
        { title: "Music", imgSrc: "https://picsum.photos/id/1025/400/225", link: "/music", progress: 75 },
        { title: "Reading", imgSrc: "https://picsum.photos/id/1026/400/225", link: "/reading", progress: 45 },
        { title: "Research Papers", imgSrc: "https://picsum.photos/id/1027/400/225", link: "/research-papers", progress: 90 },
        { title: "Contact Me", imgSrc: "https://picsum.photos/id/1029/400/225", link: "/contact-me", progress: 30 }
    ],
    developer: [
        { title: "Music", imgSrc: "https://picsum.photos/id/1025/400/225", link: "/music", progress: 60 },
        { title: "Reading", imgSrc: "https://picsum.photos/id/1026/400/225", link: "/reading", progress: 35 },
        { title: "Research Papers", imgSrc: "https://picsum.photos/id/1027/400/225", link: "/research-papers", progress: 80 },
        { title: "Research Papers", imgSrc: "https://picsum.photos/id/1028/400/225", link: "/research-papers", progress: 25 },
        { title: "Contact Me", imgSrc: "https://picsum.photos/id/1029/400/225", link: "/contact-me", progress: 50 }
    ],
    stalker: [
        { title: "Reading", imgSrc: "https://picsum.photos/id/1026/400/225", link: "/reading", progress: 70 },
        { title: "Research Papers", imgSrc: "https://picsum.photos/id/1027/400/225", link: "/research-papers", progress: 40 },
        { title: "Contact Me", imgSrc: "https://picsum.photos/id/1029/400/225", link: "/contact-me", progress: 85 }
    ],
    adventurer: [
        { title: "Music", imgSrc: "https://picsum.photos/id/1025/400/225", link: "/music", progress: 55 },
        { title: "Reading", imgSrc: "https://picsum.photos/id/1026/400/225", link: "/reading", progress: 20 },
        { title: "Research Papers", imgSrc: "https://picsum.photos/id/1028/400/225", link: "/research-papers", progress: 95 },
        { title: "Contact Me", imgSrc: "https://picsum.photos/id/1029/400/225", link: "/contact-me", progress: 40 }
    ]
};

const ContinueWatching = ({ profile }) => {
    const continueWatching = continueWatchingConfig[profile];
    const scrollRef = useRef(null);
    const { canScrollLeft, canScrollRight, scrollLeft, scrollRight } = useScrollState(scrollRef);

    return (
        <div className="continue-watching-row">
            <h2 className="row-title">Continue Watching for {profile}</h2>
            <div className="card-row-wrapper">
                {/* Liquid Glass Scroll Button - Left */}
                <LiquidGlassScrollButton
                    direction="left"
                    onClick={scrollLeft}
                    visible={canScrollLeft}
                    pulse={!canScrollLeft && canScrollRight}
                />

                <motion.div
                    className="card-row"
                    ref={scrollRef}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportConfig}
                >
                    {continueWatching.map((pick, index) => (
                            <MotionLink
                                to={pick.link}
                                key={index}
                                className="pick-card"
                                style={{ '--progress': `${pick.progress}%` }}
                                variants={itemVariants}
                                whileHover={isHoverable ? hoverAnimation : noHover}
                                whileTap={{ scale: 0.95 }}
                            >
                                <img
                                    src={pick.imgSrc}
                                    alt={pick.title}
                                    className="pick-image"
                                    loading={index < 2 ? 'eager' : 'lazy'}
                                    decoding="async"
                                    fetchpriority={index < 2 ? 'high' : 'auto'}
                                />
                                <div className="overlay">
                                    <div className="pick-label">{pick.title}</div>
                                </div>
                                {/* Netflix-style progress bar */}
                                <div className="progress-container">
                                    <div className="progress-bar" style={{ width: `${pick.progress}%` }}></div>
                                </div>
                            </MotionLink>
                    ))}
                </motion.div>

                {/* Liquid Glass Scroll Button - Right */}
                <LiquidGlassScrollButton
                    direction="right"
                    onClick={scrollRight}
                    visible={canScrollRight}
                    pulse={canScrollRight}
                    shimmer={canScrollRight}
                />
            </div>
        </div>
    );
};

export default ContinueWatching;
