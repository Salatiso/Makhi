import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase'; // Import Firebase
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore'; // Import Firebase Firestore functions
import { TextField, Button, Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

function Household() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        // Fetch messages for the user's household
        const householdMessagesRef = collection(db, 'households', 'YOUR_HOUSEHOLD_ID', 'messages'); // Replace 'YOUR_HOUSEHOLD_ID'
        const q = query(householdMessagesRef); // You might want to order by timestamp
        onSnapshot(q, (snapshot) => {
          const fetchedMessages = [];
          snapshot.forEach((doc) => {
            fetchedMessages.push({ id: doc.id, ...doc.data() });
          });
          setMessages(fetchedMessages);
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      try {
        await addDoc(collection(db, 'households', 'YOUR_HOUSEHOLD_ID', 'messages'), { // Replace 'YOUR_HOUSEHOLD_ID'
          text: newMessage,
          sender: user.email, // Or use a unique user ID if available
          timestamp: new Date()
        });
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Household Communication
        </Typography>
        <List>
          {messages.map((message) => (
            <ListItem key={message.id}>
              <ListItemText
                primary={message.sender}
                secondary={message.text}
              />
            </ListItem>
          ))}
        </List>
        <form onSubmit={sendMessage}>
          <TextField
            label="Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Send
          </Button>
        </form>
        {/* Add Unit-level issue reporting UI here */}
      </CardContent>
    </Card>
  );
}

export default Household;
