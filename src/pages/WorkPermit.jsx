import React, { useEffect, useState } from 'react';
import './WorkPermit.css';
import { getWorkPermit } from '../queries/getWorkPermit';

const WorkPermit = () => {
    const [permitData, setPermitData] = useState(null);

    useEffect(() => {
        async function fetchPermitData() {
            try {
                const data = await getWorkPermit();
                setPermitData(data);
            } catch (error) {
                // Error handled silently, fallback will be used
            }
        }
        fetchPermitData();
    }, []);

    if (!permitData) return <div>Loading...</div>;

    return (
        <div className="work-permit-container">
            <div className="work-permit-card">
                <h2 className="work-permit-headline">Work Authorization</h2>
                <p className="work-permit-summary">
                    I'm currently authorized to work in the U.S. on <strong>{permitData.visaStatus || "F-1 OPT"}</strong> through <strong>{permitData.expiryDate || "January 2027"}</strong>.
                    I'm eligible for the <strong>24-month STEM OPT extension</strong> (through <strong>January 2029</strong>), so I don't require employer
                    sponsorship for the next <strong>~3 years</strong>. For long-term employment, I'm seeking <strong>H-1B sponsorship</strong>.
                </p>
            </div>
        </div>
    );
};

export default WorkPermit;
