import React, { useEffect, useState } from 'react';
import './ProfileBanner.css';
import PlayButton from '../components/PlayButton';
import MoreInfoButton from '../components/MoreInfoButton';
import { getProfileBanner } from '../queries/getProfileBanner';

const ProfileBanner = () => {


    const [bannerData, setBannerData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getProfileBanner();
                setBannerData(data);
            } catch (error) {
                console.error("Error fetching banner data:", error);
            }
        }
        fetchData();
    }, []);

    if (!bannerData) return <div>Loading...</div>;

    const handlePlayClick = () => {
        window.open('/assets/docs/Istiqlal_Aurangzeb_Resume.pdf', '_blank');
    };

    const handleLinkedinClick = () => {
        window.open(bannerData.linkedinLink, '_blank');
    }

    return (
        <div className="profile-banner">
            <div className="banner-content">
                <h1 className="banner-headline" id='headline'>{bannerData.headline}</h1>
                <p className="banner-description">
                    {bannerData.profileSummary}
                </p>

                <div className="banner-buttons">
                    <PlayButton onClick={handlePlayClick} label="Resume" />
                    <MoreInfoButton onClick={handleLinkedinClick} label="Linkedin" />
                </div>
            </div>
        </div>
    );
};

export default ProfileBanner;
