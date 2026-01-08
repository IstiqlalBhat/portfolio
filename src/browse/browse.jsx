import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import NetflixWebGLBackground from '../components/NetflixWebGLBackground';
import SEO from '../components/SEO';
import './browse.css';
import { PROFILES } from '../data/profiles';
import { getSeoForPath } from '../utils/seo';

const Browse = () => {
    const { pathname } = useLocation();
    const seo = getSeoForPath(pathname);
    const navigate = useNavigate();

    const handleProfileClick = (profile) => {
        navigate(`/profile/${profile.id}`, { state: { profileImage: profile.image, backgroundGif: profile.backgroundGif } });
    };

    return (
        <div className="browse-container">
            <SEO {...seo} />
            <NetflixWebGLBackground />
            <p className='who-is-watching'>Who's Watching?</p>
            <div className="profiles">
                {PROFILES.map((profile, index) => (
                    <ProfileCard
                        key={index}
                        name={profile.label}
                        image={profile.image}
                        onClick={() => handleProfileClick(profile)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Browse;
