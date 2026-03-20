import React, { useEffect, useState } from 'react';
import './ContactMe.css';
import { FaEnvelope, FaPhoneAlt, FaCoffee, FaLinkedin } from 'react-icons/fa';
import { getContactMe } from '../queries/getContactMe';
import { hardcodedContact } from '../data/mockData';

const ContactMe = () => {
    const [userData, setUserData] = useState(hardcodedContact);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const data = await getContactMe();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching contact data:', error);
            }
        }

        fetchUserData();
    }, []);

    return (
        <div className="contact-container">
            <div className="contact-copy">
                <h1>Contact Istiqlal Aurangzeb</h1>
                <p>Open to software engineering, AI, product, and research collaboration conversations.</p>
            </div>

            <div className="linkedin-badge-custom">
                <img
                    src={userData.profilePicture?.url || 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'}
                    alt={userData.name}
                    className="badge-avatar"
                    decoding="async"
                />
                <div className="badge-content">
                    <h3 className="badge-name">{userData?.name}</h3>
                    <p className="badge-title">{userData.title}</p>
                    <p className="badge-description">
                        {userData.summary}
                    </p>
                    <p className="badge-company">{userData.companyUniversity}</p>
                    <a
                        href={userData.linkedinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="badge-link"
                    >
                        <FaLinkedin className="linkedin-icon" /> View Profile
                    </a>
                </div>
            </div>

            <div className="contact-header">
                <p>Reach out directly by email or phone.</p>
            </div>

            <div className="contact-details">
                <div className="contact-item">
                    <FaEnvelope className="contact-icon" />
                    <a href={`mailto:${userData.email}`} className="contact-link">
                        {userData.email}
                    </a>
                </div>
                <div className="contact-item">
                    <FaPhoneAlt className="contact-icon" />
                    <a href={`tel:${userData.phoneNumber}`} className="contact-link">
                        {userData.phoneNumber}
                    </a>
                </div>
                <div className="contact-fun">
                    <p>Or catch up over a coffee</p>
                    <FaCoffee className="coffee-icon" />
                </div>
            </div>
        </div>
    );
};

export default ContactMe;
