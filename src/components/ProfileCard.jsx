import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ name, image, onClick }) => {
    return (
        <button className="profile-card" onClick={onClick} type="button" aria-label={`Select ${name} profile`}>
            <div className="image-container">
                <img
                    src={image}
                    alt={`${name} profile`}
                    className="profile-image"
                    loading="eager"
                    decoding="async"
                />
            </div>
            <h3 className="profile-name">{name}</h3>
        </button>
    );
};

export default ProfileCard;
