import React from 'react';
import { motion } from 'framer-motion';
import './ProfileGate.css';

// Import generated images (assuming they will be moved to src/assets or similar, 
// for now we will use the absolute paths or placeholders if not ready, 
// but typically in a React app we import them. 
// Since I can't move files easily with `write_to_file` to src/assets without `run_command`,
// I'll assume they are in `public/assets` or I will use the absolute paths for the demo 
// if the user allows, OR I will use the `src/assets` folder and move them there via command).

const profiles = [
    { id: 'developer', name: 'Developer', img: '/assets/profile_developer.png' },
    { id: 'stalker', name: 'Stalker', img: '/assets/profile_stalker_v2.png' },
    { id: 'recruiter', name: 'Recruiter', img: '/assets/profile_recruiter.png' },
    { id: 'adventurer', name: 'Adventurer', img: '/assets/profile_adventurer.png' },
];

const ProfileGate = ({ onSelect }) => {
    return (
        <div className="profile-gate">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Who's watching?
            </motion.h1>
            <div className="profile-grid">
                {profiles.map((profile, index) => (
                    <motion.div
                        key={profile.id}
                        className="profile-item"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => onSelect(profile.id)}
                    >
                        <div className="profile-avatar">
                            <img
                                src={profile.img}
                                alt={profile.name}
                                loading="lazy"
                                decoding="async"
                                onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                            />
                        </div>
                        <span className="profile-name">{profile.name}</span>
                    </motion.div>
                ))}
            </div>
            <motion.button
                className="manage-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                Manage Profiles
            </motion.button>
        </div>
    );
};

export default ProfileGate;
