import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;  // MongoDB connection URI
const dbName = 'chatApp';  // Database name

export default async function handler(req, res) {
  const { user, receiver } = req.query;

  if (!user || !receiver) {
    return res.status(400).json({ error: 'User and receiver required' });
  }

  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db(dbName);

  const messagesCollection = db.collection('messages');

  // Find messages between the user and receiver
  const messages = await messagesCollection
    .find({ 
      $or: [
        { sender: user, receiver },
        { sender: receiver, receiver: user }
      ]
    })
    .sort({ timestamp: 1 })
    .toArray();

  client.close();
  
  res.json(messages);
}
