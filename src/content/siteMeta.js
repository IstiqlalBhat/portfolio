export const BASE_URL = 'https://www.istiqlalaurangzeb.com';
export const SITE_NAME = 'Istiqlal Aurangzeb';
export const PERSON_NAME = 'Istiqlal Aurangzeb';
export const PERSON_ALIASES = ['Istiqlal', 'Istiqlal Bhat'];
export const PERSON_ROLE = 'Software Engineer and AI Researcher';
export const PERSON_DESCRIPTION = 'Official portfolio of Istiqlal Aurangzeb, a software engineer and AI researcher at Clemson University focused on full-stack applications, blockchain systems, and applied machine learning.';
export const ORGANIZATION_NAME = 'Clemson University';
export const PRIMARY_PROFILE_PATH = '/profile/recruiter';

export const SOCIAL_LINKS = Object.freeze({
    linkedin: 'https://www.linkedin.com/in/istiqlalbhat/',
    github: 'https://github.com/IstiqlalBhat',
    scholar: 'https://scholar.google.com/citations?user=v4-8HccAAAAJ',
});

const GLOBAL_KEYWORDS = [
    'Istiqlal',
    'Istiqlal Aurangzeb',
    'Istiqlal Bhat',
    'Istiqlal portfolio',
    'Istiqlal software engineer',
    'Istiqlal developer',
    'Istiqlal Clemson',
    'software engineer',
    'AI researcher',
    'full stack developer',
    'blockchain developer',
    'Clemson University',
    'research software developer',
];

const makeKeywords = (...extraKeywords) => Array.from(new Set([
    ...GLOBAL_KEYWORDS,
    ...extraKeywords,
]));

export const DEFAULT_SEO = Object.freeze({
    title: `${PERSON_NAME} | Software Engineer, AI Researcher, Clemson University`,
    description: PERSON_DESCRIPTION,
    keywords: makeKeywords(),
    image: '/og-image.png',
    imageAlt: `${PERSON_NAME} portfolio preview`,
    type: 'website',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    siteName: SITE_NAME,
    locale: 'en_US',
});

