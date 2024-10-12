import { Server } from 'socket.io';
import { MongoClient } from 'mongodb';

let io;
const uri = process.env.MONGO_URI; // Set your MongoDB URI in the .env file
const dbName = 'chatApp'; // Name of your database
let client;
let db;

async function connectToDatabase() {
  if (!client) {
    client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    db = client.db(dbName);
  }
  return db;
}

export default async function SocketHandler(req, res) {
  if (!io) {
    io = new Server(res.socket.server, {
      path: '/api/socket',
      cors: {
        origin: "*",
      },
    });

    io.on('connection', (socket) => {
      console.log('A user connected: ', socket.id);

      // Handle incoming messages
      socket.on('message', async (msg) => {
        io.emit('message', msg);  // Broadcast the message to all connected users

        // Store the message in MongoDB
        const db = await connectToDatabase();
        const messagesCollection = db.collection('messages');
        await messagesCollection.insertOne(msg);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.id);
      });
    });
  }
  res.end();
}
