import React from 'react';
import './RouteLoader.css';

const RouteLoader = () => {
    return (
        <div className="route-loader" role="status" aria-live="polite" aria-busy="true">
            <div className="route-loader-bar" />
        </div>
    );
};

export default RouteLoader;

