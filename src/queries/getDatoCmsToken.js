// getDatoCmsToken.js

export const getDatoCmsToken = () => {
    // For now, we'll just return a placeholder or environment variable if available.
    // In a real scenario, this would handle different domains.
    return import.meta.env.VITE_DATOCMS_API_TOKEN || '';
};
