import React, { useState } from 'react';
import { auth } from '../config/firebase'; // Import Firebase auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth methods
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Registration successful! Please login.');
        setIsRegistering(false); // Switch back to login mode
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        //   Navigate to home page or dashboard here
        //   For now, just show an alert
        alert('Login successful!');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: 5 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {isRegistering ? 'Register' : 'Login'}
        </Typography>
        {errorMessage && (
          <Typography color="error" variant="body2" gutterBottom>
            {errorMessage}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            {isRegistering ? 'Register' : 'Login'}
          </Button>
        </form>
        <Button
          onClick={() => setIsRegistering(!isRegistering)}
          fullWidth
          sx={{ mt: 2 }}
        >
          {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default Login;
