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
  Tabs,
  Tab,
  Box,
} from '@mui/material';

function Social() {
  const [user, setUser] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [newChatMessage, setNewChatMessage] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        fetchAnnouncements();
        fetchChatMessages();
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchAnnouncements = () => {
    const announcementsRef = collection(
      db,
      'neighborhoods',
      'YOUR_NEIGHBORHOOD_ID',
      'announcements'
    ); // Replace with your neighborhood ID
    const q = query(announcementsRef, orderBy('timestamp', 'desc'));
    onSnapshot(q, (snapshot) => {
      const fetchedAnnouncements = [];
      snapshot.forEach((doc) => {
        fetchedAnnouncements.push({ id: doc.id, ...doc.data() });
      });
      setAnnouncements(fetchedAnnouncements);
    });
  };

  const fetchChatMessages = () => {
    const chatMessagesRef = collection(
      db,
      'neighborhoods',
      'YOUR_NEIGHBORHOOD_ID',
      'chat'
    ); // Replace with your neighborhood ID
    const q = query(chatMessagesRef, orderBy('timestamp', 'desc'));
    onSnapshot(q, (snapshot) => {
      const fetchedMessages = [];
      snapshot.forEach((doc) => {
        fetchedMessages.push({ id: doc.id, ...doc.data() });
      });
      setChatMessages(fetchedMessages);
    });
  };

  const postAnnouncement = async (e) => {
    e.preventDefault();
    if (newAnnouncement.trim()) {
      try {
        await addDoc(
          collection(
            db,
            'neighborhoods',
            'YOUR_NEIGHBORHOOD_ID',
            'announcements'
          ),
          {
            text: newAnnouncement,
            sender: user.email, // Or user ID
            timestamp: new Date(),
          }
        );
        setNewAnnouncement('');
      } catch (error) {
        console.error('Error posting announcement:', error);
      }
    }
  };

  const sendChatMessage = async (e) => {
    e.preventDefault();
    if (newChatMessage.trim()) {
      try {
        await addDoc(
          collection(
            db,
            'neighborhoods',
            'YOUR_NEIGHBORHOOD_ID',
            'chat'
          ),
          {
            text: newChatMessage,
            sender: user.email, // Or user ID
            timestamp: new Date(),
          }
        );
        setNewChatMessage('');
      } catch (error) {
        console.error('Error sending chat message:', error);
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Social
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="social tabs"
          >
            <Tab label="Announcements" />
            <Tab label="Chat" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <List>
            {announcements.map((announcement) => (
              <ListItem key={announcement.id}>
                <ListItemText
                  primary={announcement.sender}
                  secondary={announcement.text}
                />
              </ListItem>
            ))}
          </List>
          {user && (
            //   Only show if user is logged in (and potentially if they have the right role)
            <form onSubmit={postAnnouncement}>
              <TextField
                label="New Announcement"
                value={newAnnouncement}
                onChange={(e) => setNewAnnouncement(e.target.value)}
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
                Post Announcement
              </Button>
            </form>
          )}
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <List>
            {chatMessages.map((message) => (
              <ListItem key={message.id}>
                <ListItemText
                  primary={message.sender}
                  secondary={message.text}
                />
              </ListItem>
            ))}
          </List>
          <form onSubmit={sendChatMessage}>
            <TextField
              label="New Chat Message"
              value={newChatMessage}
              onChange={(e) => setNewChatMessage(e.target.value)}
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
              Send
            </Button>
          </form>
        </TabPanel>
      </CardContent>
    </Card>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`social-tabpanel-${index}`}
      aria-labelledby={`social-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default Social;
