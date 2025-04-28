import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase';
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  orderBy,
} from 'firebase/firestore';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

function Utilities() {
  const [user, setUser] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [utilityType, setUtilityType] = useState('Power');
  const [updateText, setUpdateText] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        fetchUtilityUpdates();
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUtilityUpdates = () => {
    const utilityUpdatesRef = collection(
      db,
      'neighborhoods',
      'YOUR_NEIGHBORHOOD_ID',
      'utilityUpdates'
    ); // Replace with your neighborhood ID
    const q = query(utilityUpdatesRef, orderBy('timestamp', 'desc'));
    onSnapshot(q, (snapshot) => {
      const fetchedUpdates = [];
      snapshot.forEach((doc) => {
        fetchedUpdates.push({ id: doc.id, ...doc.data() });
      });
      setUpdates(fetchedUpdates);
    });
  };

  const postUtilityUpdate = async (e) => {
    e.preventDefault();
    if (updateText.trim()) {
      try {
        await addDoc(
          collection(
            db,
            'neighborhoods',
            'YOUR_NEIGHBORHOOD_ID',
            'utilityUpdates'
          ),
          {
            type: utilityType,
            text: updateText,
            sender: user.email, // Or user ID
            timestamp: new Date(),
          }
        );
        setUpdateText('');
      } catch (error) {
        console.error('Error posting utility update:', error);
      }
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Utility Updates
        </Typography>

        <List>
          {updates.map((update) => (
            <ListItem key={update.id}>
              <ListItemText
                primary={`${update.type} - ${update.sender}`}
                secondary={update.text}
              />
            </ListItem>
          ))}
        </List>

        {user && (
          // Only show the form if a user is logged in
          <form onSubmit={postUtilityUpdate}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="utility-type-label">Utility Type</InputLabel>
              <Select
                labelId="utility-type-label"
                id="utility-type"
                value={utilityType}
                label="Utility Type"
                onChange={(e) => setUtilityType(e.target.value)}
              >
                <MenuItem value="Power">Power</MenuItem>
                <MenuItem value="Water">Water</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Utility Update"
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={2}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Post Update
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

export default Utilities;
