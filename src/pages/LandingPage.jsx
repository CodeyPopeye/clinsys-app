import '../App.css'; // This line should be at the top of your component file
import React from 'react';
import { Button, Typography, Container, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory



function LandingPage() {
    const navigate = useNavigate(); // Get navigate function

    const navigateTo = (path) => {
        navigate(path); // Use navigate function directly
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={6} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={process.env.PUBLIC_URL + '/asset_3.png'} alt="Hadoti Laser Piles Clinic Logo" style={{ maxWidth: '50%', height: 'auto' }}/>
                <Typography component="h1" variant="h5" className="welcome-message">
                    Welcome to Hadoti Laser Piles Clinic
                </Typography>
                <Box sx={{ mt: 4, width: '100%' }}>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mb: 2 }}
                        onClick={() => navigateTo('/login')}
                    >
                        Login
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mb: 2 }}
                        onClick={() => navigateTo('/register')}
                    >
                        Register New Patient
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => navigateTo('/search')}
                    >
                        Search & Print
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default LandingPage;
