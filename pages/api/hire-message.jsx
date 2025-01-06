import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { itemId, companyOwnerId, name, email, subject, message, userId } = req.body;

    if (!itemId || !name || !email || !subject || !message || !userId) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
      // Connect to MongoDB
      const client = await clientPromise;
      const db = client.db(); // Use the default database defined in your MongoDB URI

      // Insert data into the 'hireMessages' collection
      const result = await db.collection('hireMessages').insertOne({
        itemId,
        companyOwnerId,
        userId, // Save userId with the message
        name,
        email,
        subject,
        message,
        createdAt: new Date(),
      });

      res.status(201).json({
        message: 'Message sent successfully!',
        data: {
          id: result.insertedId,
          itemId,
          userId,
          name,
          email,
          subject,
          message,
          createdAt: new Date(),
        },
      });
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ error: 'An error occurred while saving the message.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
