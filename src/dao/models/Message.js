const mongoose = require('mongoose');

// Definición del esquema para el modelo 'Message'
const messageSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
