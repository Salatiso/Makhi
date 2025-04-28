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
} from '@mui/material';

function Incidents() {
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        fetchIncidentReports();
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchIncidentReports = () => {
    const incidentsRef = collection(
      db,
      'neighborhoods',
      'YOUR_NEIGHBORHOOD_ID',
      'incidents'
    ); // Replace with your neighborhood ID
    const q = query(incidentsRef, orderBy('timestamp', 'desc'));
    onSnapshot(q, (snapshot) => {
      const fetchedReports = [];
      snapshot.forEach((doc) => {
        fetchedReports.push({ id: doc.id, ...doc.data() });
      });
      setReports(fetchedReports);
    });
  };

  const postIncidentReport = async (e) => {
    e.preventDefault();
    if (newReport.trim()) {
      try {
        await addDoc(
          collection(
            db,
            'neighborhoods',
            'YOUR_NEIGHBORHOOD_ID',
            'incidents'
          ),
          {
            text: newReport,
            sender: user.email, // Or user ID
            timestamp: new Date(),
          }
        );
        setNewReport('');
      } catch (error) {
        console.error('Error posting incident report:', error);
      }
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Incident Reports
        </Typography>

        <List>
          {reports.map((report) => (
            <ListItem key={report.id}>
              <ListItemText primary={report.sender} secondary={report.text} />
            </ListItem>
          ))}
        </List>

        {user && (
          <form onSubmit={postIncidentReport}>
            <TextField
              label="New Incident Report"
              value={newReport}
              onChange={(e) => setNewReport(e.target.value)}
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
              Post Report
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

export default Incidents;
