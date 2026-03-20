import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './TopPicksRow.css';
import { FaPassport, FaCode, FaBriefcase, FaCertificate, FaHandsHelping, FaProjectDiagram, FaEnvelope, FaMusic, FaBook, FaImages, FaStar } from 'react-icons/fa';
import { getPrimaryFeatured } from '../queries/getFeatured';
import LiquidGlassScrollButton, { useScrollState } from '../components/LiquidGlassScrollButton';

// Updated image URLs with 16:9 aspect ratio for Netflix-style wider cards
const getTopPicksConfig = (featuredItem) => ({
    recruiter: [
        { title: "Featured", image: featuredItem?.image?.url ? `${featuredItem.image.url}?w=640&h=360&fit=crop` : "https://picsum.photos/seed/scrollytelling/400/225", route: "/latest-project", isNew: true, icon: <FaStar />, github: featuredItem?.github, link: featuredItem?.link },
        { title: "Work Permit", imgSrc: "https://picsum.photos/seed/workpermit/400/225", icon: <FaPassport />, route: "/work-permit" },
        { title: "Experience", imgSrc: "https://picsum.photos/seed/workexperience/400/225", icon: <FaBriefcase />, route: "/work-experience" },
        { title: "Projects", imgSrc: "https://picsum.photos/seed/projects/400/225", icon: <FaProjectDiagram />, route: "/projects" },
        { title: "Skills", imgSrc: "https://picsum.photos/seed/skills/400/225", icon: <FaCode />, route: "/skills" },
        { title: "Research Papers", imgSrc: "https://picsum.photos/seed/certifications/400/225", icon: <FaCertificate />, route: "/research-papers" },
        { title: "Recommendations", imgSrc: "https://picsum.photos/seed/recommendations/400/225", icon: <FaHandsHelping />, route: "/recommendations" },
        { title: "Contact Me", imgSrc: "https://picsum.photos/seed/contact/400/225", icon: <FaEnvelope />, route: "/contact-me" },
        { title: "Gallery", imgSrc: "https://picsum.photos/seed/gallery/400/225", icon: <FaImages />, route: "/gallery" }
    ],
    developer: [
        { title: "Featured", image: featuredItem?.image?.url ? `${featuredItem.image.url}?w=640&h=360&fit=crop` : "https://picsum.photos/seed/scrollytelling/400/225", route: "/latest-project", isNew: true, icon: <FaStar />, github: featuredItem?.github, link: featuredItem?.link },
        { title: "Projects", imgSrc: "https://picsum.photos/seed/development/400/225", route: "/projects", icon: <FaProjectDiagram /> },
        { title: "Skills", imgSrc: "https://picsum.photos/seed/coding/400/225", route: "/skills", icon: <FaCode /> },
        { title: "Research Papers", imgSrc: "https://picsum.photos/seed/badge/400/225", route: "/research-papers", icon: <FaCertificate /> },
        { title: "Experience", imgSrc: "https://picsum.photos/seed/work/400/225", route: "/work-experience", icon: <FaBriefcase /> },
        { title: "Recommendations", imgSrc: "https://picsum.photos/seed/networking/400/225", route: "/recommendations", icon: <FaHandsHelping /> },
        { title: "Contact Me", imgSrc: "https://picsum.photos/seed/connect/400/225", route: "/contact-me", icon: <FaEnvelope /> },
        { title: "Gallery", imgSrc: "https://picsum.photos/seed/gallery/400/225", icon: <FaImages />, route: "/gallery" }
    ],
    stalker: [
        { title: "Featured", image: featuredItem?.image?.url ? `${featuredItem.image.url}?w=640&h=360&fit=crop` : "https://picsum.photos/seed/scrollytelling/400/225", route: "/latest-project", isNew: true, icon: <FaStar />, github: featuredItem?.github, link: featuredItem?.link },
        { title: "Projects", imgSrc: "https://picsum.photos/seed/planning/400/225", route: "/projects", icon: <FaProjectDiagram /> },
        { title: "Gallery", imgSrc: "https://picsum.photos/seed/gallery/400/225", icon: <FaImages />, route: "/gallery" },
        { title: "Recommendations", imgSrc: "https://picsum.photos/seed/networking/400/225", route: "/recommendations", icon: <FaHandsHelping /> },
        { title: "Experience", imgSrc: "https://picsum.photos/seed/resume/400/225", route: "/work-experience", icon: <FaBriefcase /> },
        { title: "Research Papers", imgSrc: "https://picsum.photos/seed/achievements/400/225", route: "/research-papers", icon: <FaCertificate /> },
        { title: "Contact Me", imgSrc: "https://picsum.photos/seed/call/400/225", route: "/contact-me", icon: <FaEnvelope /> },
    ],
    adventurer: [
        { title: "Featured", image: featuredItem?.image?.url ? `${featuredItem.image.url}?w=640&h=360&fit=crop` : "https://picsum.photos/seed/scrollytelling/400/225", route: "/latest-project", isNew: true, icon: <FaStar />, github: featuredItem?.github, link: featuredItem?.link },
        { title: "Gallery", imgSrc: "https://picsum.photos/seed/gallery/400/225", route: "/gallery", icon: <FaImages /> },
        { title: "Music", imgSrc: "https://picsum.photos/seed/music/400/225", route: "/music" },
        { title: "Reading", imgSrc: "https://picsum.photos/seed/books/400/225", route: "/reading", icon: <FaBook /> },
        { title: "Projects", imgSrc: "https://picsum.photos/seed/innovation/400/225", route: "/projects", icon: <FaProjectDiagram /> },
        { title: "Research Papers", imgSrc: "https://picsum.photos/seed/medal/400/225", route: "/research-papers", icon: <FaCertificate /> },
        { title: "Contact Me", imgSrc: "https://picsum.photos/seed/connect/400/225", route: "/contact-me", icon: <FaEnvelope /> }
    ]
});


