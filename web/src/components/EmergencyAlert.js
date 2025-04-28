import React from 'react';
    import { Button } from '@mui/material';

    function EmergencyAlert() {
      const handleEmergencyAlert = () => {
        // Implement emergency alert logic here (e.g., Firebase Cloud Function trigger)
        alert("Emergency Alert Sent!");
      };

      return (
        <Button variant="contained" color="error" onClick={handleEmergencyAlert}>
          EMERGENCY ALERT
        </Button>
      );
    }

    export default EmergencyAlert;
