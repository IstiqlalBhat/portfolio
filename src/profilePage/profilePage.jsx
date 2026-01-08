import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './ProfilePage.css';

import ProfileBanner from './ProfileBanner';
import TopPicksRow from './TopPicksRow';
import ContinueWatching from './ContinueWatching';
import GithubSection from '../components/github/GithubSection';
import { DEFAULT_PROFILE_ID, getProfileBackgroundGif, isValidProfileId } from '../data/profiles';

const getAlternateGifHost = (url) => {
    if (typeof url !== 'string') return null;
    if (url.startsWith('https://media.giphy.com/media/')) {
        return url.replace('https://media.giphy.com/media/', 'https://i.giphy.com/media/');
    }
    if (url.startsWith('https://i.giphy.com/media/')) {
        return url.replace('https://i.giphy.com/media/', 'https://media.giphy.com/media/');
    }
    return null;
};

const ProfilePage = () => {
    const location = useLocation();
    const { profileName } = useParams();

    const profileId = isValidProfileId(profileName) ? profileName : DEFAULT_PROFILE_ID;
    const resolvedBackgroundGif = useMemo(() => {
        return location.state?.backgroundGif || getProfileBackgroundGif(profileId);
    }, [location.state?.backgroundGif, profileId]);
    const [backgroundSrc, setBackgroundSrc] = useState(resolvedBackgroundGif);
    const [triedAlternateHost, setTriedAlternateHost] = useState(false);

    useEffect(() => {
        setBackgroundSrc(resolvedBackgroundGif);
        setTriedAlternateHost(false);
    }, [resolvedBackgroundGif]);

    return (
        <>
            <div
                className="profile-page"
            >
                <img
                    className="profile-page-bg"
                    src={backgroundSrc}
                    alt=""
                    aria-hidden="true"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => {
                        if (!triedAlternateHost) {
                            const alternate = getAlternateGifHost(backgroundSrc);
                            if (alternate) {
                                setTriedAlternateHost(true);
                                setBackgroundSrc(alternate);
                                return;
                            }
                        }
                        setBackgroundSrc('/assets/project_tech_bg.png');
                    }}
                />
                <div className="profile-page-overlay" aria-hidden="true" />
                <ProfileBanner
                />
            </div>
            <TopPicksRow profile={profileId} />
            <ContinueWatching profile={profileId} />
            <GithubSection />
        </>
    );
};

export default ProfilePage;
