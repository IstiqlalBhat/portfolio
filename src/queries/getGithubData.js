export const getGithubUserData = async (username = 'IstiqlalBhat') => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        return await response.json();
    } catch (error) {
        console.error("Error fetching GitHub user data:", error);
        return null;
    }
};

export const getGithubEvents = async (username = 'IstiqlalBhat') => {
    try {
        // Fetch 4 pages of 100 events each (400 total max)
        const pages = [1, 2, 3, 4];
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

        console.log("GitHub Events Loaded:", allEvents.length);
        return allEvents;
    } catch (error) {
        console.error("Error fetching GitHub events:", error);
        return [];
    }
};

export const getGithubContributions = async (username = 'IstiqlalBhat', year = 'last') => {
    try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`);
        if (!response.ok) throw new Error('Failed to fetch contributions');
        return await response.json();
    } catch (error) {
        console.error("Error fetching GitHub contributions:", error);
        return null;
    }
};
