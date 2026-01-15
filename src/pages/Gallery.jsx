import React, { useRef, useState, useEffect, useCallback } from 'react';
import { getGalleryItems } from '../queries/getGalleryItems';
import './Gallery.css';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from 'framer-motion';

// HLS Video Player component with dynamic import for production compatibility
const HLSVideoPlayer = ({ src, poster }) => {
    const videoRef = useRef(null);
    const [error, setError] = useState(null);
    const hlsRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !src) return;

        // Check for native HLS support first (Safari, iOS, some Android)
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;
            video.addEventListener('loadedmetadata', () => {
                video.play().catch(e => console.log('Autoplay prevented:', e));
            });
            return;
        }

        // Dynamic import hls.js for browsers that need it (Chrome, Firefox, Edge)
        import('hls.js').then(({ default: Hls }) => {
            if (!Hls.isSupported()) {
                setError('HLS not supported in this browser');
                return;
            }

            const hls = new Hls({
                enableWorker: false, // Disable worker for better production compatibility
                lowLatencyMode: false,
                backBufferLength: 90,
            });

            hlsRef.current = hls;
            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch(e => console.log('Autoplay prevented:', e));
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                console.error('HLS Error:', data);
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.log('Network error, attempting recovery...');
                            hls.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.log('Media error, attempting recovery...');
                            hls.recoverMediaError();
                            break;
                        default:
                            setError('Video playback error');
                            hls.destroy();
                            break;
                    }
                }
            });
        }).catch(err => {
            console.error('Failed to load hls.js:', err);
            setError('Failed to load video player');
        });

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };
    }, [src]);

    if (error) {
        return <div className="video-error">{error}</div>;
    }

    return (
        <video
            ref={videoRef}
            poster={poster}
            controls
            playsInline
        />
    );
};

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
        console.log("LIGHTBOX_ITEM_DEBUG", item);
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [onClose, item]);

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
                {item.isVideo ? (
                    <div className="lightbox-video-wrapper">
                        <HLSVideoPlayer
                            src={item.videoUrl}
                            poster={item.videoPoster}
                        />
                    </div>
                ) : (
                    <img
                        src={item.src}
                        alt={item.title}
                        className="lightbox-image"
                    />
                )}

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
    // Mouse position for parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for mouse movement
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Parallax transforms - conflicting directions for depth
    const x1 = useTransform(springX, [-0.5, 0.5], ["-25px", "25px"]);
    const y1 = useTransform(springY, [-0.5, 0.5], ["-15px", "15px"]);

    const x2 = useTransform(springX, [-0.5, 0.5], ["15px", "-15px"]);
    const y2 = useTransform(springY, [-0.5, 0.5], ["15px", "-15px"]);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        // Normalize coordinates to -0.5 to 0.5
        mouseX.set(clientX / innerWidth - 0.5);
        mouseY.set(clientY / innerHeight - 0.5);
    };

    return (
        <header className="gallery-hero" onMouseMove={handleMouseMove}>
            <div className="gallery-hero-bg"></div>
            <div className="gallery-hero-content">
                <div className="hero-meta" style={{ justifyContent: 'center', borderBottom: 'none', marginBottom: '1rem' }}>
                    <span className="hero-label" style={{ color: 'var(--signal-acid)' }}>SCROLL TO EXPLORE ↓</span>
                </div>

                <div className="hero-title-container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="hero-title-wrapper">
                        <motion.h1
                            className="hero-title"
                            style={{ x: x1, y: y1 }}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            the
                        </motion.h1>
                    </div>
                    <div className="hero-title-wrapper">
                        <motion.h1
                            className="hero-title outlined-title"
                            style={{
                                x: x2,
                                y: y2,
                                color: 'transparent',
                                WebkitTextStroke: '2px var(--plaster)',
                                cursor: 'default'
                            }}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            whileHover={{
                                color: 'var(--plaster)',
                                scale: 1.02,
                                transition: { duration: 0.3 }
                            }}
                            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            gallery
                        </motion.h1>
                    </div>
                </div>

                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                >
                    "You miss 100% of the shots you don’t take" <br />
                    <span style={{ opacity: 0.7, fontSize: '0.9em' }}>- Istiqlal</span>
                </motion.p>
            </div>
        </header>
    );
};

const GalleryItem = ({ item, index, onSelect, onHoverStart, onHoverEnd }) => {
    const thumbnailSrc = item.isVideo ? item.videoPoster : item.src;

    return (
        <motion.article
            className={`gallery-item ${item.spanCols || ''} ${item.spanRows || ''} ${item.isVideo ? 'is-video' : ''}`}
            data-index={String(index + 1).padStart(2, '0')}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.08, ease: "easeOut" }}
            onHoverStart={() => onHoverStart(item.isVideo ? 'Play' : 'View')}
            onHoverEnd={onHoverEnd}
            onClick={() => onSelect(item)}
        >
            <div className="item-image-container">
                <img src={thumbnailSrc} alt={item.title} className="item-image" loading="lazy" />
                {item.isVideo && (
                    <div className="video-play-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                )}
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

        // Introspection
        const inspect = async () => {
            const query = `
              query {
                __type(name: "GalleryItemRecord") {
                  fields {
                    name
                    type {
                      name
                      kind
                    }
                  }
                }
              }
            `;
            try {
                const data = await datoCMSClient.request(query);
                console.log("SCHEMA_DUMP", JSON.stringify(data, null, 2));
            } catch (e) { console.error(e); }
        };
        inspect();
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
                    <h2>Best Clicks</h2>
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
