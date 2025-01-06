import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const client = await clientPromise;
    const db = client.db();

    // Ensure userId matches the format in your database
    const filter = { companyOwnerId: userId }; // Replace with `new ObjectId(userId)` if needed
    const messages = await db
      .collection('hireMessages')
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    if (messages.length === 0) {
      return res.status(404).json({ message: 'No messages found for this user' });
    }

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ error: 'Failed to fetch messages', details: error.message });
  }
}
