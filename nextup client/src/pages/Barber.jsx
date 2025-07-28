import React, { useEffect, useState } from 'react';


import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Box,
  Stack,
  Chip,
} from '@mui/material';

function BarberPage() {
  const [barber, setBarber] = useState('');
  const [customers, setCustomers] = useState([]);
  const [calledCustomerId, setCalledCustomerId] = useState(null);

  useEffect(() => {
    if (barber) {
      const interval=setInterval(()=>{
        fetchCustomers();
      },3000)

      return ()=>clearInterval(interval)
    }
  }, [barber]);

  const fetchCustomers = () => {
    fetch('http://localhost:5000/api/customers')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((c) => c.barber === barber);
        setCustomers(filtered);
      })
      .catch((err) => console.error('Error fetching customers:', err));
  };

  const handleDone = (id) => {
    fetch(`http://localhost:5000/api/customers/${id}`, {
      method: 'DELETE',
    })
      .then(() => fetchCustomers())
      .catch((err) => console.error('Error deleting:', err));
  };

  const handleCallNext = () => {
    if (customers.length > 0) {
      setCalledCustomerId(customers[0]._id);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Barber Queue Management
      </Typography>

      {!barber ? (
        <Stack spacing={2} direction="row" justifyContent="center">
          {['Raj', 'Aman', 'Sana'].map((name) => (
            <Button key={name} variant="contained" onClick={() => setBarber(name)}>
              {name}
            </Button>
          ))}
        </Stack>
      ) : (
        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2, mb: 2 }}>
            <Typography variant="h6">Welcome, {barber}</Typography>
            <Button variant="outlined" color="error" onClick={() => setBarber('')}>
              Logout
            </Button>
          </Stack>

          <Button
            variant="contained"
            fullWidth
            onClick={handleCallNext}
            disabled={customers.length === 0}
            sx={{ mb: 3 }}
          >
            Call Next
          </Button>

          {customers.length === 0 ? (
            <Typography>No customers in queue.</Typography>
          ) : (
            <List>
              {customers.map((customer, index) => (
                <Card
                  key={customer._id}
                  sx={{ mb: 2, backgroundColor: customer._id === calledCustomerId ? '#e0f7fa' : '#f9f9f9' }}
                >
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <ListItemText
                        primary={`#${index + 1} - ${customer.name}`}
                        secondary={`Time: ${customer.appointment}`}
                      />
                      <Button variant="contained" color="success" onClick={() => handleDone(customer._id)}>
                        Done
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </List>
          )}
        </Box>
      )}
    </Container>
  );
}

export default BarberPage;
