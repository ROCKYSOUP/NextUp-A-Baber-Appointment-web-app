const express = require('express');
const cors = require('cors');
const Customer = require('./db/db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find().sort({appointment:1});
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

app.post('/api/customers', async (req, res) => {
  const { name, appointment, barber } = req.body;
  if(await Customer.findOne({appointment,barber})){
    return res.status(400).json({ message: 'Time slot already booked' });
  }else{
  try {
    const newCustomer = new Customer({ name, appointment, barber });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add customer' });
  }}
});

app.delete('/api/customers/:id', async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete customer' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
