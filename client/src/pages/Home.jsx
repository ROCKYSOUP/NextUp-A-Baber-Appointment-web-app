

import React from 'react';
import { Box, Button, Typography, Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import ContentCutIcon from '@mui/icons-material/ContentCut';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box textAlign="center">
        <Typography variant="h3" gutterBottom>
          Welcome to NextCut
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Please select your role to continue
        </Typography>

        <Stack spacing={3} mt={5}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<PersonIcon />}
            onClick={() => navigate('/customer')}
          >
            Login as Customer
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            size="large"
            startIcon={<ContentCutIcon />}
            onClick={() => navigate('/barber')}
          >
            Login as Barber
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
