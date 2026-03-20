import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BASE_URL, DEFAULT_SEO, SOCIAL_LINKS } from '../content/siteMeta';

const escapeJsonLd = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

const SEO = ({
    title = DEFAULT_SEO.title,
    description = DEFAULT_SEO.description,
    keywords = DEFAULT_SEO.keywords,
    robots = DEFAULT_SEO.robots,
    type = DEFAULT_SEO.type,
    path = '/',
    canonicalPath,
    image = DEFAULT_SEO.image,
    imageAlt = DEFAULT_SEO.imageAlt,
    siteName = DEFAULT_SEO.siteName,
    locale = DEFAULT_SEO.locale,
    schema = [],
}) => {
    const resolvedCanonicalPath = canonicalPath || path || '/';
    const canonicalUrl = `${BASE_URL}${resolvedCanonicalPath === '/' ? '/' : resolvedCanonicalPath}`;
    const imageUrl = image.startsWith('http://') || image.startsWith('https://')
        ? image
        : `${BASE_URL}${image}`;
    const schemaList = Array.isArray(schema) ? schema.filter(Boolean) : [schema].filter(Boolean);
    const keywordString = Array.isArray(keywords) ? keywords.join(', ') : keywords;

    return (
        <Helmet prioritizeSeoTags htmlAttributes={{ lang: 'en' }}>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywordString} />
            <meta name="author" content={siteName} />
            <meta name="robots" content={robots} />
            <meta name="googlebot" content={robots} />
            <link rel="canonical" href={canonicalUrl} />

            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:secure_url" content={imageUrl} />
            <meta property="og:image:alt" content={imageAlt} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content={locale} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
            <meta name="twitter:image:alt" content={imageAlt} />

            <link rel="me" href={SOCIAL_LINKS.linkedin} />
            <link rel="me" href={SOCIAL_LINKS.github} />
            <link rel="me" href={SOCIAL_LINKS.scholar} />

            {schemaList.map((schemaEntry, index) => (
                <script
                    key={`${resolvedCanonicalPath}-schema-${index}`}
                    type="application/ld+json"
                >
                    {escapeJsonLd(schemaEntry)}
                </script>
            ))}
        </Helmet>
    );
};

export default SEO;
