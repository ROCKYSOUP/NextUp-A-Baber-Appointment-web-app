const express = require('express');
const Customer = require('../models/appointment-schema');

const router=express.Router();

router.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find().sort({appointment:1});
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

router.post('/api/customers', async (req, res) => {
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

router.delete('/api/customers/:id', async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete customer' });
  }
});

module.exports = router;
