import resumeData from '../data/resume.json';
import { DEFAULT_PROFILE_ID, isValidProfileId } from '../data/profiles';
import {
    BASE_URL,
    BREADCRUMB_LABELS,
    DEFAULT_SEO,
    ORGANIZATION_NAME,
    PERSON_ALIASES,
    PERSON_DESCRIPTION,
    PERSON_NAME,
    PRIMARY_PROFILE_PATH,
    ROUTE_SEO,
    SITE_NAME,
    SOCIAL_LINKS,
} from '../content/siteMeta';

const PROFILE_TITLES = {
    recruiter: 'Recruiter Portfolio',
    developer: 'Developer Portfolio',
    stalker: 'Behind the Scenes Portfolio',
    adventurer: 'Adventure Portfolio',
};

const normalizePath = (pathname) => {
    if (!pathname) return '/';
    if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
    return pathname;
};

const toAbsoluteUrl = (path = '/') => `${BASE_URL}${path === '/' ? '/' : path}`;

const toAbsoluteImageUrl = (imagePath = DEFAULT_SEO.image) => {
    if (!imagePath) return `${BASE_URL}${DEFAULT_SEO.image}`;
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
    return `${BASE_URL}${imagePath}`;
};

const getTopSkills = () => {
    const preferredCategories = [
        'Programming_Languages',
        'Frontend',
        'Backend',
        'AI_ML_Frameworks',
        'AI_Models_Techniques',
        'Blockchain_Web3',
    ];

    return preferredCategories
        .flatMap((category) => resumeData.skills[category] || [])
        .slice(0, 18);
};

const getProjectListItems = () => resumeData.projects.slice(0, 6).map((project, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.details?.[0] || project.subtitle,
        url: project.link || toAbsoluteUrl('/projects'),
        image: toAbsoluteImageUrl(project.image),
    },
}));

const getPublicationListItems = () => resumeData.publications.map((publication, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
        '@type': 'ScholarlyArticle',
        name: publication.citation,
        url: publication.link,
        isPartOf: {
            '@type': 'Periodical',
            name: 'Automation in Construction',
        },
    },
}));

const getExperienceListItems = () => {
    const workItems = resumeData.experience.map((experience, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
            '@type': 'Role',
            roleName: experience.role,
            description: experience.details?.[0] || experience.company,
            startDate: experience.duration,
            memberOf: {
                '@type': 'Organization',
                name: experience.company,
            },
        },
    }));

    const educationItems = resumeData.education.map((education, index) => ({
        '@type': 'ListItem',
        position: workItems.length + index + 1,
        item: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: education.degree,
            recognizedBy: {
                '@type': 'CollegeOrUniversity',
                name: education.institution,
            },
        },
    }));

    return [...workItems, ...educationItems];
};

const buildPersonSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSON_NAME,
    alternateName: PERSON_ALIASES,
    description: PERSON_DESCRIPTION,
    url: toAbsoluteUrl('/'),
    image: toAbsoluteImageUrl(),
    jobTitle: 'Research Software Developer',
    worksFor: {
        '@type': 'Organization',
        name: ORGANIZATION_NAME,
    },
    alumniOf: [
        {
            '@type': 'CollegeOrUniversity',
            name: 'Clemson University',
        },
        {
            '@type': 'CollegeOrUniversity',
            name: 'Sri Venkateswara University',
        },
    ],
    knowsAbout: getTopSkills(),
    sameAs: Object.values(SOCIAL_LINKS),
});

const buildWebsiteSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: [...PERSON_ALIASES, `${PERSON_NAME} Portfolio`],
    url: toAbsoluteUrl('/'),
    description: PERSON_DESCRIPTION,
    publisher: {
        '@type': 'Person',
        name: PERSON_NAME,
    },
});

const buildWebPageSchema = ({ path, title, description, type = 'WebPage' }) => ({
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description,
    url: toAbsoluteUrl(path),
    about: {
        '@type': 'Person',
        name: PERSON_NAME,
    },
    isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: toAbsoluteUrl('/'),
    },
    primaryImageOfPage: toAbsoluteImageUrl(),
});

const buildBreadcrumbSchema = (path) => {
    if (path === '/') return null;

    const segments = path.split('/').filter(Boolean);
    const itemListElement = [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: toAbsoluteUrl('/'),
        },
    ];

    segments.forEach((segment, index) => {
        const currentPath = `/${segments.slice(0, index + 1).join('/')}`;
        itemListElement.push({
            '@type': 'ListItem',
            position: index + 2,
            name: BREADCRUMB_LABELS[currentPath] || segment,
            item: toAbsoluteUrl(currentPath),
        });
    });

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement,
    };
};

const buildHomeSchemas = () => ([
    buildPersonSchema(),
    buildWebsiteSchema(),
    buildWebPageSchema({
        path: '/',
        title: DEFAULT_SEO.title,
        description: DEFAULT_SEO.description,
        type: 'ProfilePage',
    }),
    {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `Highlighted work by ${PERSON_NAME}`,
        itemListElement: getProjectListItems(),
    },
]);

