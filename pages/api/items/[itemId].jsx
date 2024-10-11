// pages/api/items/[itemId].js

import clientPromise from '../../../lib/mongodb'; // Adjust the import path as necessary
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { itemId } = req.query;

    try {
      const client = await clientPromise;
      const db = client.db();

      // Fetch the item from the 'items' collection using the itemId
      const item = await db.collection('memes').findOne({ _id: new ObjectId(itemId) });

      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      res.status(200).json(item);
    } catch (error) {
      console.error('Error fetching item:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
