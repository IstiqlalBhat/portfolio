import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import NetflixWebGLBackground from '../components/NetflixWebGLBackground';
import './browse.css';
import { PROFILES } from '../data/profiles';

const Browse = () => {
    const navigate = useNavigate();

    const handleProfileClick = (profile) => {
        navigate(`/profile/${profile.id}`, { state: { profileImage: profile.image, backgroundGif: profile.backgroundGif } });
    };

    return (
        <div className="browse-container">
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