const TopPicksRow = ({ profile }) => {
    const navigate = useNavigate();
    const [featuredItem, setFeaturedItem] = useState(null);
    const scrollRef = useRef(null);
    const { canScrollLeft, canScrollRight, scrollLeft, scrollRight } = useScrollState(scrollRef);

    useEffect(() => {
        async function fetchFeatured() {
            try {
                const data = await getPrimaryFeatured();
                setFeaturedItem(data);
            } catch (error) {
                console.error("Error fetching featured:", error);
            }
        }
        fetchFeatured();
    }, []);

    const topPicksConfig = getTopPicksConfig(featuredItem);
    const topPicks = topPicksConfig[profile];

    const handleCardClick = (pick) => {
        if (pick.route?.startsWith('http')) {
            window.open(pick.route, '_blank');
        } else if (pick.route) {
            navigate(pick.route);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 15 } }
    };

    return (
        <motion.div
            className="top-picks-row"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <h2 className="row-title">Today's Top Picks for {profile}</h2>
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
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {topPicks.map((pick, index) => (
                        <motion.div
                            key={index}
                            className="pick-card"
                            onClick={() => handleCardClick(pick)}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                y: -8,
                                zIndex: 10,
                                boxShadow: "0 20px 50px -12px rgba(229, 9, 20, 0.7)",
                                borderColor: "rgba(229, 9, 20, 0.5)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {pick.isNew && <div className="new-badge">New</div>}
                            <img
                                src={pick.imgSrc || pick.image}
                                alt={pick.title}
                                className="pick-image"
                                loading={index < 2 ? 'eager' : 'lazy'}
                                decoding="async"
                                fetchPriority={index < 2 ? 'high' : 'auto'}
                            />
                            <div className="overlay">
                                <div className="pick-label">{pick.title}</div>
                                {pick.isNew && (pick.github || pick.link) && (
                                    <div className="pick-links">
                                        {pick.github && (
                                            <div
                                                className="pick-action-btn"
                                                onClick={(e) => { e.stopPropagation(); window.open(pick.github, '_blank'); }}
                                                title="GitHub"
                                            >
                                                <FaCode />
                                            </div>
                                        )}
                                        {pick.link && (
                                            <div
                                                className="pick-action-btn filled"
                                                onClick={(e) => { e.stopPropagation(); window.open(pick.link, '_blank'); }}
                                                title="Live Demo"
                                            >
                                                <FaProjectDiagram />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
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
        </motion.div>
    );
};

export default TopPicksRow;
