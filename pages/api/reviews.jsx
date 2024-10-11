import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { reviewText, rating } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db();

      await db.collection('reviews').insertOne({
        text: reviewText,
        rating,
        submittedAt: new Date(),
      });

      res.status(201).json({ message: 'Review submitted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db();
      const reviews = await db.collection('reviews').find().toArray();

      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
