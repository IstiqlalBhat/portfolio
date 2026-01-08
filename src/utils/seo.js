export const DEFAULT_SEO = {
    title: 'Istiqlal | Istiqlal Aurangzeb - Software Engineer & AI Researcher',
    description: 'Istiqlal Aurangzeb - Research Software Developer at Clemson University. Istiqlal specializes in AI, blockchain, and full-stack development.',
};

const ROUTE_SEO = {
    '/': {
        title: DEFAULT_SEO.title,
        description: DEFAULT_SEO.description,
    },
    '/browse': {
        title: 'Choose Profile | Istiqlal Aurangzeb',
        description: "Select a profile to explore Istiqlal Aurangzeb's portfolio, projects, research, and experience.",
    },
    '/projects': {
        title: 'Projects | Istiqlal Aurangzeb',
        description: 'Software, AI, blockchain, and full-stack projects by Istiqlal Aurangzeb with demos and code links.',
    },
    '/latest-project': {
        title: 'Latest Project | Istiqlal Aurangzeb',
        description: 'Featured recent project with tech stack, demo, and details from Istiqlal Aurangzeb.',
    },
    '/skills': {
        title: 'Skills | Istiqlal Aurangzeb',
        description: 'Technical skills across AI/ML, full-stack, cloud, and blockchain.',
    },
    '/work-experience': {
        title: 'Experience | Istiqlal Aurangzeb',
        description: 'Work experience and education timeline for Istiqlal Aurangzeb.',
    },
    '/research-papers': {
        title: 'Research Papers | Istiqlal Aurangzeb',
        description: 'Research papers and publications in construction automation and AI.',
    },
    '/contact-me': {
        title: 'Contact | Istiqlal Aurangzeb',
        description: 'Contact Istiqlal Aurangzeb for collaboration, research, or opportunities.',
    },
    '/recommendations': {
        title: 'Recommendations | Istiqlal Aurangzeb',
        description: 'Professional recommendations and references.',
    },
    '/work-permit': {
        title: 'Work Authorization | Istiqlal Aurangzeb',
        description: 'US work authorization details including F-1 OPT and STEM OPT eligibility.',
    },
    '/music': {
        title: 'Music | Istiqlal Aurangzeb',
        description: 'Personal music favorites, genres, and albums.',
    },
    '/reading': {
        title: 'Reading List | Istiqlal Aurangzeb',
        description: 'Books and reading list that shaped Istiqlal Aurangzeb.',
    },
    '/gallery': {
        title: 'Gallery | Istiqlal Aurangzeb',
        description: 'Photo and video gallery with curated highlights.',
    },
};

const normalizePath = (pathname) => {
    if (!pathname) return '/';
    if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
    return pathname;
};

export const getSeoForPath = (pathname) => {
    const path = normalizePath(pathname);

    if (path.startsWith('/profile/')) {
        return {
            title: 'Portfolio | Istiqlal Aurangzeb - Software Engineer & AI Researcher',
            description: 'Portfolio of Istiqlal Aurangzeb with projects, research papers, skills, and work experience.',
            path,
        };
    }

    const entry = ROUTE_SEO[path] || DEFAULT_SEO;

    return {
        ...entry,
        path,
    };
};
