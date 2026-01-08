import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NetflixTitle from './NetflixTitle';
import Layout from './Layout';
import Browse from './browse/browse';
import ProfilePage from './profilePage/profilePage';
import LatestProject from './pages/LatestProject';
import WorkPermit from './pages/WorkPermit';
import WorkExperience from './pages/WorkExperience';
import Recommendations from './pages/Recommendations';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import ContactMe from './pages/ContactMe';
import Music from './pages/Music';
import Reading from './pages/Reading';
import ResearchPapers from './pages/ResearchPapers';
import Gallery from './pages/Gallery';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<NetflixTitle />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/profile/:profileName" element={<Layout><ProfilePage /></Layout>} />
            <Route path="/latest-project" element={<Layout><LatestProject /></Layout>} />
            <Route path="/work-permit" element={<Layout><WorkPermit /></Layout>} />
            <Route path="/work-experience" element={<Layout><WorkExperience /></Layout>} />
            <Route path="/recommendations" element={<Layout><Recommendations /></Layout>} />
            <Route path="/skills" element={<Layout><Skills /></Layout>} />
            <Route path="/projects" element={<Layout><Projects /></Layout>} />
            <Route path="/contact-me" element={<Layout><ContactMe /></Layout>} />
            <Route path="/music" element={<Layout><Music /></Layout>} />
            <Route path="/reading" element={<Layout><Reading /></Layout>} />
            <Route path="/research-papers" element={<Layout><ResearchPapers /></Layout>} />
            <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
            <Route path="/places-visited" element={<Navigate to="/gallery" replace />} />
        </Routes>
    );
};

export default App;
