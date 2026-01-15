import React, { useRef, useState, useEffect, useCallback } from 'react';
import { getGalleryItems } from '../queries/getGalleryItems';
import './Gallery.css';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from 'framer-motion';

/**
 * REFINED BRUTALISM with Interactive Features
 * Original aesthetic + magnetic cursor + lightbox
 */

// Magnetic cursor component
const MagneticCursor = ({ isHovering, cursorText }) => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="magnetic-cursor"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
            animate={{
                scale: isHovering ? 1 : 0.3,
                opacity: isHovering ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
        >
            <span className="cursor-text">{cursorText}</span>
        </motion.div>
    );
};

// Lightbox modal component
const Lightbox = ({ item, onClose }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
        >
            <motion.div
                className="lightbox-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            <motion.div
                className="lightbox-content"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
                <img
                    src={item.src}
                    alt={item.title}
                    className="lightbox-image"
                />

                <div className="lightbox-info">
                    <span className="lightbox-category">{item.category}</span>
                    <h2 className="lightbox-title">{item.title}</h2>
                </div>

                <motion.button
                    className="lightbox-close"
                    onClick={onClose}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

const Hero = () => {
    return (
        <header className="gallery-hero">
            <div className="gallery-hero-bg"></div>
            <div className="gallery-hero-content">
                <div className="hero-meta">
                    <span className="hero-label">VOL. 2026 // COLLECTION</span>
                    <span className="hero-label">SCROLL TO EXPLORE ↓</span>
                </div>

                <div className="hero-title-wrapper">
                    <motion.h1
                        className="hero-title"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        visual
                    </motion.h1>
                </div>
                <div className="hero-title-wrapper">
                    <motion.h1
                        className="hero-title"
                        style={{ marginLeft: '1.5em', color: 'transparent', WebkitTextStroke: '2px var(--plaster)' }}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        archive
                    </motion.h1>
                </div>

                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                >
                    A non-linear exploration of aesthetic experiments, photography,
                    and digital brutalism. Curated for impact.
                </motion.p>
            </div>
        </header>
    );
};

const GalleryItem = ({ item, index, onSelect, onHoverStart, onHoverEnd }) => {
    return (
        <motion.article
            className={`gallery-item ${item.spanCols} ${item.spanRows}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            onHoverStart={() => onHoverStart('View')}
            onHoverEnd={onHoverEnd}
            onClick={() => onSelect(item)}
        >
            <div className="item-image-container">
                <img src={item.src} alt={item.title} className="item-image" loading="lazy" />
            </div>
            <div className="item-overlay">
                <span className="item-id">{item.category}</span>
                <h3 className="item-title">{item.title}</h3>
            </div>
        </motion.article>
    );
};

const Gallery = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [cursorHovering, setCursorHovering] = useState(false);
    const [cursorText, setCursorText] = useState('View');

    // Load fonts
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Space+Mono:wght@400;700&family=Manrope:wght@300;400;600&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => document.head.removeChild(link);
    }, []);

    // Fetch gallery items
    const [galleryItems, setGalleryItems] = useState([]);
    useEffect(() => {
        const fetchItems = async () => {
            const items = await getGalleryItems();
            setGalleryItems(items);
        };
        fetchItems();
    }, []);

    const handleHoverStart = useCallback((text) => {
        setCursorText(text);
        setCursorHovering(true);
    }, []);

    const handleHoverEnd = useCallback(() => {
        setCursorHovering(false);
    }, []);

    return (
        <div className="gallery-page">
            <div className="gallery-grain"></div>

            {/* Magnetic cursor */}
            <MagneticCursor isHovering={cursorHovering} cursorText={cursorText} />

            <Hero />

            <section className="gallery-section">
                <div className="gallery-section-header">
                    <h2>Selected Works</h2>
                    <div className="line"></div>
                </div>

                <div className="gallery-grid">
                    {galleryItems.map((item, index) => (
                        <GalleryItem
                            key={item.id}
                            item={item}
                            index={index}
                            onSelect={setSelectedItem}
                            onHoverStart={handleHoverStart}
                            onHoverEnd={handleHoverEnd}
                        />
                    ))}
                </div>
            </section>

            {/* Visual Footer/Spacer */}
            <footer style={{ height: '20vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="hero-label" style={{ opacity: 0.5 }}>END OF TRANSMISSION</span>
            </footer>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedItem && (
                    <Lightbox
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
