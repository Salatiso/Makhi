import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button, Tab, Tabs } from '@mui/material';
    import EmergencyAlert from '../components/EmergencyAlert'; // Create this component

    function Home() {
      const [value, setValue] = React.useState(0);

      const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      return (
        <div>
          <h1>Makhi</h1>
          <Tabs value={value} onChange={handleChange} aria-label="navigation tabs">
            <Tab label="Household" component={Link} to="/household" />
            <Tab label="Neighborhood" component={Link} to="/neighborhood" />
            <Tab label="Utilities" component={Link} to="/utilities" />
            <Tab label="Social" component={Link} to="/social" />
            <Tab label="Incidents" component={Link} to="/incidents" />
            <Tab label="Profile" component={Link} to="/profile" />
          </Tabs>

          <EmergencyAlert />

          {/* Content for the active tab will go here */}
        </div>
      );
    }

    export default Home;
