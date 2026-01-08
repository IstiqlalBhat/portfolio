import React from 'react';
import './WorkPermit.css';

const WorkPermit = () => {
    return (
        <div className="work-permit-container">
            <div className="work-permit-card">
                <h2 className="work-permit-headline">Work Authorization</h2>
                <p className="work-permit-summary">
                    I'm currently authorized to work in the U.S. on <strong>F-1 OPT</strong> through <strong>January 2027</strong>.
                    I'm eligible for a <strong>2-year STEM OPT extension</strong> (through <strong>January 2029</strong>), so I won't require employer
                    sponsorship for the next two years.
                    For long-term employment, I'm seeking <strong>H-1B sponsorship</strong>.
                </p>
            </div>
        </div>
    );
};

export default WorkPermit;
