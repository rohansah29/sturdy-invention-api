const express = require("express");
const { AppointmentModel } = require("../models/appointmentModels");

const appointmentRouter = express.Router();

// Create a new appointment
appointmentRouter.post('/appointments', async (req, res) => {
    const appointmentData = req.body;
    const appointment = new AppointmentModel(appointmentData);
    await appointment.save();
  
    res.status(201).json({ message: 'Appointment created successfully' });
  });
  
  // Get all appointments
  appointmentRouter.get('/appointments', async (req, res) => {
    const appointments = await AppointmentModel.find();
    res.json(appointments);
  });
  
  // Update an appointment
  appointmentRouter.patch('/appointments/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
  
    await AppointmentModel.findByIdAndUpdate({_id:id}, updatedData);
  
    res.json({ message: 'Appointment updated successfully' });
  });
  
  // Delete an appointment
  appointmentRouter.delete('/appointments/:id', async (req, res) => {
    const { id } = req.params;
    await AppointmentModel.findByIdAndDelete(id);
  
    res.json({ message: 'Appointment deleted successfully' });
  });

  module.exports={appointmentRouter}

// Filter by Specialization
appointmentRouter.get('/appointments/filter-by-specialization', async (req, res) => {
    const { specialization } = req.query;

    try {
        const filteredAppointments = await AppointmentModel.find({ specialization });
        res.json(filteredAppointments);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

  // Sort by Date
appointmentRouter.get('/appointments/sort-by-date', async (req, res) => {
    try {
        const sortedAppointments = await AppointmentModel.find().sort({ date: 1 });
        res.json(sortedAppointments);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Search by Doctor Name
appointmentRouter.get('/appointments/search-by-name', async (req, res) => {
    const { name } = req.query;

    try {
        const searchResults = await AppointmentModel.find({ name: { $regex: name, $options: 'i' } });
        res.json(searchResults);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
