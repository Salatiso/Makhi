import React from 'react';
import EmergencyButton from '../components/EmergencyButton';

function Neighborhood({ user }) {
    return (
        <div>
            <header>
                <h1>Makhi - Neighborhood</h1>
                <p>22 Lineata Avenue, Glenvista</p>
            </header>
            <EmergencyButton user={user} />
            <h2>Neighborhood Communication</h2>
            <p>Placeholder: Chat and escalated issues</p>
        </div>
    );
}

export default Neighborhood;
