import React, { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaBriefcase, FaTools, FaProjectDiagram, FaEnvelope, FaTimes } from 'react-icons/fa';
import { PROFILES } from '../data/profiles';
import './Navbar.css';

const navItems = [
    { to: '/browse', icon: FaHome, label: 'Home' },
    { to: '/work-experience', icon: FaBriefcase, label: 'Professional' },
    { to: '/skills', icon: FaTools, label: 'Skills' },
    { to: '/projects', icon: FaProjectDiagram, label: 'Projects' },
    { to: '/contact-me', icon: FaEnvelope, label: 'Hire Me' },
];

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const profileImage = location.state?.profileImage || "/assets/profiles/profile_developer.png";
    const profileLabel = PROFILES.find((p) => p.image === profileImage)?.label || 'Developer';

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
                    <Link to="/" className="navbar-logo">
                        PORTFOLIO
                    </Link>
                    <ul className="navbar-links">
                        <li><NavLink to="/browse">Home</NavLink></li>
                        <li><NavLink to="/work-experience">Professional</NavLink></li>
                        <li><NavLink to="/skills">Skills</NavLink></li>
                        <li><NavLink to="/projects">Projects</NavLink></li>
                        <li><NavLink to="/contact-me">Hire Me</NavLink></li>
                    </ul>
                </div>
                <div className="navbar-right">
                    <button
                        type="button"
                        className="hamburger"
                        onClick={toggleSidebar}
                        aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isSidebarOpen}
                        aria-controls="mobile-sidebar"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
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

            {/* Full-screen Netflix overlay menu */}
            <div
                className={`nfx-overlay ${isSidebarOpen ? 'open' : ''}`}
                onClick={closeSidebar}
            ></div>

            <div
                id="mobile-sidebar"
                className={`nfx-menu ${isSidebarOpen ? 'open' : ''}`}
                aria-hidden={!isSidebarOpen}
            >
                <div className="nfx-menu-header">
                    <Link to="/" className="nfx-menu-logo" onClick={closeSidebar}>
                        PORTFOLIO
                    </Link>
                    <button
                        type="button"
                        className="nfx-menu-close"
                        onClick={closeSidebar}
                        aria-label="Close menu"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="nfx-menu-profile" onClick={() => { navigate('/browse'); closeSidebar(); }}>
                    <img src={profileImage} alt="Profile" className="nfx-menu-avatar" decoding="async" />
                    <div className="nfx-menu-profile-info">
                        <span className="nfx-menu-profile-name">{profileLabel}</span>
                        <span className="nfx-menu-profile-sub">Switch Profile</span>
                    </div>
                </div>

                <nav className="nfx-menu-nav">
                    <ul>
                        {navItems.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.to} style={{ '--item-index': i }}>
                                    <NavLink to={item.to} onClick={closeSidebar}>
                                        <span className="nfx-nav-icon"><Icon /></span>
                                        <span className="nfx-nav-label">{item.label}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

            </div>
        </>
    );
};

export default Navbar;
