// pages/api/memes/like.js

import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { memeId } = req.body;

    if (!memeId) {
      return res.status(400).json({ error: 'Meme ID is required' });
    }

    try {
      const client = await clientPromise;
      const db = client.db();
      const memesCollection = db.collection('memes');

      const result = await memesCollection.updateOne(
        { _id: new ObjectId(memeId) },
        { $inc: { likes: 1 } }  // Increment the like count by 1
      );

      if (result.modifiedCount === 1) {
        return res.status(200).json({ message: 'Meme liked successfully' });
      } else {
        return res.status(404).json({ error: 'Meme not found' });
      }
    } catch (error) {
      console.error('Error liking meme:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
