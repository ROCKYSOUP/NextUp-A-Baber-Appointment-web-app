import React, { useEffect, useState } from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState('');
  const [appointment, setAppointment] = useState('');
  const [barber, setBarber] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const interval=setInterval(()=>{
      fetchCustomers();
    },3000)

    return ()=>clearInterval(interval)
    
  }, []);

  const fetchCustomers = () => {
    fetch('http://localhost:5000/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching customers:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCustomer = { name, appointment, barber };

    fetch('http://localhost:5000/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCustomer)
    })
      .then(async (res) => {
        if(!res.ok){
          const t=await res.json()
          throw new Error(t.message||"Booking Failed")
        }
        fetchCustomers();
        setName('');
        setAppointment('');
        setError('');
      })
      .catch(err =>{ console.error('Error:', err);
            setError(err.message)})
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/customers/${id}`, {
      method: 'DELETE'
    })
      .then(() => fetchCustomers())
      .catch(err => console.error('Error deleting customer:', err));
  };

  const grouped = customers.reduce((acc, curr) => {
    acc[curr.barber] = acc[curr.barber] || [];
    acc[curr.barber].push(curr);
    return acc;
  }, {});

  return (
    
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Customer Appointment Booking</Typography>

      {error && (
  <Typography color="error" sx={{ mb: 2 }}>
    {error}
  </Typography>
)}


      <Paper elevation={3} sx={{ p: 3, mb: 5 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            label="Your Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            sx={{ width: 200 }}
          />

          <Box>
            <label style={{ fontSize: '14px', color: '#666' }}>Appointment Time</label>
            <TimePicker
              onChange={setAppointment}
              value={appointment}
              disableClock={true}
              required
            />
          </Box>

          <FormControl required sx={{ width: 200 }}>
            <InputLabel>Select Barber</InputLabel>
            <Select
              value={barber}
              onChange={(e) => setBarber(e.target.value)}
              label="Select Barber"
            >
              <MenuItem value="Raj">Raj</MenuItem>
              <MenuItem value="Aman">Aman</MenuItem>
              <MenuItem value="Sana">Sana</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" type="submit">Book</Button>
        </form>
      </Paper>

      <Typography variant="h5" gutterBottom>Existing Appointments</Typography>

      {Object.keys(grouped).map((barberName) => (
        <Paper key={barberName} elevation={2} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>{barberName}'s Queue</Typography>
          <Divider />
          <List>
            {grouped[barberName].map((customer) => (
              <ListItem
                key={customer._id}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleDelete(customer._id)} color="success">
                    <DoneIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={`${customer.name} – ${customer.appointment}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </Box>
  );
}

export default CustomerPage;
