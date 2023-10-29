const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: String,
  image: String,
  specialization: String,
  experience: Number,
  location: String,
  date: Date,
  slots: Number,
  fee: Number,
},{
    versionKey:false
});

const AppointmentModel = mongoose.model('Appointment', appointmentSchema);


module.exports={AppointmentModel};