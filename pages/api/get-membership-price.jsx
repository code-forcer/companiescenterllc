// pages/api/get-membership-price.js
import clientPromise from '../../lib/mongodb'; // Import the MongoDB connection

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Wait for the MongoDB client connection to be established
      const client = await clientPromise;
      const db = client.db(); // Access the default database

      // Query the Membership collection for the price (only one document is expected)
      const membership = await db.collection('memberships').findOne({});
      
      if (!membership) {
        return res.status(404).json({ error: 'Membership not found' });
      }
      
      const price = membership.price || 1; // Default to $1 if not set
      res.status(200).json({ price });
    } catch (error) {
      console.error('Error fetching membership price:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch membership price' });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}
