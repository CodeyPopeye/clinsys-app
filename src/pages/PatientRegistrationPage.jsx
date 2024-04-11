import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, Paper, Box, FormControl, FormLabel,
  RadioGroup, FormControlLabel, Radio, Checkbox, FormGroup, Grid, ThemeProvider, createTheme } from '@mui/material';
import { ref, onValue, set, push } from "firebase/database";
import database from '../firebase/firebaseConfig';




function PatientRegistrationPage() {
  const [patientData, setPatientData] = useState({
    registrationNumber: '',
    name: '',
    age: '',
    sex: '',
    phoneNumber: '',
    village: '',
    tehsil: '',
    district: '',
    state: '',
    country: 'India',
    pincode: '',
    caste: '',
    education: '',
    diet: 'Vegetarian',
    addictions: {
      Tobacco:   { checked: false, timesPerDay: '' },
      Cigarette: { checked: false, timesPerDay: '' },
      Alcohol:   { checked: false, timesPerDay: '' },
      Gutka:     { checked: false, timesPerDay: '' },
      Paan:      { checked: false, timesPerDay: '' },
      Tea:       { checked: false, timesPerDay: '' },
      Other:     { checked: false, timesPerDay: '' },
    },
    occupation: '',
    diagnosis: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };

  const handleAddictionChange = (event) => {
    const { name, checked } = event.target;
    setPatientData((prevData) => ({
      ...prevData,
      addictions: {
        ...prevData.addictions,
        [name]: { ...prevData.addictions[name], checked: checked },
      },
    }));
  };

  const handleAddictionFrequencyChange = (event, addictionName) => {
    const { value } = event.target;
    setPatientData((prevData) => ({
      ...prevData,
      addictions: {
        ...prevData.addictions,
        [addictionName]: { ...prevData.addictions[addictionName], timesPerDay: value },
      },
    }));
  };


  // Custom theme setup if needed
  const theme = createTheme();

  // For checkboxes:
const handleCheckboxChange = (event) => {
  const { name, checked } = event.target;
  setPatientData(prevState => ({
    ...prevState,
    addictions: {
      ...prevState.addictions,
      [name]: {
        ...prevState.addictions[name],
        checked,
      }
    }
  }));
};

// For "times per day" inputs:
const handleFrequencyChange = (event, addictionName) => {
  const { value } = event.target;
  setPatientData(prevState => ({
    ...prevState,
    addictions: {
      ...prevState.addictions,
      [addictionName]: {
        ...prevState.addictions[addictionName],
        timesPerDay: value
      }
    }
  }));
};

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new reference with an auto-generated id
    const patientRef = ref(database, 'patients');
    const newPatientRef = push(patientRef);

    // Set the patient data to the new reference
    set(newPatientRef, patientData)
      .then(() => {
        // Data saved successfully!
        console.log('Data sent to the database successfully!');
        // You might want to reset form state or navigate the user to another page
      })
      .catch((error) => {
        // The write failed...
        console.error('Error sending data to the database', error);
        // Handle errors, such as displaying a user-friendly error message
      });
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper elevation={6} sx={{ padding: 3, marginTop: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5">
              Patient Registration
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                id="registrationNumber"
                label="Registration Number"
                name="registrationNumber"
                margin="normal"
                value={patientData.registrationNumber}
                onChange={handleInputChange}
              />
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                margin="normal"
                value={patientData.name}
                onChange={handleInputChange}
              />
              <TextField
  required
  fullWidth
  id="age"
  label="Age"
  name="age"
  type="number"
  margin="normal"
  value={patientData.age}
  onChange={handleInputChange}
/>
<FormControl component="fieldset" margin="normal">
  <FormLabel component="legend">Sex</FormLabel>
  <RadioGroup
    row
    aria-label="sex"
    name="sex"
    value={patientData.sex}
    onChange={handleInputChange}
  >
    <FormControlLabel value="Male" control={<Radio />} label="Male" />
    <FormControlLabel value="Female" control={<Radio />} label="Female" />
    <FormControlLabel value="Transgender" control={<Radio />} label="Transgender" />
  </RadioGroup>
</FormControl>
<TextField
  required
  fullWidth
  id="phoneNumber"
  label="Phone Number"
  name="phoneNumber"
  margin="normal"
  value={patientData.phoneNumber}
  onChange={handleInputChange}
/>
<TextField
  required
  fullWidth
  id="village"
  label="Village"
  name="village"
  margin="normal"
  value={patientData.village}
  onChange={handleInputChange}
/>
<TextField
  required
  fullWidth
  id="tehsil"
  label="Tehsil"
  name="tehsil"
  margin="normal"
  value={patientData.tehsil}
  onChange={handleInputChange}
/>
<TextField
  required
  fullWidth
  id="district"
  label="District"
  name="district"
  margin="normal"
  value={patientData.district}
  onChange={handleInputChange}
/>
<TextField
  required
  fullWidth
  id="state"
  label="State"
  name="state"
  margin="normal"
  value={patientData.state}
  onChange={handleInputChange}
/>
<FormControl component="fieldset" margin="normal">
  <FormLabel component="legend">Country</FormLabel>
  <RadioGroup
    row
    aria-label="country"
    name="country"
    value={patientData.country}
    onChange={handleInputChange}
  >
    <FormControlLabel value="India" control={<Radio />} label="India" />
    <FormControlLabel value="Other" control={<Radio />} label="Other" />
    {patientData.country === 'Other' && (
      <TextField
        id="otherCountry"
        label="Country Name"
        name="otherCountry"
        type="text"
        margin="normal"
        value={patientData.otherCountry || ''}
        onChange={handleInputChange}
      />
    )}
  </RadioGroup>
</FormControl>
<TextField
  required
  fullWidth
  id="pincode"
  label="Pincode"
  name="pincode"
  type="text"
  margin="normal"
  value={patientData.pincode}
  onChange={handleInputChange}
/>
<TextField
  required
  fullWidth
  id="caste"
  label="Caste (Jati)"
  name="caste"
  type="text"
  margin="normal"
  value={patientData.caste}
  onChange={handleInputChange}
/>
<FormControl component="fieldset" margin="normal">
  <FormLabel component="legend">Education</FormLabel>
  <RadioGroup
    row
    aria-label="education"
    name="education"
    value={patientData.education}
    onChange={handleInputChange}
  >
    <FormControlLabel value="Uneducated" control={<Radio />} label="Uneducated" />
    <FormControlLabel value="Secondary" control={<Radio />} label="Secondary" />
    <FormControlLabel value="Higher Secondary" control={<Radio />} label="Higher Secondary" />
    <FormControlLabel value="Graduate" control={<Radio />} label="Graduate" />
    <FormControlLabel value="Post Graduate" control={<Radio />} label="Post Graduate" />
  </RadioGroup>
</FormControl>
<FormControl component="fieldset" margin="normal">
  <FormLabel component="legend">Diet</FormLabel>
  <RadioGroup
    row
    aria-label="diet"
    name="diet"
    value={patientData.diet}
    onChange={handleInputChange}
  >
    <FormControlLabel value="Vegetarian" control={<Radio />} label="Vegetarian" />
    <FormControlLabel value="Non Vegetarian" control={<Radio />} label="Non Vegetarian" />
    <FormControlLabel value="Other" control={<Radio />} label="Other" />
    {patientData.diet === 'Other' && (
      <TextField
        id="otherDiet"
        label="Specify Diet"
        name="otherDiet"
        type="text"
        margin="normal"
        value={patientData.otherDiet || ''}
        onChange={handleInputChange}
      />
    )}
  </RadioGroup>
</FormControl>

<FormGroup>
  <Typography component="legend">Addictions</Typography>
  {Object.entries(patientData.addictions).map(([addiction, data]) => (
    <Grid container alignItems="center" key={addiction} spacing={2}>
      <Grid item>
        <FormControlLabel
          control={
            <Checkbox
              checked={data.checked}
              onChange={handleAddictionChange}
              name={addiction}
            />
          }
          label={addiction}
        />
      </Grid>
      {data.checked && (
        <Grid item>
          <TextField
            id={`${addiction}-timesPerDay`}
            label="Times per day"
            name={`${addiction}TimesPerDay`}
            type="number"
            size="small"
            InputProps={{
              inputProps: { 
                min: 0,
                style: { textAlign: 'center' }
              }
            }}
            value={data.timesPerDay}
            onChange={(e) => handleAddictionFrequencyChange(e, addiction)}
            variant="outlined"
            style={{ width: '80px' }}
          />
        </Grid>
      )}
    </Grid>
  ))}
</FormGroup>
              
              <TextField
  required
  fullWidth
  id="occupation"
  label="Occupation"
  name="occupation"
  type="text"
  margin="normal"
  value={patientData.occupation}
  onChange={handleInputChange}
/>
<TextField
  required
  fullWidth
  id="diagnosis"
  label="Diagnosis"
  name="diagnosis"
  type="text"
  margin="normal"
  value={patientData.diagnosis}
  onChange={handleInputChange}
/>

                {/* Submit Button */}
  <Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    sx={{ mt: 3, mb: 2 }}
  >
    Register
  </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default PatientRegistrationPage;