import React from 'react';
import './Recommendations.css';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaUniversity } from 'react-icons/fa';

const Recommendations = () => {
    return (
        <div className='recommendations-container'>
            <div className="recommendation-card">
                <div className="recommendation-header">
                    <div className="profile-icon-container">
                        <FaUniversity className="university-icon" />
                    </div>
                    <div>
                        <h3 className="supervisor-name">Jong Han Yoon, Ph.D.</h3>
                        <p className="supervisor-title">Assistant Professor</p>
                        <p className="department">Nieri Department of Construction, Development and Planning</p>
                        <p className="university">Clemson University</p>
                    </div>
                </div>

                <div className="divider"></div>

                <div className="contact-info">
                    <div className="contact-row">
                        <FaEnvelope className="contact-icon" />
                        <a href="mailto:jongy@clemson.edu">jongy@clemson.edu</a>
                    </div>
                    <div className="contact-row">
                        <FaPhoneAlt className="contact-icon" />
                        <a href="tel:4704353300">470-435-3300</a>
                    </div>
                    <div className="contact-row">
                        <FaMapMarkerAlt className="contact-icon" />
                        <span>2-133 Lee Hall, Clemson, SC 29634</span>
                    </div>
                </div>

                <div className="recommendation-body">
                    <p>
                        "Istiqlal has been an exceptional Software Developer. His work on the <strong>AB-CELS</strong> and <strong>BBAPS</strong> projects demonstrated a deep understanding of both blockchain technology and construction processes. He successfully architected complex smart contracts and developed full-stack applications that significantly advanced our research goals."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Recommendations;
