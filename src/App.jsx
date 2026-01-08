import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import NetflixTitle from './NetflixTitle';
import Layout from './Layout';
import RouteLoader from './components/RouteLoader';

const Browse = lazy(() => import('./browse/browse'));
const ProfilePage = lazy(() => import('./profilePage/profilePage'));
const LatestProject = lazy(() => import('./pages/LatestProject'));
const WorkPermit = lazy(() => import('./pages/WorkPermit'));
const WorkExperience = lazy(() => import('./pages/WorkExperience'));
const Recommendations = lazy(() => import('./pages/Recommendations'));
const Skills = lazy(() => import('./pages/Skills'));
const Projects = lazy(() => import('./pages/Projects'));
const ContactMe = lazy(() => import('./pages/ContactMe'));
const Music = lazy(() => import('./pages/Music'));
const Reading = lazy(() => import('./pages/Reading'));
const ResearchPapers = lazy(() => import('./pages/ResearchPapers'));
const PlacesVisited = lazy(() => import('./pages/PlacesVisited'));

const Lazy = ({ children }) => (
    <Suspense fallback={<RouteLoader />}>
        {children}
    </Suspense>
);

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<NetflixTitle />} />
            <Route path="/browse" element={<Lazy><Browse /></Lazy>} />
            <Route path="/profile/:profileName" element={<Layout><Lazy><ProfilePage /></Lazy></Layout>} />
            <Route path="/latest-project" element={<Layout><Lazy><LatestProject /></Lazy></Layout>} />
            <Route path="/work-permit" element={<Layout><Lazy><WorkPermit /></Lazy></Layout>} />
            <Route path="/work-experience" element={<Layout><Lazy><WorkExperience /></Lazy></Layout>} />
            <Route path="/recommendations" element={<Layout><Lazy><Recommendations /></Lazy></Layout>} />
            <Route path="/skills" element={<Layout><Lazy><Skills /></Lazy></Layout>} />
            <Route path="/projects" element={<Layout><Lazy><Projects /></Lazy></Layout>} />
            <Route path="/contact-me" element={<Layout><Lazy><ContactMe /></Lazy></Layout>} />
            <Route path="/music" element={<Layout><Lazy><Music /></Lazy></Layout>} />
            <Route path="/reading" element={<Layout><Lazy><Reading /></Lazy></Layout>} />
            <Route path="/research-papers" element={<Layout><Lazy><ResearchPapers /></Lazy></Layout>} />
            <Route path="/places-visited" element={<Layout><Lazy><PlacesVisited /></Lazy></Layout>} />
        </Routes>
    );
};

export default App;
