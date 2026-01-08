import React from 'react';
import './Gallery.css';

const photoPlaceholders = [
    {
        id: 'photo-01',
        title: 'Photo 01',
        subtitle: 'Golden hour skyline',
        tag: 'Photo',
        accent: '#e50914',
    },
    {
        id: 'photo-02',
        title: 'Photo 02',
        subtitle: 'Mountain trail',
        tag: 'Photo',
        accent: '#ffb020',
    },
    {
        id: 'photo-03',
        title: 'Photo 03',
        subtitle: 'Studio workspace',
        tag: 'Photo',
        accent: '#00c2ff',
    },
    {
        id: 'photo-04',
        title: 'Photo 04',
        subtitle: 'City lights',
        tag: 'Photo',
        accent: '#22c55e',
    },
    {
        id: 'photo-05',
        title: 'Photo 05',
        subtitle: 'Calm coastline',
        tag: 'Photo',
        accent: '#14b8a6',
    },
    {
        id: 'photo-06',
        title: 'Photo 06',
        subtitle: 'Night market',
        tag: 'Photo',
        accent: '#f97316',
    },
];

const videoPlaceholders = [
    {
        id: 'video-01',
        title: 'Video 01',
        subtitle: 'Project demo reel',
        tag: 'Video',
        accent: '#e50914',
    },
    {
        id: 'video-02',
        title: 'Video 02',
        subtitle: 'Travel montage',
        tag: 'Video',
        accent: '#38bdf8',
    },
    {
        id: 'video-03',
        title: 'Video 03',
        subtitle: 'Behind the scenes',
        tag: 'Video',
        accent: '#f59e0b',
    },
    {
        id: 'video-04',
        title: 'Video 04',
        subtitle: 'Time-lapse edit',
        tag: 'Video',
        accent: '#22c55e',
    },
];

const Gallery = () => {
    return (
        <div className="gallery-page">
            <div className="gallery-hero">
                <div className="gallery-hero-text">
                    <p className="gallery-kicker">Personal media</p>
                    <h1 className="gallery-title">Gallery</h1>
                    <p className="gallery-subtitle">
                        Upload and organize photos and videos in one place. Placeholders show the layout until uploads are enabled.
                    </p>
                </div>
            </div>

            <section className="gallery-section">
                <div className="gallery-section-header">
                    <h2>Photos</h2>
                    <p>Curated moments from travel, work, and everyday inspiration.</p>
                </div>
                <div className="gallery-grid">
                    {photoPlaceholders.map((item, index) => (
                        <div
                            key={item.id}
                            className="gallery-card"
                            style={{ '--accent': item.accent, '--delay': `${index * 0.08}s` }}
                        >
                            <div className="gallery-media photo">
                                <span className="gallery-tag">{item.tag}</span>
                            </div>
                            <div className="gallery-meta">
                                <h3>{item.title}</h3>
                                <p>{item.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="gallery-section">
                <div className="gallery-section-header">
                    <h2>Videos</h2>
                    <p>Short clips, demos, and motion highlights.</p>
                </div>
                <div className="gallery-grid">
                    {videoPlaceholders.map((item, index) => (
                        <div
                            key={item.id}
                            className="gallery-card"
                            style={{ '--accent': item.accent, '--delay': `${index * 0.08}s` }}
                        >
                            <div className="gallery-media video">
                                <span className="gallery-tag">{item.tag}</span>
                                <span className="gallery-play">Play preview</span>
                            </div>
                            <div className="gallery-meta">
                                <h3>{item.title}</h3>
                                <p>{item.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Gallery;
