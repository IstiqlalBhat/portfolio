import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import { getNetworkInfo, prefersReducedMotion } from './utils/performance.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <HelmetProvider>
                <MotionConfig
                    reducedMotion={(prefersReducedMotion() || getNetworkInfo().saveData) ? 'always' : 'user'}
                >
                    <App />
                </MotionConfig>
            </HelmetProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
