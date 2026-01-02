import React, { useState, useEffect } from 'react';
import './ShowcaseModal.css';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ShowcaseModal = ({ isOpen, onClose, images, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Reset index when modal opens
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(0);
            setIsAutoPlaying(true);
        }
    }, [isOpen]);

    // Auto-advance logic
    useEffect(() => {
        let interval;
        if (isOpen && isAutoPlaying) {
            interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
            }, 3000); // 3 seconds per slide
        }
        return () => clearInterval(interval);
    }, [isOpen, isAutoPlaying, images.length]);

    if (!isOpen) return null;

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsAutoPlaying(false); // Stop autoplay on interaction
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setIsAutoPlaying(false);
    };

    const handleDotClick = (index, e) => {
        e.stopPropagation();
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    };

    return (
        <div className="showcase-modal-overlay" onClick={onClose}>
            <div className="showcase-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    <FaTimes />
                </button>

                <h2 className="showcase-title">{title} Showcase</h2>

                <div className="carousel-container">
                    <div
                        className="carousel-track"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {images.map((img, index) => (
                            <div className="carousel-slide" key={index}>
                                <img src={img} alt={`Slide ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <button className="nav-button prev" onClick={handlePrev}><FaChevronLeft /></button>
                    <button className="nav-button next" onClick={handleNext}><FaChevronRight /></button>
                </div>

                <div className="carousel-dots">
                    {images.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={(e) => handleDotClick(index, e)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShowcaseModal;
