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

    const filter = { companyid: userId }; // Modify to new ObjectId(userId) if companyid is an ObjectId
    const posts = await db.collection('memes').find(filter).sort({ createdAt: -1 }).toArray();

    return res.status(200).json({ success: true, messages: posts });
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}
