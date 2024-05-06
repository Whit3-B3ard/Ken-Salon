// models/Appointment.js
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: false },
  service: { type: String, required: false },
  date: { type: String, required: true },
  slot: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
},
{ timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
