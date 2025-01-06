// pages/api/user/profile.js
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  if (method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or invalid token format' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { role } = req.body;

    if (!role || (role !== 'employer' && role !== 'company')) {
      return res.status(400).json({ message: 'Invalid role selected' });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: 'Role updated successfully', role: user.role });
  } catch (error) {
    console.error('Error in profile update:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
