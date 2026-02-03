import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './LiquidGlassScrollButton.css';

/**
 * iOS Liquid Glass Scroll Button
 * Clean frosted glass effect
 */
const LiquidGlassScrollButton = ({
    direction = 'right',
    onClick,
    visible = true,
    pulse = false,
    shimmer = false
}) => {
    const handleClick = useCallback(() => {
        if (navigator.vibrate && window.matchMedia('(pointer: coarse)').matches) {
            navigator.vibrate(10);
        }
        onClick?.();
    }, [onClick]);

    const Icon = direction === 'left' ? ChevronLeft : ChevronRight;

    return (
        <motion.button
            className={`liquid-glass-btn ${direction} ${pulse ? 'pulse' : ''} ${shimmer ? 'shimmer' : ''}`}
            onClick={handleClick}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: visible ? 1 : 0,
                scale: visible ? 1 : 0.8
            }}
            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25
            }}
            aria-label={direction === 'left' ? 'Scroll left' : 'Scroll right'}
            type="button"
        >
            <div className="liquid-glass__glass"></div>
            <div className="liquid-glass__content">
                <Icon className="liquid-glass__icon" size={22} strokeWidth={2.5} />
            </div>
        </motion.button>
    );
};

/**
 * Hook to manage scroll state for horizontal scrolling containers
 */
export const useScrollState = (scrollRef) => {
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(true);

    const checkScrollability = useCallback(() => {
        if (!scrollRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const hasOverflow = scrollWidth > clientWidth;

        setCanScrollLeft(hasOverflow && scrollLeft > 5);
        setCanScrollRight(hasOverflow && scrollLeft < scrollWidth - clientWidth - 5);
    }, [scrollRef]);

    const handleScroll = useCallback(() => {
        checkScrollability();
    }, [checkScrollability]);

    const scroll = useCallback((direction) => {
        if (!scrollRef.current) return;

        const { scrollLeft, clientWidth } = scrollRef.current;
        const scrollAmount = clientWidth * 0.8;

        scrollRef.current.scrollTo({
            left: direction === 'left'
                ? scrollLeft - scrollAmount
                : scrollLeft + scrollAmount,
            behavior: 'smooth'
        });
    }, [scrollRef]);

    useEffect(() => {
        const element = scrollRef.current;
        if (!element) return;

        checkScrollability();

        element.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', checkScrollability);

        const timeoutId = setTimeout(checkScrollability, 500);

        return () => {
            element.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkScrollability);
            clearTimeout(timeoutId);
        };
    }, [scrollRef, handleScroll, checkScrollability]);

    return {
        canScrollLeft,
        canScrollRight,
        scrollLeft: () => scroll('left'),
        scrollRight: () => scroll('right'),
        checkScrollability
    };
};

export default LiquidGlassScrollButton;
