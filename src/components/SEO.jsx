import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DEFAULT_SEO } from '../utils/seo';

const SEO = ({ title, description, name, type, path = '' }) => {
    const baseUrl = 'https://www.istiqlalaurangzeb.com';
    const canonicalUrl = `${baseUrl}${path}`;
    const imageUrl = `${baseUrl}/og-image.png`;

    return (
        <Helmet>
            { /* Standard metadata tags */}
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name="author" content={name} />
            <link rel="canonical" href={canonicalUrl} />

            { /* Facebook tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:site_name" content="Istiqlal Aurangzeb" />

            { /* Twitter tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
        </Helmet>
    )
}

SEO.defaultProps = {
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
    name: 'Istiqlal Aurangzeb',
    type: 'website'
}

export default SEO;
