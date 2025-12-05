import React from 'react';
import Navbar from './components/Navbar';
import SEO from './components/SEO';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <SEO />
            <div className="content">{children}</div>
        </div>
    );
};

export default Layout;
