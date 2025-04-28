import React from 'react';

function EmergencyButton({ user }) {
    const handleAlert = () => {
        const lastAlert = localStorage.getItem(`lastAlert_${user.house}_${user.unit}`);
        const now = Date.now();

        if (lastAlert && now - lastAlert < 10 * 60 * 1000) {
            alert('Please wait before sending another alert.');
            return;
        }

        const alertMessage = `${user.name} (No. ${user.house}${user.unit ? `, Unit ${user.unit}` : ''}): Emergency!`;
        localStorage.setItem(`lastAlert_${user.house}_${user.unit}`, now);
        console.log('ALERT SENT:', alertMessage);
        alert('Emergency Alert Sent!'); // Replace with Firebase push
    };

    return (
        <button className="emergency-btn" onClick={handleAlert}>
            EMERGENCY ALERT
        </button>
    );
}

export default EmergencyButton;
