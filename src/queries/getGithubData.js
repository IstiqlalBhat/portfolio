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
        const response = await fetch(`https://api.github.com/users/${username}/events?per_page=100`);
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const data = await response.json();
        console.log("GitHub Events Loaded:", data.length);
        return data;
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