export const ROUTE_SEO = Object.freeze({
    '/': {
        ...DEFAULT_SEO,
    },
    '/browse': {
        title: `Browse Portfolio | ${PERSON_NAME}`,
        description: 'Choose a portfolio view and explore the work, projects, experience, and research of Istiqlal Aurangzeb.',
        keywords: makeKeywords('browse portfolio', 'recruiter portfolio'),
        robots: 'noindex, follow',
    },
    [PRIMARY_PROFILE_PATH]: {
        title: `Recruiter Portfolio | ${PERSON_NAME}`,
        description: 'Recruiter-focused portfolio of Istiqlal Aurangzeb with current role, project highlights, technical strengths, research, and contact details.',
        keywords: makeKeywords('recruiter portfolio', 'hire Istiqlal Aurangzeb', 'software engineer portfolio'),
    },
    '/projects': {
        title: `Projects | ${PERSON_NAME}`,
        description: 'Projects by Istiqlal Aurangzeb spanning AI, blockchain, interactive web experiences, and full-stack engineering.',
        keywords: makeKeywords('projects', 'AI projects', 'blockchain projects', 'full stack projects'),
    },
    '/latest-project': {
        title: `Featured Work | ${PERSON_NAME}`,
        description: 'Featured portfolio work from Istiqlal Aurangzeb with project context, tech stack, demo links, and source code.',
        keywords: makeKeywords('featured project', 'latest project', 'portfolio work'),
    },
    '/skills': {
        title: `Skills | ${PERSON_NAME}`,
        description: 'Technical skills of Istiqlal Aurangzeb across AI, machine learning, full-stack development, cloud, and blockchain.',
        keywords: makeKeywords('technical skills', 'AI skills', 'full stack skills', 'blockchain skills'),
    },
    '/work-experience': {
        title: `Experience | ${PERSON_NAME}`,
        description: 'Work experience and education history of Istiqlal Aurangzeb, including Clemson University research software development.',
        keywords: makeKeywords('work experience', 'resume', 'Clemson University experience'),
    },
    '/research-papers': {
        title: `Research Papers | ${PERSON_NAME}`,
        description: 'Research papers and publications by Istiqlal Aurangzeb in Automation in Construction and applied AI systems.',
        keywords: makeKeywords('research papers', 'publications', 'Automation in Construction'),
    },
    '/contact-me': {
        title: `Contact | ${PERSON_NAME}`,
        description: 'Contact Istiqlal Aurangzeb for software engineering, AI, research, or collaboration opportunities.',
        keywords: makeKeywords('contact', 'hire Istiqlal', 'software engineer contact'),
        type: 'profile',
    },
    '/recommendations': {
        title: `Recommendations | ${PERSON_NAME}`,
        description: 'Professional recommendation and reference information for Istiqlal Aurangzeb.',
        keywords: makeKeywords('recommendations', 'reference', 'professional recommendation'),
    },
    '/work-permit': {
        title: `Work Authorization | ${PERSON_NAME}`,
        description: 'US work authorization information for Istiqlal Aurangzeb, including current employment eligibility details.',
        keywords: makeKeywords('work authorization', 'work permit', 'US employment eligibility'),
    },
    '/music': {
        title: `Music | ${PERSON_NAME}`,
        description: 'Music interests and favorite listening picks from Istiqlal Aurangzeb.',
        keywords: makeKeywords('music', 'favorite music'),
    },
    '/reading': {
        title: `Reading | ${PERSON_NAME}`,
        description: 'Books and reading picks from Istiqlal Aurangzeb.',
        keywords: makeKeywords('reading list', 'books'),
    },
    '/gallery': {
        title: `Gallery | ${PERSON_NAME}`,
        description: 'Photo and video gallery from Istiqlal Aurangzeb with selected visual highlights.',
        keywords: makeKeywords('gallery', 'photo gallery', 'video gallery'),
    },
});

export const BREADCRUMB_LABELS = Object.freeze({
    '/': 'Home',
    [PRIMARY_PROFILE_PATH]: 'Recruiter Portfolio',
    '/projects': 'Projects',
    '/latest-project': 'Featured Work',
    '/skills': 'Skills',
    '/work-experience': 'Experience',
    '/research-papers': 'Research Papers',
    '/contact-me': 'Contact',
    '/recommendations': 'Recommendations',
    '/work-permit': 'Work Authorization',
    '/music': 'Music',
    '/reading': 'Reading',
    '/gallery': 'Gallery',
});

export const INDEXABLE_ROUTES = Object.freeze([
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: PRIMARY_PROFILE_PATH, priority: '0.9', changefreq: 'weekly' },
    { path: '/projects', priority: '0.9', changefreq: 'weekly' },
    { path: '/latest-project', priority: '0.85', changefreq: 'weekly' },
    { path: '/skills', priority: '0.85', changefreq: 'monthly' },
    { path: '/work-experience', priority: '0.85', changefreq: 'monthly' },
    { path: '/research-papers', priority: '0.85', changefreq: 'monthly' },
    { path: '/contact-me', priority: '0.8', changefreq: 'monthly' },
    { path: '/recommendations', priority: '0.7', changefreq: 'monthly' },
    { path: '/work-permit', priority: '0.65', changefreq: 'monthly' },
    { path: '/gallery', priority: '0.6', changefreq: 'monthly' },
    { path: '/music', priority: '0.45', changefreq: 'monthly' },
    { path: '/reading', priority: '0.45', changefreq: 'monthly' },
]);

export const getIndexableRoutes = () => INDEXABLE_ROUTES.map((route) => ({
    ...route,
    ...ROUTE_SEO[route.path],
}));
