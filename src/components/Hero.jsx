import React from 'react';
import { Play, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = ({ profile }) => {
    return (
        <div className="hero">
            <div className="hero-background">
                <div className="hero-gradient"></div>
            </div>
            <div className="hero-content">
                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {profile.name}
                </motion.h1>
                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    Full Stack Developer | AI Engineer | Blockchain Specialist
                </motion.p>
                <motion.p
                    className="hero-description"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    Building the future with AI and Blockchain.
                    Software Developer at Clemson University.
                </motion.p>
                <motion.div
                    className="hero-buttons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <button className="btn btn-primary" onClick={() => window.open('/assets/docs/Istiqlal_Aurangzeb_Resume.pdf', '_blank')}>
                        <Play className="btn-icon" fill="currentColor" />
                        Resume
                    </button>
                    <button className="btn btn-secondary">
                        <Info className="btn-icon" />
                        More Info
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
