import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaBriefcase, FaTools, FaProjectDiagram, FaEnvelope, FaTimes } from 'react-icons/fa';
import './Navbar.css';
// import netflixLogo from '../images/logo-2.png'; // TODO: Add logo
// import blueImage from '../images/blue.png'; // TODO: Add profile image

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // const profileImage = location.state?.profileImage || blueImage;
    const profileImage = location.state?.profileImage || "/assets/profiles/profile_developer.png";

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 80);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen((open) => !open);
    }, []);

    const closeSidebar = useCallback(() => {
        setIsSidebarOpen(false);
    }, []);

    useEffect(() => {
        if (!isSidebarOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKeyDown = (event) => {
            if (event.key === 'Escape') closeSidebar();
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [closeSidebar, isSidebarOpen]);

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="navbar-left">
                    <Link to="/" className="navbar-logo" style={{ color: 'red', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        {/* <img src={netflixLogo} alt="Netflix" /> */}
                        PORTFOLIO
                    </Link>
                    <ul className="navbar-links">
                        <li><Link to="/browse">Home</Link></li>
                        <li><Link to="/work-experience">Professional</Link></li>
                        <li><Link to="/skills">Skills</Link></li>
                        <li><Link to="/projects">Projects</Link></li>
                        <li><Link to="/contact-me">Hire Me</Link></li>
                    </ul>
                </div>
                <div className="navbar-right">
                    {/* Hamburger menu for mobile */}
                    <button
                        type="button"
                        className="hamburger"
                        onClick={toggleSidebar}
                        aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isSidebarOpen}
                        aria-controls="mobile-sidebar"
                    >
                        <div></div>
                        <div></div>
                        <div></div>
                    </button>
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="profile-icon"
                        decoding="async"
                        onClick={() => { navigate('/browse') }}
                    />
                </div>
            </nav>

            {/* Sidebar Overlay */}
            <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={closeSidebar}></div>

            {/* Sidebar (only visible on mobile) */}
            <div
                id="mobile-sidebar"
                className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
                aria-hidden={!isSidebarOpen}
            >
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        {/* <img src={netflixLogo} alt="Netflix Logo" /> */}
                        <h2 style={{ color: 'red' }}>PORTFOLIO</h2>
                    </div>
                    <button type="button" className="sidebar-close" onClick={closeSidebar} aria-label="Close menu">
                        <FaTimes />
                    </button>
                </div>
                <ul>
                    <li><Link to="/browse" onClick={closeSidebar}><FaHome /> Home</Link></li>
                    <li><Link to="/work-experience" onClick={closeSidebar}><FaBriefcase /> Professional</Link></li>
                    <li><Link to="/skills" onClick={closeSidebar}><FaTools /> Skills</Link></li>
                    <li><Link to="/projects" onClick={closeSidebar}><FaProjectDiagram /> Projects</Link></li>
                    <li><Link to="/contact-me" onClick={closeSidebar}><FaEnvelope /> Hire Me</Link></li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;
