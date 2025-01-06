const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  createdAt: { type: Date, default: Date.now },
  response: { type: String, default: '' },  // If the item owner responds
});

const Message = mongoose.model('Message', messageSchema);
