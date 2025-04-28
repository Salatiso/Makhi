import React from 'react';
import EmergencyButton from '../components/EmergencyButton';

function Home({ user }) {
    return (
        <div>
            <header>
                <h1>Makhi - 22 Lineata Avenue, Glenvista</h1>
                <p>12/50 Households | 45 Members</p>
            </header>
            <EmergencyButton user={user} />
            <div id="map">Map Placeholder (Google Maps/what3words)</div>
        </div>
    );
}

export default Home;
