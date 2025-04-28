import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import {
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      //   Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Profile
        </Typography>

        {user ? (
          <div>
            <Typography variant="body1">
              Email: {user.email}
            </Typography>
            {/* Display other user information here */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogout}
              sx={{ mt: 2 }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Typography variant="body1">
            Not logged in.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default Profile;
