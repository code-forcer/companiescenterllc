// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['employer', 'company'], // Define the possible roles
    default: 'employer', // Default role if not provided
  },
  membershipStatus: {
    type: String,
    enum: ['free', 'active'],
    default: 'free',
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