const buildProjectsSchemas = () => ([
    buildWebPageSchema({
        path: '/projects',
        title: ROUTE_SEO['/projects'].title,
        description: ROUTE_SEO['/projects'].description,
        type: 'CollectionPage',
    }),
    {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `Projects by ${PERSON_NAME}`,
        itemListElement: getProjectListItems(),
    },
    buildBreadcrumbSchema('/projects'),
]);

const buildSkillsSchemas = () => ([
    buildWebPageSchema({
        path: '/skills',
        title: ROUTE_SEO['/skills'].title,
        description: ROUTE_SEO['/skills'].description,
        type: 'CollectionPage',
    }),
    {
        '@context': 'https://schema.org',
        '@type': 'DefinedTermSet',
        name: `Technical skills of ${PERSON_NAME}`,
        hasDefinedTerm: getTopSkills().map((skill) => ({
            '@type': 'DefinedTerm',
            name: skill,
            inDefinedTermSet: `${PERSON_NAME} skills`,
        })),
    },
    buildBreadcrumbSchema('/skills'),
]);

const buildExperienceSchemas = () => ([
    buildWebPageSchema({
        path: '/work-experience',
        title: ROUTE_SEO['/work-experience'].title,
        description: ROUTE_SEO['/work-experience'].description,
        type: 'CollectionPage',
    }),
    {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `Work experience of ${PERSON_NAME}`,
        itemListElement: getExperienceListItems(),
    },
    buildBreadcrumbSchema('/work-experience'),
]);

const buildResearchSchemas = () => ([
    buildWebPageSchema({
        path: '/research-papers',
        title: ROUTE_SEO['/research-papers'].title,
        description: ROUTE_SEO['/research-papers'].description,
        type: 'CollectionPage',
    }),
    {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `Research papers by ${PERSON_NAME}`,
        itemListElement: getPublicationListItems(),
    },
    buildBreadcrumbSchema('/research-papers'),
]);

const buildContactSchemas = () => ([
    buildWebPageSchema({
        path: '/contact-me',
        title: ROUTE_SEO['/contact-me'].title,
        description: ROUTE_SEO['/contact-me'].description,
        type: 'ContactPage',
    }),
    {
        '@context': 'https://schema.org',
        '@type': 'ContactPoint',
        contactType: 'professional',
        email: resumeData.profile.contact.email,
        telephone: resumeData.profile.contact.phone,
        url: toAbsoluteUrl('/contact-me'),
    },
    buildBreadcrumbSchema('/contact-me'),
]);

const buildDefaultSchemas = (path, title, description) => {
    const schema = [
        buildWebPageSchema({ path, title, description }),
        buildBreadcrumbSchema(path),
    ];

    return schema.filter(Boolean);
};

const getSchemasForPath = (path, meta) => {
    if (path === '/') return buildHomeSchemas();
    if (path === '/projects') return buildProjectsSchemas();
    if (path === '/skills') return buildSkillsSchemas();
    if (path === '/work-experience') return buildExperienceSchemas();
    if (path === '/research-papers') return buildResearchSchemas();
    if (path === '/contact-me') return buildContactSchemas();

    if (path === PRIMARY_PROFILE_PATH) {
        return [
            buildPersonSchema(),
            buildWebPageSchema({
                path,
                title: meta.title,
                description: meta.description,
                type: 'ProfilePage',
            }),
            {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: `${PERSON_NAME} portfolio highlights`,
                itemListElement: getProjectListItems(),
            },
            buildBreadcrumbSchema(path),
        ].filter(Boolean);
    }

    return buildDefaultSchemas(path, meta.title, meta.description);
};

const getProfileSeo = (path) => {
    const slug = path.split('/')[2];
    const validSlug = isValidProfileId(slug) ? slug : DEFAULT_PROFILE_ID;
    const isPrimaryProfile = validSlug === DEFAULT_PROFILE_ID;

    const profileMeta = isPrimaryProfile
        ? ROUTE_SEO[PRIMARY_PROFILE_PATH]
        : {
            title: `${PROFILE_TITLES[validSlug] || 'Portfolio View'} | ${PERSON_NAME}`,
            description: `Alternative portfolio presentation of ${PERSON_NAME}. For search indexing, the primary recruiter portfolio remains the preferred canonical version.`,
            keywords: [...DEFAULT_SEO.keywords, validSlug, 'portfolio view'],
            robots: 'noindex, follow',
            canonicalPath: PRIMARY_PROFILE_PATH,
        };

    const canonicalPath = profileMeta.canonicalPath || path;

    return {
        ...DEFAULT_SEO,
        ...profileMeta,
        path,
        canonicalPath,
        schema: getSchemasForPath(isPrimaryProfile ? PRIMARY_PROFILE_PATH : path, profileMeta),
    };
};

export { DEFAULT_SEO };

export const getSeoForPath = (pathname) => {
    const path = normalizePath(pathname);

    if (path.startsWith('/profile/')) {
        return getProfileSeo(path);
    }

    const routeMeta = ROUTE_SEO[path] || DEFAULT_SEO;
    const canonicalPath = routeMeta.canonicalPath || path;

    return {
        ...DEFAULT_SEO,
        ...routeMeta,
        path,
        canonicalPath,
        schema: getSchemasForPath(path, routeMeta),
    };
};
