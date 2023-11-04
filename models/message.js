const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = Schema({
  title: {
    type: String,
    minLength: [1, 'Title must have at least 1 character'],
    maxLength: [50, 'Title must not exceed 50 characters'],
    required: true,
  },
  content: {
    type: String,
    minLength: [1, 'Message must have at least 1 character'],
    maxLength: [500, 'Message must not exceed 500 characters'],
    required: true,
  },
  date: { type: Date, default: Date.now },
  author: {
    type: String,
    minLength: [1, 'Message must have at least 1 character'],
    maxLength: [500, 'Message must not exceed 500 characters'],
    required: true,
  },
});

module.exports = mongoose.model('Message', MessageSchema);
