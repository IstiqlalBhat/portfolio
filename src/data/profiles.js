export const PROFILE_BACKGROUNDS = {
    recruiter: 'https://media.giphy.com/media/16u7Ifl2T4zYfQ932F/giphy.gif',
    developer: 'https://media.giphy.com/media/TFPdmm3rdzeZ0kP3zG/giphy.gif',
    stalker: 'https://media.giphy.com/media/QjZXUBUr89CkiWLPjL/giphy.gif',
    adventurer: 'https://media.giphy.com/media/ERKMnDK6tkzJe8YVa3/giphy.gif',
};

export const DEFAULT_PROFILE_ID = 'recruiter';

export const DEFAULT_BACKGROUND_GIF = 'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif';

export const PROFILES = [
    {
        id: 'recruiter',
        label: 'Recruiter',
        image: '/assets/profile_recruiter.png',
        backgroundGif: PROFILE_BACKGROUNDS.recruiter,
    },
    {
        id: 'developer',
        label: 'Developer',
        image: '/assets/profile_developer.png',
        backgroundGif: PROFILE_BACKGROUNDS.developer,
    },
    {
        id: 'stalker',
        label: 'Stalker',
        image: '/assets/profile_stalker_v2.png',
        backgroundGif: PROFILE_BACKGROUNDS.stalker,
    },
    {
        id: 'adventurer',
        label: 'Adventurer',
        image: '/assets/profile_adventurer.png',
        backgroundGif: PROFILE_BACKGROUNDS.adventurer,
    },
];

export const isValidProfileId = (profileId) => PROFILES.some((p) => p.id === profileId);

export const getProfileBackgroundGif = (profileId) => PROFILE_BACKGROUNDS[profileId] || DEFAULT_BACKGROUND_GIF;
