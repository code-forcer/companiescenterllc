import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { messageId, senderId, replyContent } = req.body;

    if (!messageId || !senderId || !replyContent) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    try {
      // Connect to MongoDB
      const { db } = await connectToDatabase();

      // Check if the original message exists
      const originalMessage = await db.collection('messages').findOne({ _id: messageId });
      if (!originalMessage) {
        return res.status(404).json({ error: 'Original message not found' });
      }

      // Save the reply to the replies collection
      const reply = {
        messageId, 
        senderId,
        replyContent,
        createdAt: new Date(),
      };

      await db.collection('replies').insertOne(reply);

      return res.status(200).json({ success: true, message: 'Reply sent successfully' });
    } catch (err) {
      console.error('Error saving reply:', err);
      return res.status(500).json({ error: 'Failed to send reply' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
