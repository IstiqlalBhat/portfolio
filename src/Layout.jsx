import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SEO from './components/SEO';
import { getSeoForPath } from './utils/seo';

const Layout = ({ children }) => {
    const { pathname } = useLocation();
    const seo = getSeoForPath(pathname);

    return (
        <>
            <Navbar />
            <SEO {...seo} />
            <main className="content">{children}</main>
        </>
    );
};

export default Layout;
