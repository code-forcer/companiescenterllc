import mongoose from 'mongoose';

const MembershipSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
});

// Ensure the collection has only one document
MembershipSchema.index({}, { unique: true, background: false });

export default mongoose.models.Membership || mongoose.model('Membership', MembershipSchema);
