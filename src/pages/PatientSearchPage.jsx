import React, { useState } from 'react';
import { ref, query, orderByChild, equalTo, get } from 'firebase/database';
import { TextField, Button, List, ListItem, Container, Typography, Grid, Paper } from '@mui/material';
import database from '../firebase/firebaseConfig';

function PatientSearchPage() {
  const [searchParams, setSearchParams] = useState({
    registrationNumber: '',
    name: '',
    phoneNumber: ''
  });

  const [searchResults, setSearchResults] = useState([]);

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
            {searchResults.map((result, index) => (
              <ListItem key={index}>
                {result.name} - {result.phoneNumber}
              </ListItem>
            ))}
          </List>
        )}
        {searchResults.length === 0 && (
          <Typography>No results found.</Typography>
        )}
      </Paper>
    </Container>
  );
}

export default PatientSearchPage;
