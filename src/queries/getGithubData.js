export const getGithubUserData = async (username = 'IstiqlalBhat') => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        return await response.json();
    } catch (error) {

        return null;
    }
};

export const getGithubEvents = async (username = 'IstiqlalBhat') => {
    try {
        // Fetch 2 pages of 100 events (200 total max) which is usually the limit
        const pages = [1, 2];
        const responses = await Promise.all(
            pages.map(page =>
                fetch(`https://api.github.com/users/${username}/events?per_page=100&page=${page}`)
            )
        );

        const allEvents = [];
        for (const response of responses) {
            if (response.ok) {
                const data = await response.json();
                allEvents.push(...data);
            }
        }


        return allEvents;
    } catch (error) {

        return [];
    }
};

export const getGithubContributions = async (username = 'IstiqlalBhat', year = 'last') => {
    try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`);
        if (!response.ok) throw new Error('Failed to fetch contributions');
        return await response.json();
    } catch (error) {

        return null;
    }
};
