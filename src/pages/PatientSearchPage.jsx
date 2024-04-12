import React, { useState } from 'react';
import { ref, query, orderByChild, equalTo, get } from 'firebase/database';
import { TextField, Button, List, ListItem, Container, Typography, Grid, Paper } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import database from '../firebase/firebaseConfig';

function PatientSearchPage() {
  const [searchParams, setSearchParams] = useState({
    registrationNumber: '',
    name: '',
    phoneNumber: ''
  });

  const [searchResults, setSearchResults] = useState([]);
    // Add state to hold the selected patient
    const [selectedPatient, setSelectedPatient] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const getQuery = () => {
    const patientsRef = ref(database, 'patients');
    if (searchParams.registrationNumber) {
      return query(patientsRef, orderByChild('registrationNumber'), equalTo(searchParams.registrationNumber));
    } else if (searchParams.name) {
      return query(patientsRef, orderByChild('name'), equalTo(searchParams.name));
    } else if (searchParams.phoneNumber) {
      return query(patientsRef, orderByChild('phoneNumber'), equalTo(searchParams.phoneNumber));
    }
    return null;  // Return null if no search parameters are provided
  };

  const PatientDetailsCard = ({ patient }) => {
    // You can customize this style
    const cardStyle = {
      marginTop: '20px',
      padding: '16px',
      background: '#f9f9f9', // light grey background to differentiate from the page background
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1.5em',
    };
  
    const handlePrint = () => {
        window.print();
    };
    return (
      <Card style={cardStyle}>
        <CardContent>
          {/* Replace with actual header/footer content as needed */}
          <Typography variant="h5" component="div" gutterBottom>
            Dr. Hemraj Bhardwaj, M.S.
            <br />
            General Surgeon
          </Typography>
          <Typography variant="body2" component="div">
            Hadoti Piles Centre (HPC)
            <br />
            Baran
          </Typography>
          {/* Patient Information in a format similar to the template */}
          <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>
            Patient Registration Number: {patient.registrationNumber}
          </Typography>
          <Typography variant="body1">Patient's Name: {patient.name}</Typography>
          <Typography variant="body1">Sex: {patient.sex} Age: {patient.age}</Typography>
          <Typography variant="body1">Date: {/* Assuming you have a date field in your patient data */}</Typography>
          <Typography variant="body1">Patient Address: {patient.village}</Typography>
          <Typography variant="body1">Patient Phone Number: {patient.phoneNumber}</Typography>
          <Typography variant="body1">Diagnosis: {patient.diagnosis}</Typography>
          {/* ...include other details as necessary */}
          <Typography variant="body1" sx={{ marginTop: 2, fontStyle: 'italic' }}>
            Rx
          </Typography>
          {/* Include medication or other prescription details as necessary */}
          <div style={{ borderTop: '1px solid black', margin: '20px 0' }} />
          <Typography variant="body1" style={{ textAlign: 'center' }}>Signature</Typography>
        </CardContent>
        <Button onClick={handlePrint} variant="contained" color="primary">
        Print this card
      </Button>
      </Card>
    );
  };
  
//   export default PatientDetailsCard;

  function handleSearch(event) {
    event.preventDefault();
  
    // Reference to the patients in the database
    const patientsRef = ref(database, 'patients');
  
    // Fetch all patients data to filter on the client side
    get(patientsRef).then((snapshot) => {
      if (snapshot.exists()) {
        let results = Object.values(snapshot.val());
  
        // Filter results based on input - if input is provided, filter by it
        if (searchParams.registrationNumber) {
          results = results.filter(patient =>
            patient.registrationNumber.includes(searchParams.registrationNumber)
          );
        }
        if (searchParams.name) {
          results = results.filter(patient =>
            patient.name.toLowerCase().includes(searchParams.name.toLowerCase())
          );
        }
        if (searchParams.phoneNumber) {
          results = results.filter(patient =>
            patient.phoneNumber.includes(searchParams.phoneNumber)
          );
        }
  
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }).catch((error) => {
      console.error("Firebase error: ", error);
    });
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Patient Search
        </Typography>
        <form onSubmit={handleSearch} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Registration Number"
                name="registrationNumber"
                value={searchParams.registrationNumber}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={searchParams.name}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={searchParams.phoneNumber}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </form>
        {searchResults.length > 0 && (
        <List>
        {searchResults.map((patient, index) => (
          <ListItem button key={index} onClick={() => setSelectedPatient(patient)}>
            {patient.name} - {patient.phoneNumber}
          </ListItem>
        ))}
      </List>
        )}
        {searchResults.length === 0 && (
          <Typography>No results found.</Typography>
        )}
      </Paper>
      {/* Display the selected patient's details */}
      {selectedPatient && <PatientDetailsCard patient={selectedPatient} />}


      
    </Container>
    
  );
}

export default PatientSearchPage;
