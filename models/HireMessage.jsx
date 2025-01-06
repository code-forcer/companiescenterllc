import mongoose from 'mongoose';

const HireMessageSchema = new mongoose.Schema({
  companyUserid: {
    type: String, // ID of the company the message is for
    required: true,
  },
  name: {
    type: String, // Name of the sender
    required: true,
  },
  email: {
    type: String, // Email of the sender
    required: true,
  },
  message: {
    type: String, // Hiring message content
    required: true,
  },
  createdAt: {
    type: Date, // Timestamp of when the message was sent
    default: Date.now,
  },
});

export default mongoose.models.HireMessage || mongoose.model('HireMessage', HireMessageSchema);
