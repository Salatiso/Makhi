import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase';
import { collection, query, onSnapshot, addDoc, where } from 'firebase/firestore';
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

function Neighborhood() {
  const [user, setUser] = useState(null);
  const [generalChat, setGeneralChat] = useState([]);
  const [utilityUpdates, setUtilityUpdates] = useState([]);
  const [incidentReports, setIncidentReports] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [utilityUpdateText, setUtilityUpdateText] = useState('');
  const [incidentReportText, setIncidentReportText] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        // Fetch data for each tab
        fetchGeneralChat();
        fetchUtilityUpdates();
        fetchIncidentReports();
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchGeneralChat = () => {
    const generalChatRef = collection(db, 'neighborhoods', 'YOUR_NEIGHBORHOOD_ID', 'generalChat'); // Replace with your neighborhood ID
    const q = query(generalChatRef);
    onSnapshot(q, (snapshot) => {
      const fetchedMessages = [];
      snapshot.forEach((doc) => {
        fetchedMessages.push({ id: doc.id, ...doc.data() });
      });
      setGeneralChat(fetchedMessages);
    });
  };

  const fetchUtilityUpdates = () => {
    const utilityUpdatesRef = collection(db, 'neighborhoods', 'YOUR_NEIGHBORHOOD_ID', 'utilityUpdates'); // Replace with your neighborhood ID
    const q = query(utilityUpdatesRef);
    onSnapshot(q, (snapshot) => {
      const fetchedUpdates = [];
      snapshot.forEach((doc) => {
        fetchedUpdates.push({ id: doc.id, ...doc.data() });
      });
      setUtilityUpdates(fetchedUpdates);
    });
  };

  const fetchIncidentReports = () => {
    const incidentReportsRef = collection(db, 'neighborhoods', 'YOUR_NEIGHBORHOOD_ID', 'incidentReports'); // Replace with your neighborhood ID
    const q = query(incidentReportsRef);
    onSnapshot(q, (snapshot) => {
      const fetchedReports = [];
      snapshot.forEach((doc) => {
        fetchedReports.push({ id: doc.id, ...doc.data() });
      });
      setIncidentReports(fetchedReports);
    });
  };

  const sendGeneralChatMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      try {
        await addDoc(collection(db, 'neighborhoods', 'YOUR_NEIGHBORHOOD_ID', 'generalChat'), { // Replace with your neighborhood ID
          text: newMessage,
          sender: user.email, // Or use a unique user ID
          timestamp: new Date(),
        });
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const postUtilityUpdate = async (e) => {
    e.preventDefault();
    if (utilityUpdateText.trim()) {
      try {
        await addDoc(collection(db, 'neighborhoods', 'YOUR_NEIGHBORHOOD_ID', 'utilityUpdates'), {  // Replace with your neighborhood ID
          text: utilityUpdateText,
          sender: user.email, // Or user ID
          timestamp: new Date(),
        });
        setUtilityUpdateText('');
      } catch (error) {
        console.error('Error posting utility update:', error);
      }
    }
  };

  const postIncidentReport = async (e) => {
    e.preventDefault();
    if (incidentReportText.trim()) {
      try {
        await addDoc(collection(db, 'neighborhoods', 'YOUR_NEIGHBORHOOD_ID', 'incidentReports'), { // Replace with your neighborhood ID
          text: incidentReportText,
          sender: user.email, // Or user ID
          timestamp: new Date(),
        });
        setIncidentReportText('');
      } catch (error) {
        console.error('Error posting incident report:', error);
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
          Neighborhood Communication
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="neighborhood tabs">
            <Tab label="General Chat" />
            <Tab label="Utility Updates" />
            <Tab label="Incident Reports" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <List>
            {generalChat.map((message) => (
              <ListItem key={message.id}>
                <ListItemText primary={message.sender} secondary={message.text} />
              </ListItem>
            ))}
          </List>
          <form onSubmit={sendGeneralChatMessage}>
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
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <List>
            {utilityUpdates.map((update) => (
              <ListItem key={update.id}>
                <ListItemText primary={update.sender} secondary={update.text} />
              </ListItem>
            ))}
          </List>
          <form onSubmit={postUtilityUpdate}>
            <TextField
              label="Utility Update"
              value={utilityUpdateText}
              onChange={(e) => setUtilityUpdateText(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={2}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Post Update
            </Button>
          </form>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <List>
            {incidentReports.map((report) => (
              <ListItem key={report.id}>
                <ListItemText primary={report.sender} secondary={report.text} />
              </ListItem>
            ))}
          </List>
          <form onSubmit={postIncidentReport}>
            <TextField
              label="Incident Report"
              value={incidentReportText}
              onChange={(e) => setIncidentReportText(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={2}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Post Report
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
      id={`neighborhood-tabpanel-${index}`}
      aria-labelledby={`neighborhood-tab-${index}`}
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

export default Neighborhood;
